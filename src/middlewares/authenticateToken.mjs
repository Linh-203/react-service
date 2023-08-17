import User from '../models/users.mjs';
import jwt from 'jsonwebtoken';
const authentication = async (req, res, next) => {
   const { authorization } = req.headers;
   if (!authorization) {
      return res.status(401).json({ error: 'Bạn phải đăng nhập để thực hiện hành động này' });
   }
   const token = authorization.split(' ')[1];
   try {
      const { _id } = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({ _id }).select('_id');
      if (!user) {
         res.status(401).json({ error: 'Không tìm thấy người dùng' });
      }
      req.user = user;
      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'ban phai dang nhap' });
   }
};

export default authentication;
