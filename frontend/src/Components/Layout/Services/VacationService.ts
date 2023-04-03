import axios from "axios"
import vacationApi from "../Config/VacationsApi";
import { VacationModel } from "../Models/VactionModel";



class VacationService {


    // GET VACATIONS
    async getVacations(perPage: number, page: number, id: number, filters: any) {
       const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const { data } = await axios.get(`${vacationApi.GET_ALL_VACATIONS_API}?perPage=${perPage}&page=${page}&id=${id}&filters=${JSON.stringify(filters)}`, { headers: headers });
        return data
    }

    // DELETE VACATION
    async deleteVacation(id: number) {
        const { data } = await axios.delete(`http://localhost:3001/api/vacations/${id}`);
        return data
    }

    //  EDIT VACATION
    async editVacation(vacation: VacationModel) {
        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId.toString());
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());
        if(vacation.editImageFile){
            formData.append("imageFile", vacation.editImageFile[0])
        }

        if (vacation.image) {
            formData.append("image", vacation.image);
        }

        try {
            const { data } = await axios.put(vacationApi.EDIT_VACATION + vacation.vacationId, formData);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating vacation');
        }
    }

    // ADD VACATION
    async addVacation(vacation: VacationModel) {
        const formData = new FormData();
        formData.append('destination', vacation.destination);
        formData.append('description', vacation.description);
        formData.append('startDate', vacation.startDate.toString());
        formData.append('endDate', vacation.endDate.toString());
        formData.append('price', vacation.price.toString());

        if(vacation.editImageFile){
            formData.append("imageFile", vacation.editImageFile[0])
        }

        if (vacation.image) {
            formData.append("image", vacation.image);
        }

        try {
            const { data } = await axios.post(vacationApi.ADD_VACATION, formData);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error adding vacation');
        }
    }

    // GET VACATION BY ID
    async getVacation(id: number) {
        const { data } = await axios.get(`http://localhost:3001/api/vacations/${id}`);
        return data
    }

    async getVacationImage(id: number) {
        const response = await axios.get(`http://localhost:3001/api/vacationImage/${id}`, {responseType: 'blob'});
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        if(blob) {
            return URL.createObjectURL(blob)
        } else {
            return null
        }
    }


}

const vacationService = new VacationService
export default vacationService