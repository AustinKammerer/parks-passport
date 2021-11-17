import ParkInfoHoursTable from "../ParkInfoHoursTable/ParkInfoHoursTable";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ParkInfoHours({ parkInfo, StyledAccordionDetails }) {
  const operatingHours = parkInfo && parkInfo.operatingHours;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel6a-header">
        <Typography>Hours of Operation</Typography>
      </AccordionSummary>
      <StyledAccordionDetails>
        {operatingHours?.map((entry) => (
          <ParkInfoHoursTable key={entry.name} entry={entry} />
        ))}
        {/* <ParkInfoHours parkInfo={parkInfo} /> */}
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
  );
}
