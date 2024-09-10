import styled from 'styled-components';
import {UserAddOutlined, SendOutlined} from "@ant-design/icons";
import {Button, Avatar, Tooltip, Flex, Form, Input} from "antd";
import Message from "./Message";
import {useContext} from "react";
import {AuthContext} from "../../context/authProvider";

function ChatWindow () {
    const HeaderStyled = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 77px;
        padding: 0 16px;
        border-bottom: 1px solid rgb(230, 230, 230);
        
        .header {
            &__info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 4px;
            }
            
            &__title {
                margin: 0;
                font-size: 18px;
                font-weight: bold;
            }
        }
    `;

    const WrapperStyled = styled.div`
        height: 100vh;
    `;

    const ContentStyled = styled.div`
        height: calc(100% - 98px);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 10px;
    `;

    const FormStyled = styled(Form)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        
        .form-item {
            flex: 1;
            margin-bottom: 0;
        }
    `;

    const MessageListStyled = styled.div`
        max-height: 100%;
        overflow-y: auto;
    `;

    const {selectedRoom} = useContext(AuthContext);

    return (
        <>
            <WrapperStyled>
                <HeaderStyled>
                    <div className="header__info">
                        <div className="header__title">{selectedRoom?.name}</div>
                        <span>{selectedRoom?.description}</span>
                    </div>
                    <Flex align="center" gap="5px">
                        <Button type='text' size="large" icon={<UserAddOutlined />}>Add</Button>
                        <Avatar.Group max={{count: 3}}>
                            <Tooltip title="A">
                                <Avatar src="https://i.pravatar.cc/150?img=11" />
                            </Tooltip>
                            <Tooltip title="B">
                                <Avatar src="https://i.pravatar.cc/150?img=12" />
                            </Tooltip>
                            <Tooltip title="C">
                                <Avatar src="https://i.pravatar.cc/150?img=13" />
                            </Tooltip>
                            <Tooltip title="D">
                                <Avatar src="https://i.pravatar.cc/150?img=14" />
                            </Tooltip>
                            <Tooltip title="E">
                                <Avatar src="https://i.pravatar.cc/150?img=15" />
                            </Tooltip>
                            <Tooltip title="F">
                                <Avatar src="https://i.pravatar.cc/150?img=16" />
                            </Tooltip>
                        </Avatar.Group>
                    </Flex>
                </HeaderStyled>
                <ContentStyled>
                    <MessageListStyled>
                        <Message text="Hello" displayName="A" createdAt="11/11/2021" photoURL="https://i.pravatar.cc/150?img=11" />
                        <Message text="Hi" displayName="B" createdAt="11/11/2021" photoURL="https://i.pravatar.cc/150?img=12" />
                        <Message text="Hey" displayName="C" createdAt="11/11/2021" photoURL="https://i.pravatar.cc/150?img=13" />
                    </MessageListStyled>
                    <FormStyled>
                        <Form.Item className="form-item">
                            <Input placeholder="Send message..." size="large"/>
                        </Form.Item>
                        <Button type='text' size="large" icon={<SendOutlined />} />
                    </FormStyled>
                </ContentStyled>
            </WrapperStyled>
        </>
    )
}

export default ChatWindow;