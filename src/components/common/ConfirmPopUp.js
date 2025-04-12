// external dependencies
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// internal dependencies
import { DIALOG_ACTIONS, METHODS } from "../../constant";
import { ajaxRequest } from "../../utils";

export const ConfirmPopUp = ({
  openDialog,
  closeDialog,
  dialogHeading,
  dialogDescription,
  action,
  task,
  getTaskList,
}) => {
  const handleDeleteTask = async () => {
    if (task.id) {
      const data = await ajaxRequest(`tasks/${task.id}`, METHODS.DELETE, null);
      if (data) {
        getTaskList();
        closeDialog();
      }
    }
  };

  const handleSubmit = async () => {
    switch (action) {
      case DIALOG_ACTIONS.DELETE:
        handleDeleteTask();
        break;
      default:
        break;
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => closeDialog()}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle align="center" fontSize={25} fontWeight={500}>
        <span className="moving-top">
          <IconButton
            aria-label="close"
            className="box-shadow"
            onClick={closeDialog}
          >
            <CloseIcon />
          </IconButton>
        </span>
        <div className="task-dialog-heading">{dialogHeading} </div>
      </DialogTitle>
      <DialogContent className="task-dialog-content">
        <div>{dialogDescription}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
