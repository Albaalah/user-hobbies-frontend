import React from "react";
import Hobbies from "../Hobbies";
import Users from "../Users";
import './index.scss';

const Layout = () => {
    return <div className={'d-flex justify-content-between'}>
        <Users/>
        <Hobbies/>
    </div>
};

export default Layout;
