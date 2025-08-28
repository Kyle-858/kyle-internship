import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from '../components/UI/Skeleton.jsx'

const Author = () => {

  const { authorId } = useParams()
  const [author, setAuthor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState('')
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
        const data = res.data
        setAuthor(data)
        setFollowers(data.followers)
      } catch (err) {
        console.error(err)
      } 
      setLoading(false)
    }
    fetchAuthor()
    
  }, [])

  function toggleFollow() {
    if (following === true) {
      setFollowing(false)
      setFollowers(followers - 1)
    } else {
      setFollowing(true)
      setFollowers(followers + 1)
    }
  }

 

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {loading === true ? 
        <div>
          <Skeleton width="100%" height="320px" borderRadius="0"/>
        </div> : 
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>}

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? <Skeleton height="150px" width="150px" borderRadius="50%"/> 
                      : <img src={author?.authorImage} alt="" />}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loading ? <Skeleton width="200px" height="75px" borderRadius="8px"/> : <h4>
                          {author?.authorName}
                          <span className="profile_username">{author?.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? <Skeleton height="26px" width="100px"/> : <div className="profile_follower">{followers} followers</div>}
                      {following === true ? <Link to="#" className="btn-main" onClick={() => toggleFollow()}>
                        Unfollow
                      </Link> 
                      : <Link to="#" className="btn-main" onClick={() => toggleFollow()}>
                        Follow
                      </Link> 
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author?.nftCollection} loading={loading} setLoading={setLoading}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
