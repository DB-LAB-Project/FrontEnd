import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import {getAllChatsInClass, postChat} from "./helper/userapicalls";
import './discussionGroup.css';
import Base from "../core/Base";
import Message from "./Message";

let socket;

const DiscussionGroup = (props) => {

    const [room, setRoom] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });
    const [logoColor, setLogoColor] = useState('');
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const colors = [
        "#ade8f4",
        "#e6b8a2",
        "#01CBC6",
        "#b7e4c7",
        "#faedcd",
        "#fefae0",
        "#80ffdb",
        "#00CCCD",
        "#F5BCBA"
    ];

    const ENDPOINT = 'http://localhost:5000'

    const backgroundColorPicker = () => {
        const num = Math.floor(Math.random() * 9);
        return colors[num];
    }

    useEffect(() => {
        if(typeof window !== 'undefined') {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("jwt")).user;
            let {name, _id, email, role} = user;
            setUserInfo({...userInfo, name: name, _id: _id, email: email, role: role});
            setLogoColor(backgroundColorPicker());
            setRoom(props.match.params.course_code);
            getAllChatsInClass(props.match.params.course_code)
                .then(data => {
                    // setMessages(data);
                    const msgArr = data.map(ele => {
                        return {
                            message: ele.message,
                            user: ele.sent_by
                        }
                    });
                    setMessages(msgArr);
                    // console.log(msgArr);
                    setLoading(false);
                    // console.log(messages);
                })
                .catch(err => {
                    console.log(err);
                });
            socket = io(ENDPOINT);
            console.log(name, props.match.params.course_code);
            socket.emit('join', {name, room: props.match.params.course_code});
            console.log(socket);
        }

    }, []);

    useEffect(() => {
        socket.on('message', ({user, message}) => {
            setMessages([...messages, {message, user}]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        const message = {
            message: msg,
            user: userInfo._id,
            room: props.match.params.course_code
        }
        postChat(props.match.params.course_code, msg)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        setMsg('');
        socket.emit('sendMessage', message, () => setMsg(''));
        // window.location.reload(false);
    }

    return (
        <Base className="px-0">
            {!loading &&
            <ScrollToBottom>
            <div className="container-fluid bg-dark h-100" style={{marginTop: "56px"}}>

                <div className="content-wrapper">

                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card m-0">
                                <div className="row no-gutters">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                                        <div className="users-container">
                                            <div className="chat-search-box">
                                                <h4>Users in Discussion Group</h4>
                                            </div>
                                            <ul className="users">
                                                {JSON.parse(localStorage.getItem('class_users')).map(user => {
                                                    return <li className="person" data-chat="person1">
                                                        <div className="user">
                                                            <img
                                                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                                                alt="Retail Admin"/>
                                                        </div>
                                                        <p className="name-time">
                                                            <span className="name">{user.name}</span>
                                                        </p>
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9 bg-dark">
                                        <div className="selected-user">
                                            <span className='text-white'>Group Id: <span className="name">{props.match.params.course_code}</span></span>
                                        </div>
                                        <div className="chat-container bg-dark text-dark">
                                            <ul className="chat-box chatContainerScroll">
                                                <ScrollToBottom>
                                                    <Message messages={messages} currentUser={userInfo}/>
                                                </ScrollToBottom>
                                            </ul>
                                            <div className="form-group mt-3 mb-0">
                                                <textarea className="form-control" rows="3"
                                                          placeholder="Type your message here... Press Enter to send your chat" multiline={true} onChange={event => setMsg(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} value={msg}></textarea>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ScrollToBottom>
                }
        </Base>
    );
};

export default DiscussionGroup;


// TODO: https://github.com/adrianhajdin/project_chat_application Credits for chat window design
