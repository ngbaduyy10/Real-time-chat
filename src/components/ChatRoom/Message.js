import styled from 'styled-components';
import {Avatar} from "antd";

function Message ({text, displayName, createdAt, photoURL}) {
    const WrapperStyled = styled.div`
        margin-bottom: 10px;
        
        .name {
            margin-left: 5px;
            font-weight: bold;
        }
        .time {
            margin-left: 10px;
            color: #a7a7a7;
        }
        .text {
            margin-left: 45px;
        }
    `;

    return (
        <>
            <WrapperStyled>
                <div>
                    <Avatar size="large" src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                    <span className="name">{displayName}</span>
                    <span className="time">{createdAt}</span>
                </div>
                <div>
                    <span className="text">{text}</span>
                </div>
            </WrapperStyled>
        </>
    )
}

export default Message;