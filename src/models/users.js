import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      password: {
         type: String,
         required: true
      },
      phone: {
         type: String,
         required: true
      },
      avatar: {
         type: String,
         default:
            'https://lh5.googleusercontent.com/x14nnYSvR1c8KkO6Kj1giR4iZcQL0UelyqcGBRFt8fHQg8sRUouMkFc3b_F-kmDLDW-qpDo8KkBpuXGnfUNjy6NZVqwAcBYnngbupNd2scJqGyNpjYTGQZdfY3ktqFJZNsKfXR-YrDmqrcQwOrM4k2M'
      },
      role: {
         type: String,
         default: 'member',
         enum: ['member', 'admin']
      }
   },
   { timestamps: true, versionKey: false }
);

//static signup method
userSchema.statics.signup = async function (name, email, password, phone) {
   //    validation
   if (!name || !email || !password || !phone) {
      throw Error('Vui long khong bo trong');
   }
   if (!validator.isEmail(email)) {
      throw Error('email is not valid');
   }
   if (!validator.isStrongPassword(password)) {
      throw Error('password not strong enough');
   }
   const userExists = await this.findOne({ email });
   if (userExists) {
      throw Error('email already exists');
   }
   const salt = await bcryptjs.genSalt(10);
   const hash = await bcryptjs.hash(password, salt);

   const user = await this.create({ name, email, password: hash, phone });
   return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
   //    validation
   if (!email || !password) {
      throw Error('Vui long khong bo trong');
   }

   const user = await this.findOne({ email });
   if (!user) {
      throw Error('Incorrect email');
   }

   const matches = await bcryptjs.compare(password, user.password);
   if (!matches) {
      throw Error('Incorrect password');
   }
   return user;
};
export default mongoose.model('User', userSchema);
