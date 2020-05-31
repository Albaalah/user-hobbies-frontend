import React from "react";
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

    if (loading) {
        return <CircularProgress/>
    }

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hobbiesDetail.hobbies.map((hobby, index) => {
                                const {_id = '', title = '', passion = '', year = ''} = hobby;
                                return <TableRow key={_id}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {title}
                                    </TableCell>
                                    <TableCell align="right">{passion}</TableCell>
                                    <TableCell align="right">{year}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <p className='d-flex justify-content-center align-content-center'>No hobbies listed yet</p>}
        </div>
    </div>
};

export default Hobbies;
