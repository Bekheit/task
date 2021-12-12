import endpoint from '../config/endpoints.config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    dob: {
      type: Date,
      required: true
    }
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
      {email: this.email}, 
      endpoint.jwtPrivateKey!, 
      {expiresIn: '7d'}
    );
    return token;
}

userSchema.methods.matchPassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model('User' , userSchema);

function validateUser(user: any){
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255),
        dob: Joi.date().required()
    })
    return schema.validate(user);
}



export{
  UserModel,
  validateUser,
}