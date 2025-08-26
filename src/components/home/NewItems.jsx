import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import Skeleton from '../UI/Skeleton.jsx'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


const NewItems = () => {

  const [newItems, setNewItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
          perView: 4,
          spacing: 15,
        },
        loop: true,
        breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(max-width: 600px)": {
          slides: { perView: 1, spacing: 5 }
        }
      }
      })

      function timeToCountDown(time) {
        const timeLeft = time - Date.now()
        const sec = Math.floor(timeLeft / 1000)
        const min = Math.floor(sec / 60)
        const hour = Math.floor(min / 60)
        return (
          hour + 'H' + (min % 60) + 'M' + (sec % 60) + 'S'
        )
      }

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const res = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
        const data = res.data
        setNewItems(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNewItems()
    setLoading(false)
  })

  useEffect(() => {
      if (instanceRef.current) {
        instanceRef.current.update();
      }
    }, [newItems]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div ref={sliderRef} className="keen-slider">
          {loading === true ? Array(4).fill(null).map((_, index) => (
          <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <Skeleton width="100%" height="200px" borderRadius="8px"/>
          </div>
          )) : newItems.map(newItem => (
            <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={newItem.nftId}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={newItem.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {newItem.expiryDate === null ? '' : <div className="de_countdown">{timeToCountDown(newItem.expiryDate)}</div>}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={newItem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{newItem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{newItem.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
