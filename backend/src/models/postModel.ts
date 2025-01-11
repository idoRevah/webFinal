import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  imageSrc: { type: String, required: true },
  category: { type: String, required: true },
  // image: String,
  likes: { type: Number, default: 0 },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
