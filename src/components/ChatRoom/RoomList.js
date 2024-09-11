import {Collapse, Typography, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {useContext, useMemo, useState} from "react";
import {AuthContext} from "../../context/authProvider";
import useFirestore from "../../hooks/useFirestore";
import AddRoomModal from "../../modals/addRoomModal";
const { Panel } = Collapse;

function RoomList () {
    const PanelStyled = styled(Panel)`
        &&& {
            .ant-collapse-header {
                color: white;
                font-size: 18px;
                display: flex;
                align-items: center;
            }
            .ant-typography {
                color: white;
            }
            .ant-collapse-content-box {
                padding: 0 40px;
            }
            .add-room {
                padding: 7px;
                margin-top:  10px;
                color: white;
            }
        }
    `;

    const LinkStyled = styled(Typography.Link)`
        display: block;
        margin-bottom: 5px;
        font-size: 18px;
    `;

    const {user, selectedRoom, setSelectedRoom} = useContext(AuthContext);
    const {id} = user;
    const [showAddRoom, setShowAddRoom] = useState(false);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: id,
        }
    }, [id]);

    const rooms = useFirestore('rooms', roomsCondition);

    return (
        <>
            <Collapse defaultActiveKey={['1']} ghost>
                <PanelStyled header="Room List" key="1">
                    {rooms.map((room) => (
                        <LinkStyled
                            key={room.id}
                            style={room.id === selectedRoom?.id ? {color: 'blue'} : {color: 'white'}}
                            onClick={() => setSelectedRoom(room)}
                        >
                            {room.name}
                        </LinkStyled>
                    ))}
                    <Button
                        icon={<PlusOutlined />}
                        className="add-room"
                        ghost
                        onClick={() => setShowAddRoom(true)}>Add Room</Button>
                </PanelStyled>
            </Collapse>
            <AddRoomModal showAddRoom={showAddRoom} setShowAddRoom={setShowAddRoom} />
        </>
    )
}

export default RoomList;