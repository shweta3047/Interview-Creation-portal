import AuthService from "../../services/auth.service";

export class Controller {
  async adminLogin(req, res) {
    try {
      const { token, user } = await AuthService.login(req.body);
      res.send({
        status: "500",
        token,
        user,
        message: "Login Successfull",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async adminSignup(req, res) {
    try {
      const { admin } = await AuthService.signup(req.body);
      res.send({
        status: "500",
        admin,
        message: "Signup Successfull",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
}
export default new Controller();
