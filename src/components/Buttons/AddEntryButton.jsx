import { useDispatch } from "react-redux";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

const AddFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: 88,
  right: 16,
  zIndex: 2,
  // color: "#fff",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function AddEntryButton() {
  return (
    <AddFab onClick={() => dispatch({ type: "OPEN_NEW_ENTRY_DIALOG" })}>
      {<AddIcon />}
    </AddFab>
  );
}
