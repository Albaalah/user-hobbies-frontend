import React, {Fragment} from "react";
import './index.scss';
import {
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {useSelector} from "react-redux";
import {isEmpty} from 'lodash';
import CustomDialog from "../Common/CustomDialog";

const Hobbies = () => {
    const hobbiesDetail = useSelector(state => state.hobbies.hobbiesDetail);
    const loading = useSelector(state => state.users.loading);
    const [hobbyInfo, setHobbyInfo] = React.useState([]);
    const [deleteHobbyDialog, setDeleteHobbyDialog] = React.useState(false);
    const [selectedHobbyId, setSelectedHobbyId] = React.useState(false);

    if (loading) {
        return <CircularProgress/>
    }

    const onConfirmDelete = () => {
        setDeleteHobbyDialog(false);
        // store current data in state and manipulate component state to shallow remove
        const data = !isEmpty(hobbyInfo) ? hobbyInfo : hobbiesDetail;
        const {hobbies} = data;
        hobbies.splice(hobbies.findIndex(item => item._id === selectedHobbyId), 1);
        setHobbyInfo({hobbies})
    };

    const onDelete = (id) => {
        setDeleteHobbyDialog(true);
        setSelectedHobbyId(id)
    };

    const renderHobbyDialogs = () => {
        return <Fragment>
            {/*<CustomDialog isOpen={addUserDialog} saveBtnText={'Save'}*/}
            {/*              onClose={()=> setAddUserDialog(false)}*/}
            {/*              title={'Add User'} onConfirm={onConfirm}*/}
            {/*>*/}
            {/*    <div className="row">*/}
            {/*        <div className={'col-md-12 mt-4'}>*/}
            {/*            <label htmlFor={'name'}>Name:</label>*/}
            {/*            <input value={name} name='name' id='name' className="form-control form-control-sm"*/}
            {/*                   placeholder='Enter name' type="text" onChange={({target:{value = ''}}) => setName(value)}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</CustomDialog>*/}
            <CustomDialog isOpen={deleteHobbyDialog} saveBtnText={'Confirm'} onClose={() => setDeleteHobbyDialog(false)}
                          title={'Confirm action'} onConfirm={onConfirmDelete}>
                <div className="row">
                    <div className={'col-md-12 mt-4'}>
                        <label>Delete this hobby?</label>
                    </div>
                </div>
            </CustomDialog>
        </Fragment>
    };

    const renderHobbies = () => {
        const HobbyList = !isEmpty(hobbyInfo) ? hobbyInfo.hobbies : hobbiesDetail.hobbies;
        return <Fragment>
            {
                HobbyList.map((hobby, index) => {
                    const {_id = '', title = '', passion = '', year = ''} = hobby;
                    return <TableRow key={_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell component="th" scope="row">
                            {title}
                        </TableCell>
                        <TableCell align="right">{passion}</TableCell>
                        <TableCell align="right">{year}</TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" color="primary" onClick={() => onDelete(_id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                })
            }
        </Fragment>
    };

    return <div className={"resize hobbies-container"}>
        <div className='d-flex justify-content-between m-2'>
            <h2>Hobbies</h2>
            <Button variant="contained" color="primary">Add Hobby</Button>
        </div>
        <div>
            {!isEmpty(hobbiesDetail) && !isEmpty(hobbiesDetail.hobbies) ? <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. no.</TableCell>
                                <TableCell>Hobby</TableCell>
                                <TableCell align="right">Passion</TableCell>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderHobbies()}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <p className='d-flex justify-content-center align-content-center'>No hobbies listed yet</p>}
        </div>
        {renderHobbyDialogs()}
    </div>
};

export default Hobbies;
