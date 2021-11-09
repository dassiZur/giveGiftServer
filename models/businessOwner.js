const mongoose = require("mongoose");
const businessOwnerSchema = new mongoose.Schema({

    //שם 
    nameBusinessOwner: {
        type: String,
        minLength: 2,
        required: true
    },
    // טלפון של בעל החנות
    phone: {
        type: String,
        // required: true
    },
    //כתובת
    address: {
        type: String,
        //required: true
    },
    //דואר אלקטרוני
    meil: {
        type: String,
        //required: true
    },
    //שם בעל החנות 
    name: {
        type: String,
        //required: true
    },
    //תשלומים
    payments: [{
        date: Date,
        uiId: String,
        // required: true,
        sum: Number
    }],
    // תמונות של פרסומות
    photoAdvertising: [{
        imageUrl: String,
        countShow: Number,
        //required: true
    }],

    // רשימת קטגוריה
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }],

    //מה לעשות איזה דרך????????????????
    //רשימת קטגוריות 
    // categories: 
    // { 
    //     type: [String], 
    //     required: true 
    // },
    //    categories:[ {
    //     //required: true,
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "categories"
    //     }],
    //משתמש
    // user: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "users"
    // }

});
const BusinessOwner = mongoose.model("businessOwners", businessOwnerSchema);
module.exports = BusinessOwner;