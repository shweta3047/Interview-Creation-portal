import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

const database = () => {
  try {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("error in conncting to database", err);
    });
  } catch (error) {
    console.log(error);
  }
};

export default database;
