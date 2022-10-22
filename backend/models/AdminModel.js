var mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, require: true },
    brandName: { type: String, require: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, require: true, default: "brandAmin" },
    isActive: { type: String, require: true, default: 1 },
    isConfirmed: { type: Boolean, required: true, default: 1 },
    confirmOtp: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model("User", AdminSchema);