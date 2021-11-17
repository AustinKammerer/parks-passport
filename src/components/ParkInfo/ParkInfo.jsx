import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ParkInfoHours from "../ParkInfoHours/ParkInfoHours";

import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  maxHeight: 400,
  wrap: "no-wrap",
  overflow: "scroll",
}));

export default function ParkInfo() {
  const dispatch = useDispatch();
  // get the park's parkCode from the react-router url param
  const { parkCode } = useParams();

  React.useEffect(() => {
    dispatch({ type: "FETCH_PARK_INFO", payload: parkCode });
  }, []);

  // get the stored park info from redux
  const { parkInfo } = useSelector((store) => store.park);

  const physicalAddress = parkInfo.addresses?.filter(
    (address) => address.type === "Physical"
  )[0];

  const standardHours = parkInfo.operatingHours?.map(
    (entry) => entry.standardHours
  );

  return (
    <Container component="main">
      <p>this is the Park Info page for parkCode:{parkCode}</p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Description</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>{parkInfo.description}</Typography>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
          <Typography>Activities Available</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <List>
            {parkInfo.activities?.map((activity) => (
              <ListItem key={activity.id}>
                <Typography>{activity.name}</Typography>
              </ListItem>
            ))}
          </List>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3a-header">
          <Typography>General Weather Info</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>{parkInfo.weatherInfo}</Typography>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4a-header">
          <Typography>Location</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Box>
            <Typography variant="body1" textAlign="start">
              Address:
            </Typography>
            <Typography>{physicalAddress?.line1}</Typography>
            <Typography>{physicalAddress?.line2}</Typography>
            <Typography>{physicalAddress?.line3}</Typography>
            <Typography>
              {physicalAddress?.city}, {physicalAddress?.stateCode}{" "}
              {physicalAddress?.postalCode}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography>Coordinates:</Typography>
            <Typography>lat: {parkInfo?.latitude}</Typography>
            <Typography>lon: {parkInfo?.longitude}</Typography>
          </Box>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel5a-header">
          <Typography>Directions</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>{parkInfo?.directionsInfo}</Typography>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel6a-header">
          <Typography>Hours of Operation</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <ParkInfoHours parkInfo={parkInfo} />
          {/* <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {parkInfo.operatingHours?.map((entry) =>
                  entry.exceptions.map((day) => (
                    <TableRow key={day.name}>
                      <TableCell>{day.name}</TableCell>
                      <TableCell>{day.exceptionHours.sunday}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer> */}
        </StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel7a-header">
          <Typography>Contact</Typography>
        </AccordionSummary>
        <StyledAccordionDetails></StyledAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel8a-header">
          <Typography>Fees</Typography>
        </AccordionSummary>
        <StyledAccordionDetails></StyledAccordionDetails>
      </Accordion>
    </Container>
  );
}
