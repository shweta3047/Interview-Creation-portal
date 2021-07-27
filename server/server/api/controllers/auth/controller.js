import AuthService from "../../services/auth.service";

export class Controller {
  adminLogin(req, res) {
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
}
export default new Controller();
