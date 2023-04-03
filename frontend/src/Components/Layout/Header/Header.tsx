import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../App/authSlice";
import Navigate from "../Navigate/Navigate";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authSlice: any = useSelector((state: any) => state.authSlice);

    function userLogout() {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <>
            <div className="Header">
                <div className="title">
                    <h1> Vacations4You</h1>
                    <div className="nav">
                        <Navigate />
                    </div>
                </div>

                <div className="buttons">

                    <h5>Hello {authSlice?.firstname ?? "Guest"}</h5>

                    {!authSlice?.id ? "" : (
                        <Button variant="light" onClick={() => userLogout()}>
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
