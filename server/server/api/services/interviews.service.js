import Interviews from "../../models/interview";
import Participants from "../../models/participant";
import MailService from "./mailing.service";

export class InterviewsService {
  async upcoming() {
    try {
      const interviews = await Interviews.find({
        startTimestamp: { $gte: Date.now() },
      }).populate("participants");
      if (!interviews) {
        throw { message: "Something went wrong!" };
      }
      return { interviews };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async schedule(data) {
    try {
      const { isValid, message } = await this.validateInterview(null, data);

      if (!isValid) {
        throw {
          message,
        };
      }
      const newInterview = await Interviews.create({
        startTimestamp: data.startTimestamp,
        endTimestamp: data.endTimestamp,
        participants: data.participants,
      });

      MailService.send(newInterview, "sheduled");
      // console.log(sentMail);

      return { interview: newInterview };
    } catch (error) {
      throw error;
    }
  }

  async edit(id, data) {
    try {
      const isInterview = await Interviews.findById(id).exec();
      if (!isInterview) {
        throw {
          message: "No such interview exists!",
        };
      }

      const { isValid, message } = await this.validateInterview(id, data);

      if (!isValid) {
        throw {
          message,
        };
      }

      const newInterview = await Interviews.findByIdAndUpdate(
        id,
        {
          startTimestamp: data.startTimestamp,
          endTimestamp: data.endTimestamp,
          participants: data.participants,
        },
        { new: true }
      ).exec();

      MailService.send(newInterview, "resheduled");

      return { interview: newInterview };
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const newInterview = await Interviews.findByIdAndDelete(id).exec();

      // const sentMail = await MailService.send(newInterview, "deleted");
      // console.log(sentMail);
      return { interview: newInterview };
    } catch (error) {
      throw error;
    }
  }

  async validateInterview(id, data) {
    try {
      if (!data.startTimestamp || !data.endTimestamp) {
        throw { message: "Please fill required details" };
      }
      if (data.startTimestamp < Date.now())
        throw {
          message: "Start time can not be before current time!",
        };

      if (data.endTimestamp <= data.startTime)
        throw {
          message: "Interview end time should be greater than start time!",
        };
      if (data.participants.length < 2) {
        throw { message: "Please select atleast 2 participants" };
      }
      // console.log(data.participants.length);
      for (let i = 0; i < data.participants.length; i++) {
        const participant = await Participants.findById(
          data.participants[i]
        ).exec();
        if (!participant) {
          throw {
            message: "Participant does not exist!",
          };
        }
        let interviews = [];

        if (!id) {
          interviews = await Interviews.find({
            participants: participant._id,
          }).exec();
        } else {
          interviews = await Interviews.find({
            $and: [{ participants: participant._id }, { _id: { $ne: id } }],
          }).exec();
        }

        interviews.forEach((interview, index) => {
          if (
            (data.startTimestamp < interview.endTimestamp &&
              data.startTimestamp >= interview.startTimestamp) ||
            (data.endTimestamp < interview.endTimestamp &&
              data.endTimestamp >= interview.startTimestamp)
          )
            throw {
              message: `${participant.email} has another interview scheduled in this time slot. Choose different time slot`,
            };
        });
      }

      return { isValid: true };
    } catch (error) {
      throw { message: error };
    }
  }
}

export default new InterviewsService();
