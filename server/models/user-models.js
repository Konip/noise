const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    number: { type: Number, },
    username: { type: String },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
})

module.exports = model('User', UserSchema);
