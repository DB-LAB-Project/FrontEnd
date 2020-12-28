import React from 'react';
import {isAuthenticated} from "../auth/helper";

const Message = (props) => {

    const messages = props.messages;
    if(messages.length === 0) {
        return (
            <h2>No chats found</h2>
        )
    }
    let classUsers;
    if(typeof window !== 'undefined') {
        classUsers = JSON.parse(localStorage.getItem('class_users'));
    }
    const currentUser = props.currentUser;
    console.log(classUsers);

    const dbgLog = (msg) => {
        console.log(msg);
    }
    return (
         messages.map((message, idx) => {
             const isCurrentUser = message.user === isAuthenticated().user._id;
             return isCurrentUser ? (
                 <li className={"chat-right"} key={idx}>
                     <div className="chat-hour">08:55</div>
                     <div className="chat-text">{message.message}</div>
                     <div className="chat-avatar">
                        <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                            alt="Retail Admin"/>
                        <div className="chat-name">{classUsers.filter(user => user._id === message.user)[0].name}</div>
                    </div>
                </li>
                 )
                 : (
                     <li className={"chat-left"} key={idx}>
                         <div className="chat-avatar">
                        <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                            alt="Retail Admin"/>
                        <div className="chat-name">{classUsers.filter(user => user._id === message.user)[0].name}</div>
                        </div>
                         <div className="chat-text">{message.message}</div>
                         <div className="chat-hour">08:55</div>
                     </li>);
         })
    );
};

export default Message;
