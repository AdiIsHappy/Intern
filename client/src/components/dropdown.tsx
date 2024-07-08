export default function Dropdown({
  className = "",
  options,
}: {
  className?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className={`${className}`}>
      <select className="outline-none border block bg-gray-50 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 w-full">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
