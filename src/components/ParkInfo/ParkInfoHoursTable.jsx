import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function ParkInfoHoursTable({ entry }) {
  // the API has the days of the week in a random order, this loop reorders them
  let hoursArr = [];
  if (entry) {
    for (let i = 0; i < weekdays.length; i++) {
      for (let day in entry.standardHours) {
        if (day === weekdays[i].toLowerCase()) {
          hoursArr.push({ [weekdays[i]]: entry.standardHours[day] });
        }
      }
    }
  }
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <Typography fontWeight="bold">{entry.name}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hoursArr?.map((day) => (
            <TableRow key={Object.keys(day)[0]}>
              <TableCell>{Object.keys(day)[0]}</TableCell>
              <TableCell>{Object.values(day)[0]}</TableCell>
            </TableRow>
          ))}
          {entry.exceptions.length > 0 && (
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Typography fontWeight="bold">Exceptions</Typography>
              </TableCell>
            </TableRow>
          )}
          {entry.exceptions.length > 0 &&
            entry.exceptions.map((period) => (
              <TableRow key={period.startDate}>
                <TableCell>
                  {period.startDate === period.endDate
                    ? period.name
                    : period.startDate + " - " + period.endDate}
                </TableCell>
                <TableCell>
                  {period.exceptionHours.monday ||
                    period.exceptionHours.tuesday ||
                    period.exceptionHours.wednesday ||
                    period.exceptionHours.thursday ||
                    period.exceptionHours.friday ||
                    period.exceptionHours.saturday ||
                    period.exceptionHours.sunday}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
