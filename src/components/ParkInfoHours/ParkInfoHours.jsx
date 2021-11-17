import ParkInfoHoursTable from "../ParkInfoHoursTable/ParkInfoHoursTable";

export default function ParkInfoHours({ parkInfo }) {
  const operatingHours = parkInfo && parkInfo.operatingHours;

  return (
    <>
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
    </>
  );
}
