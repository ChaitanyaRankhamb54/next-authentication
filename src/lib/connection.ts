import clientPromise from "./db";

export default async function getDB() {
  const client = await clientPromise;
  const db = client.db("next_authentication");
  console.log("Connected to MongoDB");
  return db;
}