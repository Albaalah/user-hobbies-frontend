import React from 'react';
import ReactDom from 'react-dom';
import CustomDialog from './CustomDialog';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';


it('renders dialog without crashing', () => {
    const div = document.createElement("div");
    ReactDom.render(<CustomDialog></CustomDialog>, div)
});

it('renders button text correctly', () => {
    const {getByTestId} = render(<CustomDialog isOpen={true} saveBtnText={'Save'}
                                               onClose={() => null} onConfirm={() => null} title={'Title'}>
        <p>Content</p></CustomDialog>);
    expect(getByTestId('save-btn')).toHaveTextContent('Save');
});

it('renders title heading correctly', () => {
    const {getByTestId} = render(<CustomDialog isOpen={true} saveBtnText={'Save'}
                                               onClose={() => null} onConfirm={() => null} title={'Title'}>
        <p>Content</p></CustomDialog>);
    expect(getByTestId('title-heading')).toHaveTextContent('Title');
});

it('matches snapshot', () => {
    const { asFragment } = render(<CustomDialog isOpen={true} saveBtnText={'Save'}
                                                onClose={() => null} onConfirm={() => null} title={'Title'}>
        <p>Content</p></CustomDialog>);
    expect(asFragment()).toMatchSnapshot()
});
