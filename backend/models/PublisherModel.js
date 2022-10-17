var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PublisherSchema = new Schema({
    publisherName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Publisher", PublisherSchema);