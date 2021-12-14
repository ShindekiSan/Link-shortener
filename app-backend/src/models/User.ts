import { Schema, model, Types } from 'mongoose'; //eslint-disable-line

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: [{
    type: Types.ObjectId,
    ref: 'Link',
  }],
});

const User = model('User', userSchema);

export default User; //eslint-disable-line
