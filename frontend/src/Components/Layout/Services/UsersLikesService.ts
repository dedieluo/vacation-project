import axios from "axios";
import usersLikesApi from "../Config/UsersLikesApi";
import { UserLikesModel } from "../Models/UserLikesModel";


class UsersLikesService {

    async addUserLike(userId: number, vacationId: number): Promise<UserLikesModel> {
        const { data } = await axios.post(usersLikesApi.ADD_AND_DELETE_USER_LIKE, { userId, vacationId })
        return data
    }

    async deleteUserLike(userId: number, vacationId: number): Promise<UserLikesModel[]> {
        const { data } = await axios.delete(usersLikesApi.ADD_AND_DELETE_USER_LIKE, {
            data: { userId, vacationId }
        })
        return data
    }

    async getUserLikeVacation(perPage: number, page: number, id: number) {
        const { data } = await axios.get(`${usersLikesApi.GET_ALL_USER_LIKE}?perPage=${perPage}&page=${page}&id=${id}`);
        return data;
    }

}

const usersLikesService = new UsersLikesService;

export default usersLikesService