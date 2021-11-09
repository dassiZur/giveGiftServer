const mongoose = require("mongoose");
const giftSchema = new mongoose.Schema({

    //שם המתנה
    nameGift: {
        type: String,
        minLength: 2,
        required: true
    },
    //מחיר משוער5
    price: [{
        type: Number,
        required: true
    }],

    //קטוריה
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },

    //תמונת מתנה
    gifPhoto: {
        type: String,
        required: true
    },
    //ניקוד מדורג   
    ratedScore: {
        type: Number
    },
    //טווח גילאים - נמוך
    ageRange: [{
        type: Number,
        //required: true
    }],
    // fromAgeRange: {
    //     type: Number,
    //     required: true
    // },
    // //טווח גילאיים - גבוה
    // toAgeRange: {
    //     type: Number,
    //     required: true
    // },
    //סטטוס
    status: {
        type: String,
        enum: ['NEW', "DELEY", 'APPROVE', 'WAITDELETE'],
        default: "NEW"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    //הערה
    remark: String,
    character:String
});
const Gift = mongoose.model("gifts", giftSchema);
module.exports = Gift;
