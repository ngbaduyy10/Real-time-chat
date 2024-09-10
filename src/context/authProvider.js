import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/config";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, createContext} from "react";
import {Spin} from "antd";

export const AuthContext = createContext(null);

function AuthProvider ({children}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    id: user.uid,
                    photoURL: user.photoURL});
                setLoading(false);
                navigate("/", {replace: true});
            } else {
                setLoading(false);
                navigate("/login", {replace: true});
            }
        });

        return () => {
            unsubscribed();
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{user, selectedRoom, setSelectedRoom}}>
            {loading ? <Spin /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;