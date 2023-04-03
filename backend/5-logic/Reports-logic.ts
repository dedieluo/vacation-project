import { execute } from "../2-utils/dal";
import { ReportModel } from "../4-models/ReportModel";


export async function getAllReports(): Promise<ReportModel[]> {
    const query = `SELECT v.destination, COUNT(*) as totalLikes
    FROM vacations v
    JOIN users_likes ul ON v.vacationId = ul.vacationId
    GROUP BY v.vacationId`;
    const [rows] = await execute<ReportModel[]>(query)
    return rows
}