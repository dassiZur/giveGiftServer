const Category = require("../models/category");
const mongoose = require("mongoose");

const get = async (req, res) => {
  let categories = await Category.find({ parentCategories: null });
  return res.send(categories);
};

const getallWithChild = async (req, res) => {
  console.log("############################################");
  console.log("############################################");
  console.log("############################################");
  let categories = await Category.find();
  return res.send(categories);
};
// const get = async (req, res) => {
//     //check if what i Take off to select its good
//     let categories = await Category.find().populate({ path: "parentCategory", select: "nameCategory parentCategory" });
//     return res.send(categories);
// }
const getById = async (req, res) => {
  let { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id))
  //     return res.status(404).send("המזהה שהתקבל אינו תקין");
  // let c = await Category.find({"parentCategories": "60eaf2ec764bca2e643e9c50"});
  let category = await Category.find({ parentCategories: id }).populate([
    { path: "parentCategories", select: "nameCategory" },
  ]);

  if (!category)
    return res.status(404).send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
  return res.send(category);
};

//פונקציה סטנדרטית שמביאה אובייקט על ידי האי די שלו
// const getById = async (req, res) => {
//     let id = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id))
//         return res.status(404).send("המזהה שהתקבל אינו תקין");
//     let category = await Category.findById(id);
//     if (!category)
//         return res.status(404).send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
//     return res.send(category);
// }
const post = async (req, res) => {
  let category = req.body;
  let newCategory = new Category(category);
  try {
    await newCategory.save();
    return res.send(newCategory);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const put = async (req, res) => {
  let categoryBody = req.body;
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("המזהה שהתקבל אינו תקין");
  let category = await Category.findById(id);
  if (!category) return res.send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
  category.nameCategory = categoryBody.nameCategory || category.nameCategory;
  category.parentCategory =
    categoryBody.parentCategory || category.parentCategory;
  await category.save();
  return res.send(category);
};

const deleteById = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("המזההה שהתקבל אינו תקין");
  let deleted = await Category.findByIdAndRemove(id);
  console.log(deleted);
  if (!deleted)
    return res.status(404).send("מצטערים לא נמצאה קטגוריה עם המזהה שהתקבל");
  return res.send(deleted);
};
// const sort = async (req, res) => {
//     //check if what i Take off to select its good
//     let categories = await
//     Category.find().populate({
//         path: "parentCategory",
//         select: "nameCategory parentCategory" });
//     const unique = await [ ...new Set(categories)]

//     return res.send(unique );
// }

module.exports = {
  post,
  deleteById,
  put,
  get,
  getById,
  getallWithChild,
};
