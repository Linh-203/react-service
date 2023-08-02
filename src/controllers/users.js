import Users from "../models/users";
import { userSchema } from "../validation/auth";
import bcryptjs from 'bcryptjs';

const getoneUser = async (req, res) => {
    try {
       const user = await Users.findOne({ _id: req.params.id })
       if (user.length === 0) {
          res.json({
             message: 'No user found'
          });
       } else {
          res.json({
             message: 'Get user successfully',
             data: user
          });
       }
    } catch (err) {
       res.status(500).send({ message: err.message });
    }
 };
 const getAllUser = async (req, res) => {
    try {
       const user = await Users.find()
       if (user.length === 0) {
          res.json({
             message: 'No user found'
          });
       } else {
          res.json({
             message: 'Get user successfully',
             data: user
          });
       }
    } catch (err) {
       res.status(500).send({ message: err.message });
    }
 };
 const removeAccount = async (req, res) => {
   try {
      await Users.findOneAndDelete({ _id: req.params.id });
      res.json({
         message: "Delete user successfully",
     });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
};

const updateUser = async (req, res) => {
   try {
      const { error } = userSchema.validate(req.body, {abortEarly: false}) 
      if(error) {
         const errors = error.details.map(({message}) => message)
         return res.status(400).send({
            message: 'Form not valid',
            errors
         })
      } 
   
      const hashPassword = await bcryptjs.hash(req.body.password, 10)

      const user = await Users.findByIdAndUpdate(req.body._id, {...req.body, password: hashPassword}, { new: true })
      return res.status(200).json({
         message: 'update success',
         user 
      })
   } catch(error) {
      return res.status(400).send({
         message: error.message
      })
   }
}
 export const account = {
    getoneUser,
    getAllUser,
    updateUser,
    removeAccount
 };