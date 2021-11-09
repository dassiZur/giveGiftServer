const GreetingCard = require("../models/greetingCard");
const mongoose = require("mongoose");

//הוספת מתנה  חדשה  
const post = async (req, res) => {
    let greetingCard = req.body;
    let newGreetingCard = new GreetingCard(greetingCard);
    if (!greetingCard)
        return res.status(404).send(" מצטערים לא הכנסתם פרטים ");
    try {
        await newGreetingCard.save();
        return res.send(newGreetingCard);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
// מחיקת מתנה    
const deleteById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין")
    const greetingCard = await GreetingCard.findByIdAndRemove(id)
    if (!greetingCard)
        return res.status(400).send("סליחה זה לא נימצא");
    return res.send(greetingCard);
}

// עידכון מתנה  
let put = async (req, res) => {
    let greetingCardtBody = req.body;
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    if (!greetingCard)
        return res.status(404).send("המזהה שהתקבל אינו תקין");
    greetingCard.nameGift = greetingCardtBody.nameGift || greetingCard.nameGift;
    greetingCard.category = greetingCardtBody.category || greetingCard.category;
    greetingCard.photo = greetingCardtBody.photo || greetingCard.photo;
    await greetingCard.save();
    return res.send(greetingCard);


}
//  קבלת כל המתנות  
const get = async (req, res) => {
    let greetingCard = await GreetingCard.find().populate("user", "category");
    // return res.send(greetingCard);
    //let greetingCard = await GreetingCard.find();
    return res.send(greetingCard);
}

//   קבלת  מתנה עפ"י מזהה  
const getById = async (req, res) => {
    let { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id))
    //         return res.status(404).send("המזההה שהתקבל אינו תקין");
    let greetingCard = await GreetingCard.find({ "category": id });
    if (!greetingCard)
        return res.status(404).send("מצטערים לא נמצאה מכתב עם המזהה שהתקבל");
    return res.send(greetingCard);
}


const getCategoryName = async (req, res) => {
    let arrCategoriesName = [];
    let categories = await GreetingCard.find();
    categories.forEach(element => {
        if (arrCategoriesName.indexOf(element.category) == -1)
            arrCategoriesName.push(element.category);
    });
    return res.send(arrCategoriesName);
}
// const getGreetingCardsByName = async (req, res) => {
//     let arrGreetingCardsByName = [];
//     let categories = await GreetingCard.find();
//     categories.forEach(element => {
//         if (arrGreetingCardsByName.indexOf(element.category) == -1)
//         arrGreetingCardsByName.push(element.category);
//     });
//     return res.send(arrGreetingCardsByName);
module.exports = {
    post, deleteById, put, get, getById, getCategoryName
}
