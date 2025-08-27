import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import Skeleton from '../UI/Skeleton.jsx'
import TimeToCountDown from '../TimeToCountDown.jsx'


const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(8)
  const [sortOption, setSortOption] = useState('')
  
  useEffect (() => {
    const fetchExploreItems = async () => {
      setLoading(true)
      let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      if (sortOption !== "") {
        url += `?filter=${sortOption}`
      }
      try {
        const res = await axios.get(url)
        const data = res.data
        setExploreItems(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchExploreItems()
  }, [sortOption])


  return (
    <>
      <div>
        <select id="filter-items" onChange={(e) => setSortOption(e.target.value)} defaultValue="">
          <option value="" disabled>Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading === true ? Array(8).fill(null).map((_, index) => 
        <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index} style={{ display: "block", backgroundSize: "cover" }}>
          <Skeleton width="100%" height="200px" borderRadius="8px"/>
        </div>)
        : exploreItems.slice(0, displayCount).map(exploreItem => (
        <div
          key={exploreItem.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploreItem.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploreItem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {exploreItem.expiryDate === null ? '' : <TimeToCountDown targetTime={exploreItem.expiryDate}/>}


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
                <img src={exploreItem.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{exploreItem.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreItem.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreItem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {displayCount === 16 ? '' : <div className="col-md-12 text-center">
        <button to="" id="loadmore" className="btn-main lead" onClick={() => setDisplayCount(displayCount + 4)}>
          Load more
        </button>
      </div>}
    </>
  );
};

export default ExploreItems;
