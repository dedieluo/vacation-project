import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserRole } from "../Models/UserModel";
import "./Navigate.css";

function Navigate(): JSX.Element {

    const authSlice: any = useSelector((state: any) => state?.authSlice);


    return (
        <div className="Navigate">
            <NavLink className="text-decoration-none" to="/vacations"> Home</NavLink>
            {/* <NavLink className="text-decoration-none" to={'/vacationsReports'}> Vacations Reports</NavLink> */}

            {authSlice?.role === UserRole.ADMIN ?
                <NavLink className="text-decoration-none" to={'/vacationsReports'}> Vacations Reports</NavLink>
                : ''
            }

        </div>
    );
}

export default Navigate;
