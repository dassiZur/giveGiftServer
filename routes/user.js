const express = require("express");
const route=express.Router();
const userController=require("../controllers/user");

route.post("/",userController.post)
route.post("/entry",userController.getLogin)
route.delete("/:id",userController.deleteById)
route.put("/:id",userController.put)
route.get("/",userController.get)
route.get("/:id",userController.getById)

module.exports=route;