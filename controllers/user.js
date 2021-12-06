const User = require("../models/user");
const mongoose = require("mongoose");
const GreetingCards = require("../models/greetingCard");
const BusinessOwners = require("../models/businessOwner");
const Gifts = require("../models/gift");

 //הוספת משתמש  חדשה  
 const post = async (req, res) => {
    let userBody = req.body;
     let businessOwners = await BusinessOwners.findById(userBody.businessOwners);
     let greetingCards = await GreetingCards.findById(userBody.greetingCards);
     let gifts = await Gifts.findById(userBody.gifts);

     if (!businessOwners&&!greetingCards&&!gifts&&!userBody)
            return res.status(404).send(" מצטערים אתם צריכים להכניס שם משתמש וסיסמה ");
     let user = await User.findOne({ password: userBody.password  });
     
     if (user) {
         return res.status(400).json('משתמש זה כבר קיים!');
     } 
     else {

         // Insert the new user if they do not exist yet
         try {
        let newUser = new User(userBody);
        console.log(newUser)
        debugger
         await newUser.save();
         
         res.send(newUser);
        }
        catch (err) {
          
                  return res.status(400).json(err.message)
              }
     }
  }
 
// מחיקת משתמש    
const deleteById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזהה שהתקבל אינו תקין")
    const user = await User.findByIdAndRemove(id)
    if (!user)
        return res.status(400).send("סליחה זה לא נימצא");
    return res.send(user);
}

// עידכון משתמש  
let put = async (req, res) => {
    let userBody = req.body;
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let user = await User.findById(id);
    if (!user)
        return res.send("אין משתמש עם מזהה כזה");
    user.username = userBody.username || user.username;
    user.lastName = userBody.lastName || user.lastName;
    user.password = userBody.password || user.password;
    user.image = userBody.image || user.image;
    user.email = userBody.email || user.email;
    user.phone = userBody.phone || user.phone;
    user.role = userBody.role || user.role;
    await user.save();
    return res.send(user);
}

//  קבלת כל המתנות  
const get = async (req, res) => {
    let user = await User.find();
    return res.send(user);
}

//   קבלת  מתנה עפ"י מזהה  
const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("המזההה שהתקבל אינו תקין");
    let user = await User.findById(id);
    if (!user)
        return res.status(404).send("מצטערים לא נמצאה משתמש עם המזהה שהתקבל");
    return res.send(user);
}
const getLogin = async (req, res) => {
    console.log(req.body)
    let { username, password} = req.body;

    let user = await User.findOne({password:password,username:username});
    if (!user)
        return res.status(404).send("מצטערים לא נמצאה משתמש עם המזהה שהתקבל");
    return res.send(user);
}
module.exports = {
    post, deleteById, put, get, getById,getLogin
}