import mongoose from "mongoose";
import CarSchema from "./CarSchema.js";
import { composeWithMongoose } from "graphql-compose-mongoose";

export const CarModel = mongoose.model('Car', CarSchema);
export const CarTC = composeWithMongoose(CarModel);