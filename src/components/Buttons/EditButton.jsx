import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { logId } = props.entry;

  // when clicked, get the parent trip log entry's id and open the edit entry dialog
  const handleClick = () => {
    dispatch({ type: "FETCH_ENTRY_TO_EDIT", payload: logId });
    dispatch({ type: "OPEN_EDIT_ENTRY_DIALOG" });
  };

  return (
    <IconButton onClick={handleClick}>
      <EditIcon />
    </IconButton>
  );
}
