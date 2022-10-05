// const bcrypt = require("bcrypt");

export const formatDate = (dt) => {
  return new Date(dt).toUTCString().substring(0, 16);
};
// export const hashIt = async (password) => {
//   const salt = await bcrypt.genSalt(6);
//   const hashed = await bcrypt.hash(password, salt);
//   return hashed;
// };
