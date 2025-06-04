import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearchChange: (term: string) => void;
  statusFilter: "available" | "pending" | "sold";
  onStatusChange: (status: "available" | "pending" | "sold") => void;
}

const SearchBar = ({
  onSearchChange,
  statusFilter,
  onStatusChange,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search pets
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by pet name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-auto">
          <label htmlFor="status" className="sr-only">
            Filter by status
          </label>
          <select
            id="status"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as "available" | "pending" | "sold")
            }
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
