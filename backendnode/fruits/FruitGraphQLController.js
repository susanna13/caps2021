import { FruitTC, FruitColorTC } from "./FruitsRepository.js";

export const FruitQuery = {
  fruitMany: FruitTC.getResolver("findMany"),
  fruitPagination: FruitTC.getResolver("pagination"),

  fruitColorMany: FruitColorTC.getResolver("findMany"),
};

export const FruitMutation = {
  fruitCreateOne: FruitTC.getResolver("createOne"),
  fruitRemoveById: FruitTC.getResolver("removeById"),

  fruitColorCreateOne: FruitColorTC.getResolver("createOne"),
  fruitColorRemoveById: FruitColorTC.getResolver("removeById"),
};