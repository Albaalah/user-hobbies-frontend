import React, {Fragment, useEffect} from "react";
import {Button, CircularProgress} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import {addUser, getUsers} from "../../reducers/users.reducer";
import './index.scss';
import {isEmpty} from 'lodash';
import {getHobbies} from "../../reducers/hobbies.reducer";
import CustomDialog from '../Common/CustomDialog';

const Users = () => {
    const dispatch = useDispatch();
    const [addUserDialog, setAddUserDialog] = React.useState(false);
    const [confirmationDialog, setConfirmationDialog] = React.useState(false);
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
        // handling id on frontend due to database non-availability
        dispatch(addUser({_id: !isEmpty(users) ? `${(users.length + 1)}` : '1', name: name}));
        setName('')
        setConfirmationDialog(false)
    };

    const onConfirm = () => {
        setAddUserDialog(false);
        setConfirmationDialog(true);
    };

    const renderUserDialogs = () => {
        return <Fragment>
            <CustomDialog isOpen={addUserDialog} saveBtnText={'Save'}
                                            onClose={() => {
                                                setName('')
                                                setAddUserDialog(false)
                                            }}
                                            title={'Add User'} onConfirm={onConfirm}
            >
                <div className="row">
                    <div className={'col-md-12 mt-4'}>
                        <label htmlFor={'name'}>Name:</label>
                        <input value={name} name='name' id='name' className="form-control form-control-sm"
                               placeholder='Enter name' type="text"
                               onChange={({target: {value = ''}}) => setName(value)}/>
                    </div>
                </div>
            </CustomDialog>
            <CustomDialog isOpen={confirmationDialog} saveBtnText={'Confirm'}
                          onClose={() => {
                              setConfirmationDialog(false)
                              setName('')
                          }} title={'Confirm action'} onConfirm={onAddUser}>
                <div className="row">
                    <div className={'col-md-12 mt-4'}>
                        <label>Add this user?</label>
                    </div>
                </div>
            </CustomDialog>
        </Fragment>
    }

    return <div className={"resize user-container"}>
        <div className='d-flex justify-content-between m-2'>
            <h2>Users</h2>
            <Button variant="contained" color="primary" onClick={() => setAddUserDialog(true)}>Add User</Button>
        </div>

        {!isEmpty(users) && users.map(user => {
            const {_id = '', name = ''} = user;
            return <div key={_id}>
                <div className='m-4' style={{cursor: 'pointer'}} onClick={() => dispatch(getHobbies(_id))}>
                    {name}
                </div>
                <hr/>
            </div>
        })}
        {renderUserDialogs()}
    </div>
};

export default Users;
