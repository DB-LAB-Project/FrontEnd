import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {getUserClasses, enrollIntoClass} from "./helper/userapicalls";
import {ClassList} from "./helper/ClassList";

const UserDashBoard = () => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 0
    });

    const [cls, setCls] = useState([]);

    const [loading, setLoading] = useState(true);

    const [displayEnrollForm, setDisplayEnrollForm] = useState("none");

    const [enrollClassCode, setEnrollClassCode] = useState('');

    const [logoColor, setLogoColor] = useState('');

    const [displayMainContent, setDisplayMainContent] = useState("");

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
            getUserClasses(userInfo._id).then(data => {
                setCls([...data]);
                if(typeof window !== "undefined") {
                    localStorage.setItem("classes", JSON.stringify(data));
                }
            });
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

    const handleCLassFormChange = (event) => {
        setEnrollClassCode(event.target.value);
        console.log(enrollClassCode);
    }

    const displayForm = () => {
        setDisplayEnrollForm("");
        setDisplayMainContent("none");
    }

    const closeForm = () => {
        setDisplayEnrollForm("none");
        setDisplayMainContent("");
        window.location.reload(false);
    }

    const classEnrollForm = () => {
        return (
            <div className="card w-25 mx-auto border" style={{display: displayEnrollForm}}>
                <form className="m-3 p-4 border border-secondary rounded">
                    <div className="mb-3">
                        <label className="form-label text-dark">Course Code</label>
                        <input type="text" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handleCLassFormChange}/>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closeForm}>Exit</button>
                        <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handleEnrollClass}>Enroll into Class</button>
                    </div>
                </form>
            </div>
        )
    };
    const handleEnrollClass = () => {
        setLoading(true);
        enrollIntoClass(enrollClassCode)
            .then(data => {
                console.log(data);
                setLoading(false);
                closeForm();
            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3 p-4">
            <hr/>
            {loading ? loadingMessage(): (
                <div>
                    <div>
                        <div style={{backgroundColor: logoColor, borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                            <h3 className="p-1 text-dark text-center d-inline-block">{userInfo.name.slice(0,2)}</h3>
                        </div>
                        {/*<img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>*/}
                        <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
                        <button className="btn btn-lg btn-outline-success float-right rounded" onClick={displayForm}>Enroll</button>
                    </div>
                    <hr/>
                    <div className="row align-items-start" style={{display: displayMainContent}}>
                        <ClassList cls={cls} isAdmin={false}/>
                    </div>
                    {classEnrollForm()}
                </div>
            )}
        </Base>
    );
}



export default UserDashBoard;
