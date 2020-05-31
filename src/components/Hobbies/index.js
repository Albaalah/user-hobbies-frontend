import React, {Fragment} from "react";
import './index.scss';
import {
    Button,
    CircularProgress,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from 'lodash';
import CustomDialog from "../Common/CustomDialog";
import {addHobby} from "../../reducers/hobbies.reducer";

const Hobbies = () => {
    const dispatch = useDispatch();
    const hobbiesDetail = useSelector(state => state.hobbies.hobbiesDetail);
    const loading = useSelector(state => state.users.loading);
    const [hobbyInfo, setHobbyInfo] = React.useState([]);
    const [deleteHobbyDialog, setDeleteHobbyDialog] = React.useState(false);
    const [addHobbyDialog, setAddHobbyDialog] = React.useState(false);
    const [confirmAddHobby, setConfirmAddHobby] = React.useState(false);
    const [selectedHobbyId, setSelectedHobbyId] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [passion, setPassion] = React.useState('Low');
    const [year, setYear] = React.useState('');

    if (loading) {
        return <CircularProgress/>
    }

    const onConformAddHobby = () => {
        const data = !isEmpty(hobbyInfo) ? hobbyInfo : hobbiesDetail;
        const {hobbies} = data;
        dispatch(addHobby({_id: !isEmpty(hobbies) ? `${(hobbies.length + 1)}` : '1', title, passion, year}));
        setConfirmAddHobby(false);
        resetState()
    };

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

    const resetState = () => {
        setTitle('');
        setPassion('Low');
        setYear('');
    };

    const renderHobbyDialogs = () => {
        return <Fragment>
            {addHobbyDialog && <CustomDialog isOpen={addHobbyDialog} saveBtnText={'Save'}
                                             onClose={() => {
                                                 setAddHobbyDialog(false);
                                                 resetState();
                                             }}
                                             title={'Add Hobby'} onConfirm={() => {
                setConfirmAddHobby(true);
                setAddHobbyDialog(false)
            }}
            >
                <div className="row">
                    <div className={'col-md-12 mt-4'}>
                        <label htmlFor={'name'}>Hobby Title:</label>
                        <input value={title} name='title' id='title' className="form-control form-control-sm"
                               placeholder='Enter hobby' type="text"
                               onChange={({target: {value = ''}}) => setTitle(value)}/>
                    </div>
                    <div className={'col-md-12 mt-4'}>
                        <label htmlFor={'passion'}>Passion:</label>
                        <Select
                            name={'passion'}
                            className="form-control form-control-sm"
                            value={passion}
                            onChange={({target: {value = ''}}) => setPassion(value)}
                        >
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                        </Select>
                    </div>

                    <div className={'col-md-12 mt-4'}>
                        <label htmlFor={'year'}>Year:</label>
                        <input value={year} name='year' id='year' className="form-control form-control-sm"
                               placeholder='Enter year' type="number" min={1900} max={2100}
                               onChange={({target: {value = ''}}) => {
                                   setYear(value)
                               }}/>
                    </div>
                </div>
            </CustomDialog>}
            <CustomDialog isOpen={deleteHobbyDialog} saveBtnText={'Confirm'} onClose={() => setDeleteHobbyDialog(false)}
                          title={'Confirm action'} onConfirm={onConfirmDelete}>
                <div className="row">
                    <div className={'col-md-12 mt-4'}>
                        <label>Delete this hobby?</label>
                    </div>
                </div>
            </CustomDialog>
            <CustomDialog isOpen={confirmAddHobby} saveBtnText={'Confirm'} onClose={() => {
                setConfirmAddHobby(false);
                resetState();
            }}
                          title={'Confirm action'} onConfirm={onConformAddHobby}>
                <div className="row">
                    <div className={'col-md-12 mt-4'}>
                        <label>Add new hobby?</label>
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
            {/*Show Add button only when a user is selected*/}
            {(!isEmpty(hobbiesDetail) || !isEmpty(hobbyInfo)) &&
            <Button variant="contained" color="primary" onClick={() => setAddHobbyDialog(true)}>Add Hobby</Button>}
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
