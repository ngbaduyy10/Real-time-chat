import {Row, Col} from 'antd';
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatRoom () {
    return (
        <>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <ChatWindow />
                </Col>
            </Row>
        </>
    )
}

export default ChatRoom;