import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {getClassItems, leaveClass, deleteClass, postMaterial} from "./helper/userapicalls";
import {Redirect, Link} from 'react-router-dom'
import UploadDisplay from "./helper/uploadDisplay";

const UserClass = (props) => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [loading, setLoading] = useState(true);

    const [classUploads, setClassUploads] = useState([]);

    const [logoColor, setLogoColor] = useState('');

    const [displayClassForm, setDisplayClassForm] = useState("none");

    const [redirect, setRedirect] = useState(false);

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
            getClassItems(props.match.params.course_code)
                .then(data => {
                    setClassUploads(data);
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
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

    // Leave Class
    const handleLeaveClass = () => {
        const course_code = props.match.params.course_code;
        setLoading(true);
        leaveClass(course_code)
            .then(data => {
                console.log(data);
                setLoading(false);
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const leaveClassDialog = () => {
        return (
            <div className="card w-25 mx-auto border pt-4 mt-4" style={{display: displayClassForm}}>
                <div className="mb-3">
                    <p className='text-dark px-2'>Do you really want to leave the class? If you just want to exit to the dashboard, press the back arrow in the browser!</p>
                </div>
                <div className="d-flex">
                    <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closeForm}>Exit</button>
                    <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handleLeaveClass}>Leave Class</button>
                </div>
            </div>
        )
    };

    const displayForm = () => {
        setDisplayClassForm("");
        setDisplayMainContent("none");
    }

    const closeForm = () => {
        setDisplayClassForm("none");
        setDisplayMainContent("");
    }

    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3 p-4">
            <hr/>
            {loading ? loadingMessage() : (
                <div>
                    <div>
                        <div style={{backgroundColor: logoColor, borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                            <h3 className="p-1 text-dark text-center d-inline-block">{userInfo.name.slice(0,2)}</h3>
                        </div>
                        {/*<img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>*/}
                        <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
                        {redirect ? <Redirect to='/user/dashboard'/> : <> </>}
                        <button className="btn btn-lg btn-outline-warning float-right rounded mx-2" onClick={displayForm}>Leave Class</button>
                        <Link to={`/user/dashboard/my-class/${props.match.params.course_code}/assignments`}>
                            <button className="btn btn-lg btn-outline-primary float-right rounded mx-2">Assignments</button>
                        </Link>
                    </div>
                    <hr/>
                    <div className="container" style={{display: displayMainContent}}>
                        <UploadDisplay uploads={classUploads} isAssignment={false}/>
                    </div>
                    {leaveClassDialog()}
                </div>
            )}
        </Base>
    );
};

export default UserClass;
