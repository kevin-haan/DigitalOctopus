import ListDropZone from "./Lists/ListDropZone";
import { useDesignerData } from "../../../context/DesignerDataContext";
function DesignerList() {
  const { draggableTypes } = useDesignerData();
  const renderDraggableTypes = () => {
    return draggableTypes.map((type) => (
      <div key={type}>
        <h2>{type}</h2>
        <ListDropZone type={type} />
      </div>
    ));
  };

  return <div className="w-64 mt-20">{renderDraggableTypes()}</div>;
}

export default DesignerList;
