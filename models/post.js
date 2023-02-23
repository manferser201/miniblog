let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('../models/user');

let PostSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    publicationdate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Post', PostSchema);
