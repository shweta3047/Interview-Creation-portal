import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const InterviewSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: ObjectId,
        ref: "Participant",
      },
    ],
    startTimestamp: {
      type: Date,
      required: true,
    },
    endTimestamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", InterviewSchema);
