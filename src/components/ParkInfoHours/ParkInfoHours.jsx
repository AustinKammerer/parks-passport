import ParkInfoHoursTable from "../ParkInfoHoursTable/ParkInfoHoursTable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ParkInfoHours({ parkInfo }) {
  const operatingHours = parkInfo && parkInfo.operatingHours;
  console.log(operatingHours);

  return (
    <>
      {operatingHours?.map((entry) => (
        <ParkInfoHoursTable key={entry.name} entry={entry} />
      ))}
    </>
  );
}
