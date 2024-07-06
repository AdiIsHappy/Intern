import Dropdown from "@/components/dropdown";

export default function Home() {
  const userDropwdownOptions = [
    { value: "1", label: "User 1" },
    { value: "2", label: "User 2" },
  ];
  const periodDropdownOptions = [
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "quarter", label: "quarter" },
    { value: "year", label: "year" },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mt-8 flex flex-col md:flex-row w-full max-w-7xl justify-evenly bg-gray-100 p-4 rounded-md">
        <Dropdown options={userDropwdownOptions} className="flex-1 mx-8 my-2" />
        <Dropdown
          options={periodDropdownOptions}
          className="flex-1 mx-8 my-2"
        />
      </div>
    </main>
  );
}
