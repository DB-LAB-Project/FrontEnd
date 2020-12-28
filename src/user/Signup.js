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
        guardianPhone: "",
        role: 0,
        password: "",
        error: "",
        success: false
    });

    const [err, setErr] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        usnError: '',
        phoneError: '',
        guardianPhoneError: ''
    })

    let {_id,name, USN, email, phone, guardianPhone, role, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: "", [name]: event.target.value});
        setErr({
            nameError: '',
            emailError: '',
            passwordError: '',
            usnError: '',
            phoneError: '',
            guardianPhoneError: ''
        });
        if(name === 'role' && event.target.value === 0) {
            window.location.reload(false);
        }
    }

    const submitForm = e => {
        e.preventDefault();
        console.log(values);
        setValues({...values, error: ""});
        if(name === '') {
            setErr({...err, nameError:'This field cannot be empty!'});
            return;
        }
        else if(USN === '') {
            setErr({...err, usnError:'This field cannot be empty!'});
            return;
        }
        else if(email === '') {
            setErr({...err, emailError:'This field cannot be empty!'});
            return;
        }
        else if(phone === '') {
            setErr({...err, phoneError:'This field cannot be empty!'});
            return;
        }
        else if(guardianPhone === '') {
            setErr({...err, guardianPhoneError:'This field cannot be empty!'});
            return;
        }
        else if(password === '') {
            setErr({...err, passwordError:'This field cannot be empty!'});
            return;
        }
        signup({USN,name,email,phone,role,password,guardianPhone})
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
                        guardianPhone: "",
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
                                <label className="text-light">Name {err.nameError && <span className='text-danger'>{err.nameError}</span>}</label>
                                <input className="form-control" onChange={handleChange("name")} type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">User Id {err.usnError && <span className='text-danger'>{err.usnError}</span>}</label>
                                <input className="form-control" onChange={handleChange("USN")} type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Email {err.emailError && <span className='text-danger'>{err.emailError}</span>}</label>
                                <input className="form-control"  onChange={handleChange("email")} type="email" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Phone {err.phoneError && <span className='text-danger'>{err.phoneError}</span>}</label>
                                <input className="form-control"  onChange={handleChange("phone")} type="text" />
                            </div>
                            <div className="form-group" style={{display: role === 0 ? "" : "none"}}>
                                <label className="text-light">Parent/Guardian's Phone {err.guardianPhoneError && <span className='text-danger'>{err.guardianPhoneError}</span>}</label>
                                <input className="form-control"  onChange={handleChange("guardianPhone")} type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Role</label>
                                <select name="role" id="role" onChange={handleChange("role")} className="form-control">
                                    <option value="0">Student</option>
                                    <option value="1">Teacher</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="text-light">Password {err.passwordError && <span className='text-danger'>{err.passwordError}</span>}</label>
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
