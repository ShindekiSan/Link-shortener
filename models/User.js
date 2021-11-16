const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    links: [{
        type: Types.ObjectId,
        ref: 'Link'
    }]
})

module.exports = User = model("User", userSchema)