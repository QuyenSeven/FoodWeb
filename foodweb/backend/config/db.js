import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://quyenseven07:quyen2003@cluster0.oueuseh.mongodb.net/food-web"
    )
    .then(() => console.log("DB Connected"));
};
