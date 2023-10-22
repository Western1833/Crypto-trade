const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requred: [true, 'Username is required field!'],
        minLength: [3, 'Username should be at least 3 characters long!'],
        maxLength: [15, 'Username can not be longer than 15 characters!'],
    },
    email: {
        type: String,
        required: [true, 'Email field is required!'],
        minLength: [11, 'Email should be atleast 11 characters long!'],
        maxLength: [25, 'Email should be at least 4 characters long!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password field is required!'],
        minLength: [4, 'Password should be atleast 11 characters long!'],
        maxLength: [10, 'Password should be at least 4 characters long!']
    },
});

userSchema.virtual('confirmPassword').set(function(value){
    if(value !== this.password){
        throw new Error('Password missmatch!');
    }
});

userSchema.pre('save', async function(){
    const hashedPass =  await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
});

const User = mongoose.model('User', userSchema);

module.exports = User;