exports.createApiResponse = (api) => {
  return {
    name: api.name,
    description: api.description,
  };
};
