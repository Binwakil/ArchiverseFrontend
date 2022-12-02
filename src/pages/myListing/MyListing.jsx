import React, {useEffect, useState} from "react";
import './myListing.css'
import { Link, useParams } from "react-router-dom";

import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/Image.png'
import Salenfts from '../../components/salenfts/Salenfts'

const MyListing = ({product}) => {
  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
            <h3>MY LISTING</h3>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-bottom-input">
          <input type="text" placeholder='Search Item here' />
          <select>
            <option>Recently Listed</option>
            <option>Popular</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
        <Salenfts   title="My Listings" />
      </div>
    </div>
  );
};

export default MyListing;
