const User = require("../model/user");

const createGoogleUser = async (profile) => {
  let user = await User.findOne({ where: { google_id: profile.id } });
  if (!user) {
    user = await User.create({
      google_id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      profile_image: profile.photos[0].value,
    });
  }
  return user;
};

const findById = async (id) => {
  try {
    const user = await User.findByPk(id); // Using Sequelize's findByPk method
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createGoogleUser,
  findById,
};
