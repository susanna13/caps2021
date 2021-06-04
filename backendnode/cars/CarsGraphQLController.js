import { CarTC } from "./CarsRepository.js";

export const CarQuery = {
  carMany: CarTC.getResolver("findMany"),
  cartPagination: CarTC.getResolver("pagination"),
};

export const CarMutation = {
  carCreateOne: CarTC.getResolver("createOne"),
  carRemoveById: CarTC.getResolver("removeById"),
};