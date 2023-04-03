import { Router } from "express";
import { addUserLike, deleteUserLike } from "../5-logic/UsersLikes-logic";



export const userLikesRouter = Router()

userLikesRouter.post('/userLikes', async (req, res, next) => {
    const vacationId = req.body.vacationId;
    const userId = req.body.userId;

    const likes = await addUserLike(vacationId, userId)
    res.json(likes)
})


userLikesRouter.delete('/userLikes', async (req, res, next) => {
    const vacationId = req.body.vacationId;
    const userId = req.body.userId;

    const likes = await deleteUserLike(vacationId, userId)
    res.json(likes)
})

// userLikesRouter.get("/userLikes", async (req: Request | any, res, next) => {
//     const perPage = +req.query.perPage || 10;
//     const page = +req.query.page || 1;
//     const id = req.query.id;

//     try {
//         const vacations = await getAllVacationsThatUserLike(perPage, page, id);
//         return res.json(vacations);
//     } catch (error) {
//         next(error);
//     }
// });