import {Col, Row} from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";

function Sidebar () {
    const SidebarStyled = styled.div`
        background-color: #172741;
        color: white;
        height: 100vh;
    `;

    return (
        <>
            <SidebarStyled>
                <Row>
                    <Col span={24}>
                        <UserInfo />
                    </Col>
                    <Col span={24}>
                        <RoomList />
                    </Col>
                </Row>
            </SidebarStyled>
        </>
    )
}

export default Sidebar;