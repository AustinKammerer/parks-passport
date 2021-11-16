import { useSelector } from "react-redux";

export default function ParkFinderList() {
  const results = useSelector((store) => store.park.searchResults);
  console.log(results);
  return (
    <div>
      {results.map((result) => (
        <p>{result.fullName}</p>
      ))}
    </div>
  );
}
