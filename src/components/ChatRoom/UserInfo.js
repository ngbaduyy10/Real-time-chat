import {Button, Avatar} from "antd";
import styled from "styled-components";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/config";
import {useContext} from "react";
import {AuthContext} from "../../context/authProvider";

function UserInfo () {
    const WrapperStyled = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 18px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        .username {
            margin-left: 6px;
            vertical-align: middle;
            font-size: 19px;
        }
    `;

    const {user, setSelectedRoom} = useContext(AuthContext);
    const {displayName, photoURL} = user;

    const handleSignOut = async () => {
        setSelectedRoom(null);
        await signOut(auth);
    }

    return (
        <>
            <WrapperStyled>
                <div>
                    <Avatar size="large" src={photoURL}>{photoURL ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
                    <span className="username">{displayName}</span>
                </div>
                <Button size="large" ghost onClick={handleSignOut}>Logout</Button>
            </WrapperStyled>
        </>
    )
}

export default UserInfo;