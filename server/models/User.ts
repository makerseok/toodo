import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../types/IUser';

interface IUserDocument extends User, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  findByName: (name: string) => Promise<IUserDocument>;
}

const userSchema: Schema<IUserDocument> = new Schema({
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

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User;
