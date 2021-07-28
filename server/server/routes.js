import participantsRouter from "./api/controllers/participants/router";
import authRoutes from "./api/controllers/auth/router";
import interviewsRoutes from "./api/controllers/interviews/router";

export default function routes(app) {
  app.use("/participants", participantsRouter);
  app.use("/auth", authRoutes);
  app.use("/interviews", interviewsRoutes);
}
