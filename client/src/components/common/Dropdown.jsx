import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Dropdown = () => {
  const { authData } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const { logout } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-700 font-semibold rounded inline-flex items-center"
      >
        <span className="font-sans font-bold bg-white text-gray-800 p-3 rounded">
          {authData && authData.first_name.charAt(0)}
          {authData && authData.last_name.charAt(0)}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 w-40 mt-2 py-2 bg-white shadow-xl rounded">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Profil
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Einstellungen
            </a>
          </li>
          <li>
            <button
              onClick={logout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Abmelden
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
