import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from '../../components/UI/Skeleton.jsx'

const AuthorItems = ({ collection, authorImage, loading }) => {

  // const { collection } = useParams()

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? Array(8).fill(null).map((_, index) => <Skeleton key={index} height="200px" width="200px" borderRadius="8px"/>) 
          : collection?.map((nft) => 
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft?.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                      src={nft?.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{nft?.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft?.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft?.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
