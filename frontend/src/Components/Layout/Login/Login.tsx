import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../App/authSlice";
import { UserModel } from "../Models/UserModel";
import authService from "../Services/AuthService";
import "./Login.css";

function Login(): JSX.Element {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();

    const onSubmit = (data: UserModel) => {
        authService.login(data.email, data.password)
            .then((res) => {
                dispatch(login(res))
                navigate('/vacations')
            });
    };

    return (
        <div className="Login">
            <div className="loginContainer">
                <h1>Login</h1>
                <Form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control type="email" placeholder="Enter email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} />
                    {errors.email && <p>{errors.email.message}</p>}
                    <Form.Control type="password" placeholder="Enter password" {...register("password", { required: "Password is required", minLength: { value: 4, message: "Password must be at least 4 characters long" } })} />
                    {errors.password && <p>{errors.password.message}</p>}
                    <div className="registerArea">
                        <p>Not a member yet?</p>
                            <Link to="/register">Register now</Link>
                    </div>
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
