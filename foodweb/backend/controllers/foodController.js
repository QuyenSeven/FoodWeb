import fs from "fs";
import foodModel from "../models/foodModel.js";
import { error } from "console";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();

    res.json({
      success: true,
      message: "Food Added",
      error: false,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      error: true,
      message: " Error",
    });
  }
};

//all food list
const listFood = async(req,res) =>{
    try {
        const foods = await foodModel.find({})
        res.json({
            success: true,
            error: false,
            data: foods
        })
    } catch (e) {
        console.log(e);
        res.json({
            error: true,
            success: false,
            message: "Error"
        })
    }
}

//remove food item
const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Food Removed",
            error: false
        })
    } catch (e) {
        console.log(e);
        res.json({
            success:false,
            error: true,
            message: "Error"
        })
    }
}


export  {addFood,listFood,removeFood};
