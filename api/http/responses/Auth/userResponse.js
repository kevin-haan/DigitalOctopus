exports.createUserResponse = (user, token) => {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    token: token,
  };
};
