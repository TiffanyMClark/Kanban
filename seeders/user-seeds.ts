import { User } from "../server/src/models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: "JollyGuru", password: "password" },
      { username: "SunnyScribe", password: "password" },
      { username: "RadiantComet", password: "password" },
    ],
    { individualHooks: true }
  );
};
