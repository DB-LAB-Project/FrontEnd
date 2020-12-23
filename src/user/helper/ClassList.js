import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export const ClassList = (props) => {

    // const classes = JSON.parse(localStorage.getItem("classes"));
    const classes = props.cls;
    const isAdmin = props.isAdmin;
    const colors = [
        "#EAF0F1",
        "#E74292",
        "#01CBC6",
        "#BB2CD9",
        "#8B78E6",
        "#00CCCD",
        "#1287A5",
        "#EA7773",
        "#F5BCBA"
    ];

    const backgroundColorPicker = () => {
        const num = Math.floor(Math.random() * 9);
        return colors[num];
    }

    if(!classes || classes.length === 0) {
        return <div className="text-center w-100">
            <h1 className="text-white text-center d-4">No Classes found!!! :(</h1>
        </div>
    }
    return classes.map((cls, idx) => {
        return isAdmin ? (<Link to={`/admin/dashboard/my-class/${cls["course_code"]}`}>
                <div className="card d-inline-block m-2 px-0" key={idx} style={{backgroundColor: backgroundColorPicker(), width: "302px"}}>
                    <h2 className="card-header text-left text-dark">{cls.subject}</h2>
                    <h6 className="card-body text-left text-dark d-1 d-inline-block">{cls["course_code"]}</h6>
                </div>
            </Link>) : (<Link to={`/user/dashboard/my-class/${cls["course_code"]}`}>
                <div className="card d-inline-block m-2 px-0" key={idx} style={{backgroundColor: backgroundColorPicker(), width: "302px"}}>
                    <h2 className="card-header text-left text-dark">{cls.subject}</h2>
                    <h6 className="card-body text-left text-dark d-1 d-inline-block">{cls["course_code"]}</h6>
                </div>
            </Link>)




    });
};

