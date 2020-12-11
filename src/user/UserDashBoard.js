import React, {useState, useEffect} from 'react';
import Base from "../core/Base";

const UserDashBoard = () => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 0
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
        <Base>
            <div>
                <h1 className="text-white d-4 text-center mt-4">Welcome {userInfo.name}</h1>
            </div>
        </Base>
    );
};

export default UserDashBoard;
