import styled from 'styled-components';
import {UserAddOutlined, SendOutlined} from "@ant-design/icons";
import {Button, Avatar, Tooltip, Flex, Form, Input, Alert} from "antd";
import Message from "./Message";
import {useContext, useEffect, useState, useCallback, useMemo} from "react";
import {AuthContext} from "../../context/authProvider";
import {getDocumentById} from "../../firebase/services";
import InviteMembersModal from "../../modals/inviteMembersModal";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase/config";
import useFirestore from "../../hooks/useFirestore";
import dayjs from "dayjs";

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

    const [form] = Form.useForm();
    const [members, setMembers] = useState([]);
    const {user, selectedRoom} = useContext(AuthContext);
    const [showInvite, setShowInvite] = useState(false);

    const getMembers = useCallback(async () => {
        if (!selectedRoom) return;

        const membersData = [];
        for (let i = 0; i < selectedRoom.members.length; i++) {
            const member = await getDocumentById("users", selectedRoom.members[i]);
            membersData.push({
                id: selectedRoom.members[i],
                ...member,
            });
        }
        setMembers(membersData);
    }, [selectedRoom]);

    useEffect(() => {
        getMembers();
    }, [getMembers]);

    const handleSubmit = async () => {
        const message = await form.getFieldValue('message');
        form.resetFields(['message']);
        await addDoc(collection(db, 'messages'), {
            user: user.id,
            photoURL: user.photoURL,
            displayName: user.displayName,
            room: selectedRoom.id,
            text: message,
            createdAt: new Date().toISOString(),
        });
    }

    const messagesCondition = useMemo(() => {
        return {
            fieldName: 'room',
            operator: '==',
            compareValue: selectedRoom?.id,
        }
    }, [selectedRoom]);

    const messages = useFirestore('messages', messagesCondition);

    return (
        <>
            {selectedRoom ? (
                <>
                    <WrapperStyled>
                        <HeaderStyled>
                            <div className="header__info">
                                <div className="header__title">{selectedRoom?.name}</div>
                                <span>{selectedRoom?.description}</span>
                            </div>
                            <Flex align="center" gap="5px">
                                <Button type='text' size="large" icon={<UserAddOutlined />} onClick={() => setShowInvite(true)}>Add</Button>
                                <Avatar.Group max={{count: 3}}>
                                    {members.map((member) => (
                                        <Tooltip title={member.name} key={member.id}>
                                            <Avatar src={member.photoURL}>
                                                {member.photoURL ? '' : member.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    ))}
                                </Avatar.Group>
                            </Flex>
                        </HeaderStyled>
                        <ContentStyled>
                            <MessageListStyled>
                                {messages.map((message) => (
                                    <Message
                                        key={message.id}
                                        text={message.text}
                                        displayName={message.displayName}
                                        createdAt={dayjs(message.createdAt).format('DD/MM/YYYY HH:mm')}
                                        photoURL={message.photoURL}
                                    />
                                ))}
                            </MessageListStyled>
                            <FormStyled form={form}>
                                <Form.Item className="form-item" name="message">
                                    <Input
                                        placeholder="Send message..."
                                        size="large"
                                        onPressEnter={handleSubmit}
                                    />
                                </Form.Item>
                                <Button type='text' size="large" icon={<SendOutlined />} onClick={handleSubmit} />
                            </FormStyled>
                        </ContentStyled>
                    </WrapperStyled>

                    <InviteMembersModal showInviteModal={showInvite} setShowInviteModal={setShowInvite} />
                </>
            ) : (
                <Alert message="Please select a room" type="info" showIcon style={{margin: '7px'}} />
            )}
        </>
    )
}

export default ChatWindow;