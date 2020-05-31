import React from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@material-ui/core";

const CustomDialog = ({isOpen = false, onClose, onConfirm, title = '', saveBtnText = 'Save', children}) => {

    return <Dialog disableEnforceFocus fullWidth open={isOpen} onClose={onClose}>
        <DialogContent>
            <h2>{title}</h2>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onConfirm}
                    className="bg-primary text-white text-capitalize mr-4">
                {saveBtnText}
            </Button>
            <Button onClick={onClose} className="back_button text-capitalize mr-4">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

export default CustomDialog;
