import { Link } from "react-router-dom";
import Menu from "../../menu";
import Submenu from "./common/Submenu";

function Navigation() {
  return (
    <div className="font-bold text-sm relative">
      {Menu.map((item, index) => (
        <div key={index} className="inline-block mx-5 group">
          <Link to={item.path} className="hover:text-gray-700">
            {item.name}
          </Link>
          {item.submenu && item.submenu.length > 0 && (
            <Submenu items={item.submenu} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Navigation;
