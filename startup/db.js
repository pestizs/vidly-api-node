import mongoose from "mongoose";

export default function connectToDB() {
  mongoose
    //if connection does not work with localhost, try 127.0.0.1
    .connect("mongodb+srv://Nick:abcD1@myapp.dvo1cah.mongodb.net/Vidly")
    .then(() => console.log("Connected to MongoDB..."));
}
