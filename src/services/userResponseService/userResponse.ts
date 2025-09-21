import getDB from "@/src/lib/connection";
import contactResponse from "@/src/models/userResponseSchema";

export async function HandleUserResponseService(
  { fullname, number, email, message }:
    { fullname: string; number: string; email: string; message: string; }
) {
  // connect to the database
  const db = await getDB();

  // use the contactResponse model to save the data
  const ContactResponseCollection = db.collection("contactResponses");

  // create a new user response document
  const newContactResponse = { fullname, number, email, message };

  // save the document to the database
  try {
     await ContactResponseCollection.insertOne(newContactResponse);
  } catch (error) {
    throw new Error("Error saving user response");
  }
  return newContactResponse;
}