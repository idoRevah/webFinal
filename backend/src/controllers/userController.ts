
import User from '../models/userModel';

export const getUserProfile = async (req: any, res: any) => {
  const user = await User.findById(req.params.id).populate('posts');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUserProfile = async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user._id.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  const { username } = req.body;
  user.username = username || user.username;
  user.avatar = req.file ? req.file.filename : user.avatar;
  await user.save();
  res.json(user);1
};