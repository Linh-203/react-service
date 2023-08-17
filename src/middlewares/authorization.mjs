import jwt from 'jsonwebtoken';
import User from '../models/users.mjs';
const authorization = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.SECRET, async (err, payload) => {
         const user = await User.findById(payload._id);
         if (user?.role != 'admin') {
            return res.json({
               message: 'Bạn không có quyền để thực hiện hành động này'
            });
         }
         req.user = user;

         next();
      });
   } catch (error) {
      res.status(401).json({ message: error.message });
   }
};
export default authorization;
