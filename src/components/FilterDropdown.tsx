import React from "react";

interface DropdownProps {
  title: string;
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  selectedOptions,
  onToggleOption,
  isOpen,
  onToggle,
}) => {
  return (
    <li className="relative py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-[16px] text-black dark:text-white cursor-pointer ">
      <div onClick={onToggle} className="flex justify-between items-center">
        {title}
        <svg
          className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <ul
          className="
            transition-all duration-300 ease-in-out max-h-96 opacity-100 
            absolute
            left-0 top-full mt-2
            lg:left-full lg:top-0 lg:mt-0 lg:ml-2
            bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg w-56 z-10
          "
        >
            {/* Subject */}
          {title === "Subject" && (
            <>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Exams")}
                    onChange={() => onToggleOption("Exams")}
                    className="form-checkbox"
                  />
                 <span>Exam</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Mathematics")}
                    onChange={() => onToggleOption("Mathematics")}
                    className="form-checkbox"
                  />
                  <span>Mathematics</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Science")}
                    onChange={() => onToggleOption("Science")}
                    className="form-checkbox"
                  />
                  <span>Science</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Language")}
                    onChange={() => onToggleOption("Language")}
                    className="form-checkbox"
                  />
                  <span>Language</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Social Science")}
                    onChange={() => onToggleOption("Social Science")}
                    className="form-checkbox"
                  />
                  <span>Social Science</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Arts and Humanities")}
                    onChange={() => onToggleOption("Arts and Humanities")}
                    className="form-checkbox"
                  />
                  <span>Arts and Humanities</span>
                </label>
              </li>
            </>
          )}
          {/* Difficulty */}
          {title === "Difficulty" && (
            <>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Beginner")}
                    onChange={() => onToggleOption("Beginner")}
                    className="form-checkbox"
                  />
                  <span>Beginner</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Intermediate")}
                    onChange={() => onToggleOption("Intermediate")}
                    className="form-checkbox"
                  />
                  <span>Intermediate</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Advanced")}
                    onChange={() => onToggleOption("Advanced")}
                    className="form-checkbox"
                  />
                  <span>Advanced</span>
                </label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes("Anyone")}
                    onChange={() => onToggleOption("Anyone")}
                    className="form-checkbox"
                  />
                  <span>Anyone</span>
                </label>
              </li>
            </>
          )}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
