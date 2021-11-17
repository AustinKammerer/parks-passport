import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  // const operatingHours = parkInfo.operatingHours?.find((entry) => entry);
  // const hoursArr = [];
  // for (const day of standardHours) {
  //   hoursArr.push(day);
  // }
  console.log(entry);
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
  console.log(hoursArr);
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              {entry.name}
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
                Exceptions
              </TableCell>
            </TableRow>
          )}
          {entry.exceptions.length > 0 &&
            entry.exceptions.map((day) => (
              <TableRow key={day.name}>
                <TableCell>{day.name}</TableCell>
                <TableCell>{day.exceptionHours.sunday}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
