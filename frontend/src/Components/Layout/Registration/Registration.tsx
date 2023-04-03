import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../App/authSlice";
import { UserModel } from "../Models/UserModel";
import authService from "../Services/AuthService";

import "./Registration.css";

function Registration(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserModel>({ mode: "onBlur" });

    async function submit(data: UserModel) {
        const token = await authService.registerUser(
            data.firstName,
            data.lastName,
            data.email,
            data.password
        );

        dispatch(login(token));
        navigate("/vacations");
        
    }

    return (
        <div className="Registration">
            <div className="registerContainer">
                <h1 className="logo">Register</h1>
                <Form className="registerForm" onSubmit={handleSubmit(submit)}>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                        <span className="error">Please enter your first name</span>
                    )}

                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                        <span className="error">Please enter your last name</span>
                    )}

                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <span className="error">Please enter your email</span>
                    )}
                    {errors.email?.type === "pattern" && (
                        <span className="error">Please enter a valid email address</span>
                    )}

                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        {...register("password", { required: true, minLength: 4 })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="error">Please enter a password</span>
                    )}
                    {errors.password?.type === "minLength" && (
                        <span className="error">Password must be at least 4 characters</span>
                    )}

                    <div className="registerArea">
                        <p>Already have an account?</p>
                        <Link to="/login">Login now</Link>
                    </div>
                    <Button type="submit">Register</Button>
                </Form>
            </div>
        </div>
    );
}

export default Registration;
