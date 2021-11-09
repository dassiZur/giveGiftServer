const mongoose = require("mongoose");
const greetingCardSchema = new mongoose.Schema({

    //שם המכתב
    nameLetter: {
        type: String,
        //required: true
    },
    //אירוע
    category: { type: String,
        // required: true
        },
    //או ניתוב לקובץ המכתב
    path: {
        type: String,
        //required: true
    },

    //סטטוס
    // status: {
    //     type:String,
    //     enum:['NEW',"DELEY",'APPROVE','WAITDELETE'],
    //     default:["NEW"]
    // },
    //הערה
});
const GreetingCard = mongoose.model("greetingCards", greetingCardSchema);
module.exports = GreetingCard;