import { useHistory } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButton(props) {
  const history = useHistory();

  return (
    <IconButton
      onClick={() =>
        history.push(
          `/journal/edit?logId=${props.entry.id}&type=${props.entry.type}`
        )
      }
    >
      <EditIcon />
    </IconButton>
  );
}
