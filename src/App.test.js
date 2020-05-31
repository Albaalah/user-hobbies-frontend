import React from 'react';
import ReactDom from "react-dom";
import CustomDialog from "./components/Common/CustomDialog";

test('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDom.render(<CustomDialog></CustomDialog>, div);
    ReactDom.unmountComponentAtNode(div);
});
