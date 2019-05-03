import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    name: {
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
      require: true
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
