import Admin from "../../models/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(adminDetail) {
    try {
      if (!adminDetail.email || !adminDetail.password)
        throw { message: "Fill all the fields!" };
      const admin = await Admin.findOne({
        email: adminDetail.email,
      });
      if (!admin) throw { message: `Incorrect email or password!` };
      const isSame = await bcrypt.compare(adminDetail.password, admin.password);
      if (!isSame) throw { message: `Incorrect email or password!` };
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET
      );
      admin.password = undefined;
      return { admin, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new AuthService();
