import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ParkInfoHours from "../ParkInfoHours/ParkInfoHours";

import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

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

  const voiceContact = parkInfo.contacts?.phoneNumbers?.filter(
    (number) => number.type === "Voice"
  )[0];

  console.log(voiceContact);

  return (
    <Container component="main">
      <p>this is the Park Info page for parkCode:{parkCode}</p>

      {/* Description */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Description</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>{parkInfo.description}</Typography>
        </StyledAccordionDetails>
      </Accordion>

      {/* Activities */}
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

      {/* Weather (not a forcast) */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3a-header">
          <Typography>General Weather Info</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>{parkInfo.weatherInfo}</Typography>
        </StyledAccordionDetails>
      </Accordion>

      {/* Location */}
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

      {/* Directions (general, no turn-by-turn) */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel5a-header">
          <Typography>Directions</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>{parkInfo?.directionsInfo}</Typography>
        </StyledAccordionDetails>
      </Accordion>

      {/* Hours of operation */}
      <ParkInfoHours
        parkInfo={parkInfo}
        StyledAccordionDetails={StyledAccordionDetails}
      />

      {/* Contact */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel7a-header">
          <Typography>Contact</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Box>
            <Typography variant="body1" textAlign="start">
              Phone Number:
            </Typography>
            <Typography>{voiceContact?.phoneNumber}</Typography>
          </Box>
        </StyledAccordionDetails>
      </Accordion>

      {/* Fees */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel8a-header">
          <Typography>Fees</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Box>
            {parkInfo.entranceFees?.map((fee) => (
              <Box key={fee.title} sx={{ mb: 2 }}>
                <Typography fontWeight="bold">{fee.title}</Typography>
                <Typography fontStyle="italic">${fee.cost}</Typography>
                <Typography>{fee.description}</Typography>
              </Box>
            ))}
          </Box>
        </StyledAccordionDetails>
      </Accordion>
    </Container>
  );
}
