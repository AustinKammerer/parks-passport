import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ParkInfo() {
  const dispatch = useDispatch();
  // get the park's parkCode from the react-router url param
  const { parkCode } = useParams();

  React.useEffect(() => {
    dispatch({ type: "FETCH_PARK_INFO", payload: parkCode });
  }, []);

  return (
    <Container component="main">
      <p>this is the Park Info page for parkCode:{parkCode}</p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
          <Typography>Activities Available</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3a-header">
          <Typography>General Weather Info</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4a-header">
          <Typography>Location</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel5a-header">
          <Typography>Hours of Operation</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel6a-header">
          <Typography>Contact</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel7a-header">
          <Typography>Fees</Typography>
        </AccordionSummary>
      </Accordion>
    </Container>
  );
}
