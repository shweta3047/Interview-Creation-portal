import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ParticipantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Participant", ParticipantSchema);
