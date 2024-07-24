import mongoose from "mongoose";

const petSchema = mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  adoptionStatus: { type: String, default: "available" },
  imageUrl:{
    type:String,
    default:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/65761296352685.5eac4787a4720.jpg"
  }
});

const petmodel = mongoose.model("petmodel", petSchema);


export default petmodel;
