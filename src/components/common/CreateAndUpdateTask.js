// external dependencies
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button, DialogTitle, IconButton } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

// internal dependencies
import { ajaxRequest } from "../../utils";
import { DIALOG_ACTIONS, METHODS } from "../../constant";

export const CreateAndUpdateTask = ({
  openDialog,
  closeDialog,
  getTaskList,
  action,
  dialogHeading,
  taskDetails,
}) => {
  const [taskHeading, setTaskHeading] = useState(
    taskDetails ? taskDetails.taskHeading : ""
  );
  const [task, setTask] = useState(taskDetails ? taskDetails.task : "");

  const handleCreateTask = async (body) => {
    const data = await ajaxRequest(`tasks`, METHODS.POST, body);
    if (data) {
      closeDialog();
      setTaskHeading("");
      setTask("");
      getTaskList();
    }
  };

  const handleUpdateTask = async (body) => {
    const data = await ajaxRequest(
      `tasks/${taskDetails.id}`,
      METHODS.PATCH,
      body
    );
    if (data) {
      closeDialog();
      setTaskHeading("");
      setTask("");
      getTaskList();
    }
  };

  const handleSubmit = async () => {
    try {
      const body = {
        taskHeading,
        task,
      };

      switch (action) {
        case DIALOG_ACTIONS.CREATE:
          await handleCreateTask(body);
          break;
        case DIALOG_ACTIONS.UPDATE:
          await handleUpdateTask(body);
          break;
        default:
          break;
      }
    } catch (err) {
      console.log("error", err);
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
        <div className="task-heading-container">
          <TextField
            id="textfield-task-heading"
            sx={{ width: "100%" }}
            label="Task Heading"
            variant="outlined"
            placeholder="Enter heading"
            onChange={(e) => setTaskHeading(e.target.value)}
            value={taskHeading}
          />
        </div>
        <div className="task-name-container">
          <TextareaAutosize
            minRows={5}
            placeholder="Enter your task here"
            className="task-textarea"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          disabled={
            !taskHeading ||
            !task ||
            (action === DIALOG_ACTIONS.UPDATE &&
              taskDetails.taskHeading === taskHeading &&
              taskDetails.task === task)
          }
          variant="contained"
          onClick={handleSubmit}
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
