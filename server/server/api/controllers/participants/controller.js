import ParticipantsService from "../../services/participants.service";

export class Controller {
  async getParticipants(req, res) {
    try {
      const role = req.params.role;
      const { participants } = await ParticipantsService.getParticipants(role);
      res.send({
        status: "500",
        participants,
        message: "Successfully fetched participants",
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
