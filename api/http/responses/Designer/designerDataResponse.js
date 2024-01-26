exports.createDesignerDataResponse = (designerDataItem) => {
  return {
    id: designerDataItem._id,
    name: designerDataItem.name,
    description: designerDataItem.description,
    logo: designerDataItem.logo,
    options: designerDataItem.options ? designerDataItem.options : "",
    type: designerDataItem.constructor.modelName,
  };
};
