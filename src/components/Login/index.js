import {Row, Col, Card, Button, Typography} from "antd";
import {GoogleOutlined, FacebookOutlined} from "@ant-design/icons";
import {FacebookAuthProvider, signInWithPopup} from "firebase/auth";
import {db, auth} from "../../firebase/config";
import {doc, getDoc, setDoc} from "firebase/firestore";

const fbProvider = new FacebookAuthProvider();

function Login () {
    const handleFbLogin = async () => {
        try {
            const data = await signInWithPopup(auth, fbProvider);
            const {user, providerId} = data;
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            if (!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    providerId: providerId,
                    createdAt: user.metadata.createdAt,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Row justify="center" style={{marginTop: "150px"}}>
                <Col span={8}>
                    <Card style={{ textAlign: "center", width: "100%", fontSize: "17px" }}>
                        <Typography.Title style={{marginTop: 0}} level={2}>Login</Typography.Title>
                        <Button
                            icon={<GoogleOutlined />}
                            style={{ textAlign: "center", width: "100%", marginBottom: 10, height: "40px" }}
                        >
                            Login with Google
                        </Button>
                        <Button
                            icon={<FacebookOutlined />}
                            type="primary" ghost style={{ textAlign: "center", width: "100%", height: "40px" }}
                            onClick={handleFbLogin}
                        >
                            Login with Facebook
                        </Button>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Login;