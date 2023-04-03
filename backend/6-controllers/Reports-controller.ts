import { Router } from "express";
import { getAllReports } from "../5-logic/reports-logic";


export const reportsRouter = Router()

reportsRouter.get('/vacationsReports', async (req, res, next) => {

    const reports = await getAllReports();

    res.json(reports)
})
