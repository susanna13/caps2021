import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default new Schema({
    make: { type: String, 
    enum: ["Honda", "Ford", "Skoda", "Volvo"],
    required: true,
},
    model: { type: String, required: true },
});