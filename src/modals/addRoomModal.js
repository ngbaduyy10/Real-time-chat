import {Form, Modal, Input} from "antd";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase/config";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authProvider";

function AddRoomModal ({showAddRoom, setShowAddRoom}) {
    const [form] = Form.useForm();
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setShowAddRoom(false);
        form.resetFields();
    }

    const handleOk = async () => {
        setLoading(true);
        const value = await form.validateFields();
        await addDoc(collection(db, 'rooms'), {
            ...value,
            members: [user.id],
            createdAt: new Date().toISOString(),
        });
        handleCancel();
        setLoading(false);
    }

    return (
        <>
            <Modal
                title="Create room"
                open={showAddRoom}
                onCancel={handleCancel}
                onOk={handleOk}
                destroyOnClose
                loading={loading}
            >
                <Form form={form} layout="vertical" >
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input room name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input room description" }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddRoomModal