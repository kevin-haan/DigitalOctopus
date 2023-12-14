import { useAuth } from "../context/AuthContext";
import { useGlobalLoadingStatus } from "../context/GlobalLoadingStatusContext";
import Dropdown from "./common/Dropdown";
import logo from "../assets/images/logo/digitaloctopus_logo_white.svg";
import { Link } from "react-router-dom";

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
            className="font-serif font-bold lowercase p-3 rounded text-white mr-3"
          >
            <span>Log In</span>
          </Link>
          <Link
            to="/register"
            className="font-serif font-bold lowercase bg-white p-3 rounded text-gray-800"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="absolute w-full h-40 flex">
      <div className="container mx-auto my-auto justify-between items-center flex">
        <span className="flex-1"></span>
        <div className="flex-1 flex justify-center my-auto">
          <img src={logo} className="h-12 w-auto"></img>
        </div>
        <span className="flex-1 flex justify-end my-auto">
          {isGloballyLoading && renderLoadingIndicator()}
          {!isGloballyLoading && renderUserInfo()}
        </span>
      </div>
    </div>
  );
}

export default Header;
