import { useAuth } from "../context/AuthContext";
import { useGlobalLoadingStatus } from "../context/GlobalLoadingStatusContext";
import Dropdown from "./common/Dropdown";
import logo from "../assets/images/logo/digitaloctopus_logo_blue.svg";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  const { isAuthenticated } = useAuth();
  const { isGloballyLoading } = useGlobalLoadingStatus();

  const renderLoadingIndicator = () => {
    return <div className="loading-indicator"></div>;
  };

  const renderUserInfo = () => {
    if (isAuthenticated) {
      return <Dropdown />;
    } else {
      return (
        <div>
          <Link
            to="/login"
            className="font-sans lowercase p-3 rounded text-white mr-3"
          >
            <span>Log In</span>
          </Link>
          <Link
            to="/register"
            className="font-sans lowercase bg-white p-3 rounded text-gray-800"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="absolute w-full h-20 flex">
      <div className="container mx-auto my-auto justify-between items-center flex">
        <div className="flex-1 flex justify-center my-auto">
          <Link to="/">
            <img src={logo} className="h-12 w-auto"></img>
          </Link>
        </div>
        <div className="flex-1">
          <Navigation />
        </div>
        <span className="flex justify-end my-auto">
          {isGloballyLoading && renderLoadingIndicator()}
          {!isGloballyLoading && renderUserInfo()}
        </span>
      </div>
    </div>
  );
}

export default Header;
