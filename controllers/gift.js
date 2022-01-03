const Gift = require("../models/gift");
const mongoose = require("mongoose");

//הוספת מתנה  חדשה
const post = async (req, res) => {
  console.log("------------gift------from-------body---------------------");
  let gift = req.body;
  console.log(gift);
  let newGift = new Gift(gift);
  if (!gift)
    return res.status(404).send(" מצטערים אתם צריכים להכניס שם משתמש וסיסמה ");
  try {
    await newGift.save();
    return res.send(newGift);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// מחיקת מתנה
const deleteById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("המזהה שהתקבל אינו תקין");
  const gift = await Gift.findByIdAndRemove(id);
  if (!gift) return res.status(400).send("סליחה זה לא נימצא");
  return res.send(gift);
};

// עידכון מתנה
let put = async (req, res) => {
  let giftBody = req.body;
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("המזההה שהתקבל אינו תקין");
  let gift = await Gift.findById(id);
  if (!gift) return res.send("אין מתנה עם מזהה כזה");
  gift.nameGift = giftBody.nameGift || gift.nameGift;
  gift.price = giftBody.price || gift.price;
  gift.category = giftBody.category || gift.category;
  gift.gifPhoto = giftBody.gifPhoto || gift.gifPhoto;
  gift.ratedScore = giftBody.ratedScore || gift.ratedScore;
  gift.ageRange = giftBody.ageRange || gift.ageRange;
  gift.character = giftBody.character || gift.character;
  gift.status = giftBody.status || gift.status;
  gift.remark = giftBody.remark || gift.remark;
  await gift.save();
  return res.send(gift);
};

//  קבלת כל המתנות
const get = async (req, res) => {
  try {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      let gift = await Gift.find();
    console.log(gift);
    // .populate("user", "category");
    if (!gift)
      return res.status(404).send("מצטערים לא נמצאה בעל עסק עם המזהה שהתקבל");
    return res.send(gift);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

//   קבלת  מתנה עפ"י מזהה
const getById = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("המזההה שהתקבל אינו תקין");
  try {
    let gift = await Gift.findById(id);
    if (!gift)
      return res.status(404).send("מצטערים לא נמצאה בעל עסק עם המזהה שהתקבל");
    return res.send(gift);
  } catch (err) {
    return res.err(err);
  }
};
const getByIdCategory = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("המזההה שהתקבל אינו תקין");
    let gift = await Gift.find({ category: id });
    console.log(gift);
    return res.send(gift);
  } catch {
    return res.status(404).send("המזההה שהתקבל אינו תקין");
  }
};
const getByUser = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("המזההה שהתקבל אינו תקין");
    let gift = await Gift.find({ user: id });
    console.log(gift);
    return res.send(gift);
  } catch {
    return res.status(404).send("המזההה שהתקבל אינו תקין");
  }
};
const getByIdParentCategory = async (req, res) => {
  let { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("המזההה שהתקבל אינו תקין");
    let allGift = await Gift.find().populate([
      { path: "category", select: "parentCategories" },
    ]);
    let gift = await allGift.find({ "category.parentCategories": id });
    return res.send(gift);
  } catch {
    return res.status(404).send("המזהה שהתקבל אינו תקין");
  }
};

module.exports = {
  post,
  deleteById,
  put,
  get,
  getById,
  getByIdCategory,
  getByIdParentCategory,
  getByUser,
};
