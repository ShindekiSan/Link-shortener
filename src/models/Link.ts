import { Schema, model, Types } from 'mongoose'; //eslint-disable-line

const linkSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  tags: [{
    tagName: String,
  }],
  description: {
    type: String,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

const Link = model('Link', linkSchema);

export default Link //eslint-disable-line
