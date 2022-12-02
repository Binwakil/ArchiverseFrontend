import React from 'react';
import './myArchiNfts.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/Image.png'
import ArchiNFTs from '../../components/archinfts/Achinfts'
import { isLogging, getAccount} from "./../../near/utils";

const MyArchiNfts = () => {

  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
            <h3>{getAccount()}</h3>
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
        <ArchiNFTs   title="My ArchiNFTs" />
      </div>
    </div>
  );
};

export default MyArchiNfts;
