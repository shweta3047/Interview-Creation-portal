import Participants from "../../models/participant";

export class ParticipantsService {
  async getParticipants(role) {
    try {
      if (!role) throw { message: "Please mention the role!" };

      const participants = await Participants.find(
        { role },
        "_id firstName lastName email role"
      ).exec();

      if (!participants) {
        throw { message: `No ${role} found!` };
      }
      return { participants };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ParticipantsService();
