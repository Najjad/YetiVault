import { SECRET_MONGODB_URI } from "$env/static/private";
import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export async function connect_to_db() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(SECRET_MONGODB_URI);
    cachedConnection = connection;
    return connection;
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to handle it in your function
  }
}
