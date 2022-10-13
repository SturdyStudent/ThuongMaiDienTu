var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    quantityLeft: { type: Number, required: true },
    publisherId: { type: Schema.ObjectId, required: true },
    authorId: { type: String, required: true },
    categoryId: { type: String, required: true },
    isbn: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);