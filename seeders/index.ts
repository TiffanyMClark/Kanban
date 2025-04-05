import { seedUsers } from "./user-seeds";
import { seedTickets } from "./ticket-seeds";
import { sequelize } from "../server/src/models/index";

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    await seedTickets();
    console.log("\n----- TICKETS SEEDED -----\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
