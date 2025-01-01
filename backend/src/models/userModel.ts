import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
