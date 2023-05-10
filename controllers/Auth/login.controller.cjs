import Joi from "joi";
import CustomerErrorHandler from "../../services/CustomErrorHandler.cjs";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.cjs";
import { User } from "../../models/index.cjs";

const loginController = {
  login: async (req, res, next) => {
    const loginScheme = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });
    console.log("veer", res.body);
    const { error } = loginScheme.validate(req.body);
    if (error) return next(error);
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(CustomerErrorHandler.wrongCredentials());
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return next(CustomerErrorHandler.wrongCredentials());
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      res.cjson({ access_token });
    } catch (error) {
      return next(error);
    }
  },
};

export default loginController;
