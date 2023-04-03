import express, { json, urlencoded } from "express";
import cors from "cors";
import { vacationsRouter } from "./6-controllers/Vacations-controller";
import { AuthRouter } from "./6-controllers/Auth-controller";
import { userLikesRouter } from "./6-controllers/UsersLikes-controller";
import fileUpload from "express-fileupload";
import { reportsRouter } from "./6-controllers/Reports-controller";

const server = express();

server.use(json());
server.use(fileUpload());
server.use(cors());

server.use("/api", AuthRouter);
server.use("/api", vacationsRouter);
server.use('/api', userLikesRouter)
server.use('/api', reportsRouter)


server.listen(3001, () => {
  console.log("Listening on port 3001...");
});
