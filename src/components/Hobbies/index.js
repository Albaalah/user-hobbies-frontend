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

const Hobbies = () => {
    const hobbiesDetail = useSelector(state => state.hobbies.hobbiesDetail);
    const loading = useSelector(state => state.users.loading);
    const [hobbyInfo, setHobbyInfo] = React.useState([]);

    if (loading) {
        return <CircularProgress/>
    }

    const onDelete = (id) => {
        // store current data in state and manipulate component state to shallow remove
        const data = !isEmpty(hobbyInfo) ? hobbyInfo : hobbiesDetail;
        const {hobbies} = data;
        hobbies.splice(hobbies.findIndex(item => item._id === id), 1);
        setHobbyInfo({hobbies})
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
    </div>
};

export default Hobbies;
