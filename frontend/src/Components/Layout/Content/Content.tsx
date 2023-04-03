import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import "./Content.css";
import Reports from "./Reports/Reports";
import Vacations from "./Vacations/Vacations";

function Content(): JSX.Element {
    return (
        <div className="Content">

            <Routes>
                <Route path="/" element={<Vacations />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/vacations" element={<Vacations />}></Route>
                <Route path="/vacationsReports" element={<Reports />}></Route>
            </Routes>

        </div>


    );
}

export default Content;
