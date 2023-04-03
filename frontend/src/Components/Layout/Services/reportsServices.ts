import axios from "axios";
import { ReportModel } from "../Models/ReportModel";

class ReportsServices {

    public async getAllReports(): Promise<ReportModel[]> {
        const { data } = await axios.get<ReportModel[]>('http://localhost:3001/api/vacationsReports');
        return data;
    }


}

const reportsServices = new ReportsServices;
export default reportsServices;



