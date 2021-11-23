import { useHistory } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButton(props) {
  const history = useHistory();

  const { logId, type } = props.entry;

  return (
    <IconButton
      onClick={() =>
        history.push(`/log/entry?logId=${logId}&type=${type}&mode=edit`)
      }
    >
      <EditIcon />
    </IconButton>
  );
}
