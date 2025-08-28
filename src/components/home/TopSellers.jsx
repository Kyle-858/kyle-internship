import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from 'axios'
import Skeleton from '../UI/Skeleton.jsx'


const TopSellers = () => {

  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    const fetchSellers = async () => {
      try {const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      const data = response.data
      setSellers(data)
    } catch (err) {
      console.error(err)
    }
    }
    fetchSellers()
    setLoading(false)
  })

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading === true ? 
              Array(12).fill(null).map((_, index) => (
              <div>
                <Skeleton width="100%" height="48px" borderRadius="8px"/>
              </div>)) : 
              sellers.map(seller => (
                <li key={seller.index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
