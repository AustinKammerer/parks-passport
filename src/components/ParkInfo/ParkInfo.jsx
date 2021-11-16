import { useParams } from "react-router-dom";

export default function ParkInfo() {
  // get the park's parkCode from the react-router url param
  const { parkCode } = useParams();
  return <p>this is the Park Info page for parkCode:{parkCode}</p>;
}
