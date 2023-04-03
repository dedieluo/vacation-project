import "./Reports.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReportModel } from "../../Models/ReportModel";
import reportsServices from "../../Services/reportsServices";
import { CSVLink } from "react-csv";

;

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function Reports(): JSX.Element {
    const [chartData, setChartData] = useState<ReportModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        reportsServices.getAllReports().then((res) => {
            setChartData(res)
            
        });
    }, [])

    const csvData = chartData;
    const date = new Date();

    let labels: string[];
    labels = chartData.map((res) => res.destination);

    let totalLikes: number[];
    totalLikes = chartData.map((res) => res.totalLikes);

    const backHomePage = () => {
        navigate('/vacations')
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Likes',
                data: totalLikes,
                backgroundColor: 'rgba(255, 99, 132, 0.5)'

            }
        ],
    };

    return (
        <div className="Reports">
            <h1 className="logo">Vacations Reports</h1>
            <div className="reportsChart">
                <Button onClick={backHomePage} variant="dark">Back</Button>
                <Bar data={data} width={100} height={50} options={{ maintainAspectRatio: false }} />
            </div>

            <Button className="excelBtn" variant="success"><CSVLink style={{ textDecoration: "none", color: "white" }} data={csvData} filename={`Totle likes report - ${date.toLocaleDateString()}`}>Download EXCEL</CSVLink></Button>
        </div>
    );
}

export default Reports;


