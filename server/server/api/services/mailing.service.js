import nodemailer from "nodemailer";
import Interviews from "../../models/interview";
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;

export class MailService {
  async send(details, mode) {
    // console.log(details);
    const info = await Interviews.findById(details._id).populate(
      "participants",
      "email"
    );
    let emails = [];
    info.participants.forEach((val) => {
      emails = [...emails, val.email];
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });
    var mailOptions = {
      from: senderEmail,
      to: emails,
      subject: "Invitation for interview",
      // text: "",
      html: `<body>Hey,</body><body>You are invited for an interview with <b>. Your interview has been ${mode}.
              <br><br><body>All the best,<br>Team Scaler</body>`,
    };

    transporter.sendMail(mailOptions);
  }
}

export default new MailService();
