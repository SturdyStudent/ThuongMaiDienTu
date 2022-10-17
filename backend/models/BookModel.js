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
    soldQty: { type: Number, required: true },
    views: { type: Number, required: true },
    admin: { type: Schema.ObjectId, ref: "Admin", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);