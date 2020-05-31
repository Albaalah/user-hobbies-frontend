import React from "react";
import {
    Modal,
    Button,
    Dialog,
    DialogActions,
    DialogContent
} from "@material-ui/core";

const CustomDialog = ({isOpen, onClose, onConfirm, title, children}) => {

    return <Dialog disableEnforceFocus fullWidth open={isOpen} onClose={onClose}>
        <DialogContent>
            <h2>{title}</h2>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onConfirm}
                    className="bg-primary text-white text-capitalize mr-4">
                Save
            </Button>
            <Button onClick={onClose} className="back_button text-capitalize mr-4">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

export default CustomDialog;
