import { useSelector } from "react-redux";

export default function ParkFinderList() {
  const results = useSelector((store) => store.results);
  return <p>list goes here</p>;
}
