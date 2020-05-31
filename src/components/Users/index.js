import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from "../../reducers/users.reducer";
import './index.scss';
import {getHobbies} from "../../reducers/hobbies.reducer";
import { CircularProgress } from '@material-ui/core';

const Users = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getUsers())
        }, []
    );
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);

    if (loading) {
        return <CircularProgress/>
    }

    return <div className={"resize user-container"}>
        <div className='d-flex justify-content-between m-2'>
            <h2>Users</h2>
            <Button variant="contained" color="primary">Add User</Button>
        </div>

        {users && users.map(user => {
            const {_id = '', name = ''} = user;
            return <div key={_id}>
                <div className='m-4' style={{cursor: 'pointer'}} onClick={()=> dispatch(getHobbies(_id))}>
                    {name}
                </div>
                <hr/>
            </div>
        })}
    </div>
};

export default Users;
