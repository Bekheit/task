import {UserModel} from '../models/userModel'
import Joi from 'joi'


export module userController {
  export async function auth (req: any, res: any) {
    console.log('object');
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if(user && await user.matchPassword(password)){
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: user.generateToken()
      })
    } else {
      res.status(400).send('Invalid email or password');
    }
  }
  
  function validate(user: any){
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255),
    })
    return schema.validate(user);
  }

}