import examplesRouter from "./api/controllers/examples/router";
import participantsRouter from "./api/controllers/examples/router";

export default function routes(app) {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/participants", participantsRouter);
}
