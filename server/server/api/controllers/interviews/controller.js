import InterviewsService from "../../services/interviews.service";

export class Controller {
  async upcomingInterview(req, res) {
    try {
      const { interviews } = await InterviewsService.upcoming();

      res.send({
        status: "500",
        interviews,
        message: "Successfully sent upcoming interviews!",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        error: error.message || "Some error Occured",
      });
    }
  }
  async scheduleInterview(req, res) {
    try {
      const { interview } = await InterviewsService.schedule(req.body);
      res.send({
        status: "500",
        interview,
        message: "Successfully scheduled interview!",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        error: error.message || "Some error Occured",
      });
    }
  }

  async editInterview(req, res) {
    try {
      const { interview } = await InterviewsService.edit(
        req.params.id,
        req.body
      );
      res.send({
        status: "500",
        interview,
        message: "Successfully updated interview!",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        error: error.message || "Some error Occured",
      });
    }
  }

  async deleteInterview(req, res) {
    try {
      const { interview } = await InterviewsService.delete(req.params.id);
      res.send({
        status: "500",
        interview,
        message: "Successfully deleted interview!",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        error: error.message || "Some error Occured",
      });
    }
  }
}
export default new Controller();
