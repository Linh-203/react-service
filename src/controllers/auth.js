import User from '../models/users';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};
//signup
const signupUser = async (req, res) => {
   const { name, email, password, phone } = req.body;
   try {
      const user = await User.signup(name, email, password, phone);
      // create token
      const token = createToken(user._id);
      user.password = undefined;
      res.status(200).json({ user, token });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

//login
const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.login(email, password);
      // create token
      const token = createToken(user._id);
      user.password = undefined;
      res.status(200).json({ user, token });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const users = {
   signupUser,
   loginUser
};
