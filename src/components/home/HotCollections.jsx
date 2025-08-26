import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


const HotCollections = () => {

  const [collections, setCollections] = useState([])
  const [sliderRef, instanceRef] = useKeenSlider({
      slides: {
        perView: 4,
        spacing: 15,
      },
      loop: true,
      
    })

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
        const data = res.data
        setCollections(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCollections()
    console.log(collections)
  }, [])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div ref={sliderRef} className="keen-slider">
          {collections?.map(collection => 
            <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>{collection.nftId}</span>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
