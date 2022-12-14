import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profile">
      <div className="images">
        <img src={currentUser.cover_img} alt="" className="cover" />
        <img src={currentUser.profile_img} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>
              {currentUser.username}
            </span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>
                  USA
                </span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>AppSolo Tech</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <Posts  />
    </div>
  );
};

export default Profile;
