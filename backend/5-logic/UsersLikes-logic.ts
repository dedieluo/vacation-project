import { execute } from "../2-utils/dal";
import { UserLikesModel } from "../4-models/UserLikesModel";
import { VacationModel } from "../4-models/VacationModel";


// 01 - ADD A VACATION LIKE
export async function addUserLike(vacationId: number, userId: number): Promise<UserLikesModel> {
    const query = `INSERT INTO vactions.users_likes (vacationId, userId) VALUES (?, ?)`;
    const [rows] = await execute<UserLikesModel>(query, [vacationId, userId]);
    return rows
}

// 02 - Remove VACATION LIKE
export async function deleteUserLike(vacationId: number, userId: number): Promise<UserLikesModel> {
    const query = `DELETE FROM vactions.users_likes WHERE vacationId = ? AND userId = ?`;
    const [rows] = await execute<UserLikesModel>(query, [vacationId, userId]);
    return rows
}


// export async function getAllVacationsThatUserLike(perPage: number, page: number, id: number): Promise<VacationModel[]> {
//     const offset = (page - 1) * perPage;
//     const query = `SELECT *,
//     (SELECT users_likes.userId FROM users_likes WHERE users_likes.userId = ${id} AND users_likes.vacationId = vacations.vacationId ) AS 'userLikes',
//     (SELECT COUNT(*) FROM users_likes WHERE users_likes.vacationId = vacations.vacationId) AS 'totalLikes'
//     FROM vacations
//     WHERE (SELECT users_likes.userId FROM users_likes WHERE users_likes.userId = ${id}  AND users_likes.vacationId = vacations.vacationId ) = ${id} 
//     ORDER BY startDate
//     LIMIT ${perPage}  OFFSET ${offset} ;`

//     const [rows] = await execute<VacationModel[]>(query);
//     return rows
// }


