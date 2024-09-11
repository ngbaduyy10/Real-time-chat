import {Modal, Form, Select, Avatar, Flex} from "antd";
import {useContext, useEffect, useState} from "react";
import {db} from "../firebase/config";
import {collection, getDocs, doc, updateDoc} from "firebase/firestore";
import {AuthContext} from "../context/authProvider";

function InviteMembersModal ({showInviteModal, setShowInviteModal}) {
    const {selectedRoom} = useContext(AuthContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getOptions = async () => {
            setLoading(true);
            const usersRef = collection(db, 'users');
            const usersSnap = await getDocs(usersRef);
            usersSnap.forEach((doc) => {
                if (!selectedRoom.members.includes(doc.id)) {
                    setOptions((prev) => [...prev, {
                        label: (
                            <Flex align="center" gap={5}>
                                <Avatar size="small" src={doc.data().photoURL}>
                                    {doc.data().photoURL ? '' : doc.data().name.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>{doc.data().name}</div>
                            </Flex>
                        ),
                        value: doc.id,
                    }]);
                }
            });
            setLoading(false);
        }

        if (selectedRoom) {
            getOptions();
        }
    }, [selectedRoom]);

    const handleCancel = () => {
        setShowInviteModal(false);
        form.resetFields();
    }

    const handleOk = async () => {
        setLoading(true);
        const value = await form.validateFields();
        const roomRef = doc(db, "rooms", selectedRoom.id);
        await updateDoc(roomRef, {
            members: [...selectedRoom.members, ...value.invitedMembers],
        });
        setLoading(false);
        handleCancel();
    }

    return (
        <>
            <Modal
                title="Invite members"
                open={showInviteModal}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
                loading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Members" name="invitedMembers" rules={[{ required: true, message: "Please input members" }]}>
                        <Select
                            mode="multiple"
                            size="large"
                            placeholder="Please select"
                            style={{ width: '100%' }}
                            options={options}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default InviteMembersModal;