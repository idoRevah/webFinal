
import User from '../models/userModel';

export const getUserProfile = async (req: any, res: any) => {
  const user = await User.findById(req.params.id).populate('posts');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};