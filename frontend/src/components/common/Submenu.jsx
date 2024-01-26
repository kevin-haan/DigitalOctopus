import { Link } from "react-router-dom";

function Submenu({ items }) {
  return (
    <div className="hidden group-hover:block absolute bg-white shadow-md mt-2">
      {items.map((subItem, subIndex) => (
        <Link
          key={subIndex}
          to={subItem.path}
          className="block px-4 py-2 hover:bg-gray-200"
        >
          {subItem.name}
        </Link>
      ))}
    </div>
  );
}
export default Submenu;
