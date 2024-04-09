const JsonDisplay = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }
  return (
    <div className="space-y-3">
      <h2 className="text-base md:text-lg font-medium">Highlights</h2>
      <ul className="list-disc">
        {Object.entries(data).map(([key, value], index) => (
          <li key={index} className=" flex gap-3">
            <h6 className="w-1/3 truncate">{key}</h6>
            <h6 className="w-1/2">{value}</h6>
            {/* <strong>{key}:</strong> {value} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JsonDisplay;
