interface SwitchToggleProps {
    checked: boolean;
    onChange: () => void;
    labelOn?: string;
    labelOff?: string;
  }
  
   export const SwitchToggle: React.FC<SwitchToggleProps> = ({ checked, onChange, labelOn = "Public", labelOff = "Private" }) => {
    return (
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-300 ${
            checked ? "bg-gradient-to-r from-[#6F58DA] to-[#5131E7]" : "bg-red-500"
          }`}
        />
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <span className="ml-3 text-sm font-medium select-none text-white">
          {checked ? labelOn : labelOff}
        </span>
      </label>
    );
  };
  