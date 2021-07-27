import participantsRouter from "./api/controllers/examples/router";

export default function routes(app) {
  app.use("/participants", participantsRouter);
  app.use("/auth", authRoutes);
}
