exports.createApiResponse = (api) => {
  return {
    name: api.name,
    description: api.description,
    type: "api",
    logo: api.logo,
  };
};
