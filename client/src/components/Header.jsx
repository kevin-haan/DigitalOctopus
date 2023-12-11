import { useAuth } from "../context/AuthContext";
import { useGlobalLoadingStatus } from "../context/GlobalLoadingStatusContext";

function Header() {
  const { authData, isAuthenticated, logout } = useAuth();
  const { isGloballyLoading } = useGlobalLoadingStatus();

  const renderLoadingIndicator = () => {
    if (isGloballyLoading) {
      return <span className="mr-4">Lädt...</span>;
    }
  };

  const renderUserInfo = () => {
    if (!isGloballyLoading) {
      return (
        <span>
          {authData ? `${authData.first_name} ${authData.last_name}` : "Guest"}
          {isAuthenticated && (
            <button type="submit" onClick={logout}>
              Abmelden
            </button>
          )}
        </span>
      );
    }
  };

  return (
    <div className="shadow-xl mb-5 p-3 bg-white">
      <div className="container mx-auto px-4 flex">
        <span className="ml-auto">
          {isGloballyLoading && renderLoadingIndicator()}
          {!isGloballyLoading && renderUserInfo()}
        </span>
      </div>
    </div>
  );
}

export default Header;
