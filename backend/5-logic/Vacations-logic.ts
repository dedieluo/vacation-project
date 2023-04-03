import { OkPacket } from "mysql2";
import { execute } from "../2-utils/dal"
import { VacationModel } from "../4-models/VacationModel";
import fs from "fs";


// 01 - GET ALL VACATIONS WITH PAGINATION + FILTERS
export async function getVacations(perPage: number, page: number, id: number, filters: any) {
    try {
        let query2 = '';

        if (!filters.myLiked) {
            query2 = `SELECT COUNT(*) AS count
            FROM vactions.vacations v 
            ${filters.started && !filters.notStarted ? `WHERE startDate <= NOW() AND endDate >= NOW()` : ''}
            ${!filters.started && filters.notStarted ? `WHERE startDate > now()` : ''}
            ${filters.started && filters.notStarted ? '' : ''}`;
        } else {
            query2 = `SELECT COUNT(*) as count
            FROM (
                SELECT *, 
                    (select ul.userId from vactions.users_likes ul where ul.userId = ${id} and ul.vacationId = v.vacationId) as 'myLike',
                    (select count(*) from vactions.users_likes ul where ul.vacationId = v.vacationId) as 'totalLikes'
                FROM vactions.vacations v 
                ${filters.started && !filters.notStarted ? `WHERE startDate <= NOW() AND endDate >= NOW()` : ''}
                ${!filters.started && filters.notStarted ? `WHERE startDate > now()` : ''}
                ${filters.started && filters.notStarted ? '' : ''}
                ${filters.myLiked ? `HAVING myLike = ${id}` : ''}
            ) as subquery`
        }

        const [rows2] = await execute<{ count: number }[]>(query2);
        const offset = (page - 1) * perPage;

        const query =
            ` SELECT *, 
        (select ul.userId from vactions.users_likes ul where ul.userId = ${id} and ul.vacationId = v.vacationId) as 'myLike',
        (select count(*) from vactions.users_likes ul where ul.vacationId = v.vacationId) as 'totalLikes'
        FROM vactions.vacations v 
        ${filters.started && !filters.notStarted ? `WHERE startDate <= NOW() AND endDate >= NOW()` : ''}
        ${!filters.started && filters.notStarted ? `WHERE startDate > now()` : ''}
        ${filters.started && filters.notStarted ? '' : ''}
        ${filters.myLiked ? `Having myLike = ${id}` : ''}
        order by startDate limit ${perPage} offset ${offset}`;
        const [rows] = await execute<VacationModel[]>(query, [id]);

        return { vacations: rows, countOfAllVacations: rows2[0].count };
    } catch (error) {
        throw new Error(error);

    }
}

// 04- DELETE VACATION
export async function deleteVacation(id: number) {
    // First, delete related records in users_likes table
    const deleteLikesQuery = `DELETE FROM users_likes WHERE vacationId = ?`;
    await execute(deleteLikesQuery, [id]);

    // Then, delete the vacation
    const deleteVacationQuery = `DELETE FROM vacations WHERE vacationId = ?`;
    const [result] = await execute<OkPacket>(deleteVacationQuery, [id]);
    return result;
}


// 05 - EDIT VACATION
export async function editVacation(
    vacationId: number,
    destination: string,
    description: string,
    startDate: string,
    endDate: string,
    price: number,
    image: string
): Promise<VacationModel> {

    // Update the vacation information with the new image
    const query = `UPDATE vactions.vacations SET destination = '${destination}', description = '${description}', startDate = '${startDate}',  endDate = '${endDate}',  price = '${price}',  image = '${image}' WHERE vacationId = '${vacationId}'`;

    const [rows] = await execute<VacationModel>(query);
    return rows;
}

//06 - ADD NEW VACATION
export async function addVacation(
    destination: string,
    description: string,
    startDate: string,
    endDate: string,
    price: number,
    image: string
): Promise<VacationModel> {
    const query = `INSERT INTO vactions.vacations (destination, description, startDate, endDate, price, image) 
    VALUES ('${destination}' , '${description}' , '${startDate}' , '${endDate}' , '${price}' , '${image}')`;
    const [rows] = await execute<VacationModel>(query)
    return rows
}

// GET VACATION IMAGE
export async function getVacationImage(vacationId: number) {
    const query = `SELECT image FROM vacations WHERE vacationId = '${vacationId}'`;
    const [rows] = await execute<{ image: string }>(query);

    if (rows.length > 0) {
        const imageName = rows[0].image;
        if (fs.existsSync(`./images/${imageName}`)) {
            const image = fs.readFileSync(`./images/${imageName}`);
            return image;
        }
    }
    return null;
}


