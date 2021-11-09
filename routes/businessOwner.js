const express = require("express");
const route=express.Router();
const multer = require('multer');
const businessOwnerController=require("../controllers/businessOwner");
route.post("/",businessOwnerController.post)
route.delete("/:id",businessOwnerController.deleteById)
route.put("/",businessOwnerController.put)
route.get("/",businessOwnerController.get)
route.get("/:id",businessOwnerController.getById);

module.exports=route;