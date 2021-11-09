const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    //שם קטגוריה 
    nameCategory: {
        type: String,
        required: true
    },
    parentCategories: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: "categories"
    }
});
const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
