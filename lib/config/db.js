import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://owliyagulyyewnowruz:nowruz03+@cluster0.jlo6w.mongodb.net/todo-app"
  );
  console.log("DB connected");
};
