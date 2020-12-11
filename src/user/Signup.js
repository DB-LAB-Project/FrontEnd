import React, {useState} from 'react';
import Base from "../core/Base";
import {signup} from "../auth/helper";
import {Link} from 'react-router-dom'
import Signin from "./Signin";

const Signup = () => {

    const [values, setValues] = useState({
        _id: "",
        name: "",
        USN: "",
        email: "",
        phone: "",
        role: 0,
        password: "",
        error: "",
        success: false
    });

    let {_id,name, USN, email, phone, role, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: "", [name]: event.target.value});
    }

    const submitForm = e => {
        e.preventDefault();
        console.log(values);
        setValues({...values, error: ""});
        signup({USN,name,email,phone,role,password})
            .then(data => {
                console.log(data);
                if(data.error) {
                    setValues({...values, error: data.error, success: false});
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        phone: "",
                        role: 0,
                        password: "",
                        USN: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    const successMessage = () => {
        return(
            <div className="row mt-5">
            <div className="col-md-6 offset-sm-3 text-left">
        <div
        className = "alert alert-success mt-3"
        style = {{display: success ? "" : "none"}}
        >
            Signed Up successfully. Please <Link to='/signin'>Log In</Link> here.
        </div>
            </div>
        </div>
        );
    }

    const errorMessage = () => {
        return(
        <div className="row mt-3">
            <div className="col-md-6 offset-sm-3 text-left">
        <div
            className = "alert alert-danger mt-5"
            style = {{display: error ? "" : "none"}}
        >
            {error}
        </div>
            </div>
        </div>
        );
    }

    const signUpForm = () => {
        return (
            <div className="mx-auto">
                <div className="row mt-5">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form onSubmit={submitForm}>
                            <div className="form-group">
                                <label className="text-light">Name</label>
                                <input className="form-control" onChange={handleChange("name")} type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">User Id</label>
                                <input className="form-control" onChange={handleChange("USN")} type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Email</label>
                                <input className="form-control"  onChange={handleChange("email")} type="email" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Phone</label>
                                <input className="form-control"  onChange={handleChange("phone")} type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Role</label>
                                <select name="role" id="role" onChange={handleChange("role")} className="form-control">
                                    <option value="0">Student</option>
                                    <option value="1">Teacher</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="text-light">Password</label>
                                <input className="form-control" onChange={handleChange("password")} type="text" />
                            </div>
                            <button className="btn btn-success btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Base>
            <h1 className="text-white text-center display-4 mt-5">Sign Up</h1>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    );
};

export default Signup;
