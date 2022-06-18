import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { User } from '../types/User';

interface UserDocument extends User, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  findByName: (name: string) => Promise<UserDocument>;
}

const userSchema: Schema<UserDocument> = new Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    maxlength: 50,
  },
  image: String,
});

userSchema.methods.setPassword = async function (password: string) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

userSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.statics.findByName = function (name: string) {
  return this.findOne({ name });
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
