import { Schema, Document, model, Model, Types } from 'mongoose';
import jwt from 'jsonwebtoken';

interface IUSER {
  name: string;
  email: string;
  password: string;
  role: number;
  image?: string;
  tokens?: string;
}

const userSchema = new Schema({
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
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
