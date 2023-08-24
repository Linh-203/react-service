import User from '../models/users.mjs';
import jwt from 'jsonwebtoken';
import { setCookie } from '../tools/createCookie.mjs';
import dotenv from 'dotenv';

dotenv.config();
const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};
export const getToken = (req, res) => {
   try {
      const token = req.cookies.jwt;
      if (!token) {
         return res.json({
            token: ''
         });
      }
      return res.json({
         token: token
      });
   } catch (error) {
      return res.status(400).json({
         message: error,
         status: 'not success'
      });
   }
};
export const clearToken = (req, res) => {
   try {
      const token = req.cookies?.jwt;
      if (!token) {
         return res.json({
            message: 'not have cookie token',
            status: 'success'
         });
      }
      res.clearCookie('jwt');
      return res.json({
         message: 'cleared cookie',
         status: 'success'
      });
   } catch (error) {
      return res.status(400).json({
         message: error,
         status: 'not success'
      });
   }
};
//signup
const signupUser = async (req, res) => {
   const { name, email, password, phone } = req.body;
   try {
      const user = await User.signup(name, email, password, phone);
      // create token
      const token = createToken(user._id);
      const { cookieName, cookieValue, expire } = setCookie('jwt', token, 1);
      res.cookie(cookieName, cookieValue, { expire, httpOnly: true });
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
      const { cookieName, cookieValue, expire } = setCookie('jwt', token, 1);
      res.cookie(cookieName, cookieValue, { expire, httpOnly: true });
      user.password = undefined;
      res.status(200).json({ user, token });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const users = {
   signupUser,
   loginUser,
   getToken,
   clearToken
};
