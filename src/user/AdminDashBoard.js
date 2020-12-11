import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import user from '../assets/user.png'

const AdminDashBoard = () => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("jwt")).user;
            let {name, _id, email, role} = user;
            setUserInfo({...userInfo, name: name, _id: _id, email: email, role: role});
            setLoading(false);
        }
    }, []);

    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3">
            <hr/>
            <div>
                <img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>
                <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
            </div>

        </Base>
    );
};

export default AdminDashBoard;
