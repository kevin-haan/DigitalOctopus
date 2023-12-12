import { useAuth } from "../context/AuthContext";
import { useGlobalLoadingStatus } from "../context/GlobalLoadingStatusContext";
import Dropdown from "./common/Dropdown";
import logo from "../assets/images/logo/plants_logo_white.svg";
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
    <div className="header shadow-xl mb-5 p-3">
      <div className="container mx-auto px-4 flex">
        <div className="mr-auto">
          <img src={logo} className="h-12 w-auto"></img>
        </div>
        <span className="ml-auto my-auto">
          {isGloballyLoading && renderLoadingIndicator()}
          {!isGloballyLoading && renderUserInfo()}
        </span>
      </div>
    </div>
  );
}

export default Header;
