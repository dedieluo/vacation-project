import axios from "axios";
import authApi from "../Config/AuthApi";

class AuthService {

    async registerUser(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
    ): Promise<string> {
        const { data } = await axios.post(authApi.REGISTER, { firstname, lastname, email, password });
        return data;
    }

    async login(email: string, password: string): Promise<string> {
        const { data } = await axios.post(authApi.LOGIN, { email, password });
        return data;
    }


}

const authService = new AuthService;

export default authService;