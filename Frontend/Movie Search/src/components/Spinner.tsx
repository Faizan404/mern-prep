import Skeleton from "./Skeleton";

function Spinner() {
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
}

export default Spinner;
