import image from "../../assets/images/half-dome-wallpaper.jpg";
import Box from "@mui/material/Box";

export default function LoginImage() {
  return (
    <Box mx="auto" maxWidth="fit-content">
      <img src={image} width="460px" />
    </Box>
  );
}
