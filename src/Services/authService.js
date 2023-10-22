const User = require('../models/User.js');

exports.register = (data) => User.create({...data});