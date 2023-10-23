const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const {sign} = require('../lib/jwt.js');
const {SECRET} = require('../config.js');

exports.register = (userData) => User.create({...userData});

exports.login = async (email, password) => {
    
    
    //validate user
    const user = await User.findOne({email});

    if(!user){
        throw new Error('invalid email or password!');
    }
    
    //validate password
    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('invalid email or password!');
    }

    const payload = {_id: user._id, email: user.email};
    const token = await sign(payload, SECRET, {expiresIn: '3h'});

    return token;
}