import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create the User Schema.
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

//Does this work?
const User = mongoose.model('User', UserSchema);
export default User;
