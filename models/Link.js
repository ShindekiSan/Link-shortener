const {Schema, model, Types} = require('mongoose')

const linkSchema = new Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String, 
        required: true,
        unique: true
    },
    code: {
        type: String, 
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    },
    tags: '',
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Link = model('Link', linkSchema)