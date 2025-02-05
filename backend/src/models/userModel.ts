import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: String,
  imageUrl: String,
});

export default mongoose.model('User', UserSchema);
