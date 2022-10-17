var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    authorName: { type: String, required: true },
    biography: { type: String, required: true },
    authorImage: { type: String, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

AuthorSchema.virtual('id', {
    id: this.id
});
module.exports = mongoose.model("Author", AuthorSchema);