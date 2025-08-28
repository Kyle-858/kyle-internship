import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from '../components/UI/Skeleton.jsx'
import axios from "axios";


const ItemDetails = () => {

  const { nftId } = useParams()
  const [nft, setNft] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNft = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
        const data = res.data
        setNft(data)
        console.log(nft)
      } catch (err) {
        console.error(err)
      } 
      setLoading(false)
    }
    fetchNft()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? 
                  <Skeleton width="100%" height="100%" borderRadius="8px" />
                : <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? <Skeleton height="48px" width="448px" borderRadius="8px"/> : <h2>{nft.title} #{nft.tag}</h2>}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>
                  {loading ? <Skeleton height="100px" width="448px" borderRadius="8px"/> : <p>
                    {nft.description}
                  </p>}
                  <div className="d-flex flex-row">
                    {loading ? <div className="mr40"><Skeleton height="68px" width="448px" borderRadius="8px"/></div> : <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.ownerId}`}>
                            <img className="lazy" src={nft.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                        </div>
                      </div>
                    </div>}
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.creatorId}`}>
                            <img className="lazy" src={nft.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? <Skeleton height="68px" width="448px" borderRadius="8px"/> : <span>{nft.price}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
