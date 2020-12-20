import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {getUserClasses} from "./helper/userapicalls";

const AdminClass = (props) => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [loading, setLoading] = useState(true);

    const [logoColor, setLogoColor] = useState('');

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

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("jwt")).user;
            let {name, _id, email, role} = user;
            setUserInfo({...userInfo, name: name, _id: _id, email: email, role: role});
            setLogoColor(backgroundColorPicker());
            setLoading(false);
        }
    }, []);

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3">
            <hr/>
            {loading ? loadingMessage() : (
                <div>
                    <div>
                        <div style={{backgroundColor: logoColor, borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                            <h3 className="p-1 text-dark text-center d-inline-block">{userInfo.name.slice(0,2)}</h3>
                        </div>
                        {/*<img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>*/}
                        <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
                        {/*<button className="btn btn-lg btn-outline-success float-right rounded" onClick={displayForm}>Create Class</button>*/}
                    </div>
                    <hr/>

                </div>
            )}
        </Base>
    );
};

export default AdminClass;
