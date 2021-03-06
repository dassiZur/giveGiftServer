const express = require("express");
const route = express.Router();
const categoryController = require("../controllers/category");

route.get("/all", categoryController.getallWithChild);
route.post("/", categoryController.post);
route.delete("/:id", categoryController.deleteById);
route.put("/:id", categoryController.put);
route.get("/", categoryController.get);
route.get("/:id", categoryController.getById);
//route.get("/",categoryController.getSort)

module.exports = route;
