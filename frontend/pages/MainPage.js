import React, { useContext } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";

const MainPage = () => {
    const { Logout } = useContext(AuthContext);
    return <BlueButton onPress={() => { Logout(); }} text="LOGOUT" style={{ marginTop: 300 }} /> // TODO: Implement
};

export default MainPage;