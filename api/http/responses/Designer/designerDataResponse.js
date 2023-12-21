exports.createDesignerDataResponse = (designerDataItem) => {
  return {
    id: designerDataItem._id,
    name: designerDataItem.name,
    description: designerDataItem.description,
  };
};
