import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, addUser} from "../../reducers/users.reducer";
import './index.scss';
import {isEmpty} from 'lodash';
import {getHobbies} from "../../reducers/hobbies.reducer";
import { CircularProgress } from '@material-ui/core';
import CustomDialog from '../Common/CustomDialog';

const Users = () => {
    const dispatch = useDispatch();
    const [addUserModal, setAddUserModal] = React.useState(false);
    const [name, setName] = React.useState('');

    useEffect(() => {
            dispatch(getUsers())
        }, []
    );
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);

    if (loading) {
        return <CircularProgress/>
    }

    const onAddUser = () => {
        dispatch(addUser({_id: !isEmpty(users) ? `${(users.length + 1)}` : '1', name: name}))
        // handling id on frontend due to database non-availability
    };

    return <div className={"resize user-container"}>
        <div className='d-flex justify-content-between m-2'>
            <h2>Users</h2>
            <Button variant="contained" color="primary" onClick={()=> setAddUserModal(true)}>Add User</Button>
        </div>

        {!isEmpty(users) && users.map(user => {
            const {_id = '', name = ''} = user;
            return <div key={_id}>
                <div className='m-4' style={{cursor: 'pointer'}} onClick={()=> dispatch(getHobbies(_id))}>
                    {name}
                </div>
                <hr/>
            </div>
        })}

        <CustomDialog isOpen={addUserModal} onClose={()=> setAddUserModal(false)} title={'Add User'} onConfirm={onAddUser}>
            <div className="row">
                <div className={'col-md-12 mt-4'}>
                    <label htmlFor={'name'}>Name:</label>
                    <input value={name} name='name' id='name' className="form-control form-control-sm"
                           placeholder='Enter name' type="text" onChange={({target:{value = ''}}) => setName(value)}/>
                </div>
            </div>
        </CustomDialog>
    </div>
};

export default Users;
