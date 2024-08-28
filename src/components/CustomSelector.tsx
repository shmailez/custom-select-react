import React, { useState, FC } from "react";
import "./CustomSelect.css";

interface Option<T> {
  value: T;
  title: string;
  avatar: string;
  description: string;
}

interface CustomLabelProps<T> {
  option: Option<T>;
  onRemove: (option: Option<T>) => void;
}

interface CustomDropdownProps<T> {
  options: Option<T>[];
  selectedOptions: Option<T>[];
  onSelect: (option: Option<T>) => void;
}

interface CustomSelectProps<T> {
  options: Option<T>[];
  multiple?: boolean;
  customLabelComponent?: FC<CustomLabelProps<T>>;
  customDropdownComponent?: FC<CustomDropdownProps<T>>;
}

const CustomSelect = <T,>({
  options,
  multiple = false,
  customLabelComponent: CustomLabel,
  customDropdownComponent: CustomDropdown,
}: CustomSelectProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<Option<T>[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectOption = (option: Option<T>) => {
    if (multiple) {
      setSelectedOptions((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((o) => o !== option)
          : [...prevSelected, option]
      );
    } else {
      setSelectedOptions([option]);
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveOption = (option: Option<T>) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((o) => o !== option)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select-container">
      <div
        className="custom-select"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="selected-options">
          {selectedOptions.map((option) =>
            CustomLabel ? (
              <CustomLabel
                key={option.value as string | number}
                option={option}
                onRemove={handleRemoveOption}
              />
            ) : (
              <DefaultLabel
                key={option.value as string | number}
                option={option}
                onRemove={handleRemoveOption}
              />
            )
          )}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Поиск..."
          className="custom-select-search"
        />
        {/* <div className="dropdown-arrow-wrapper">
          <span className="dropdown-arrow">&#9662;</span>
        </div>
        <span className="dropdown-arrow">&#9662;</span> */}
      </div>

      {isDropdownOpen && (
        <div className="custom-select-dropdown">
          {/* <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Поиск..."
            className="custom-select-search"
          /> */}
          {filteredOptions.length > 0 ? (
            CustomDropdown ? (
              <CustomDropdown
                options={filteredOptions}
                selectedOptions={selectedOptions}
                onSelect={handleSelectOption}
              />
            ) : (
              <div className="custom-select-options">
                {filteredOptions.map((option) => (
                  <div
                    key={option.value as string | number}
                    className={`custom-select-option ${
                      selectedOptions.includes(option) ? "selected" : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <img
                      src={option.avatar}
                      alt={option.title}
                      className="option-avatar"
                    />
                    <div className="option-details">
                      <div className="option-title">{option.title}</div>
                      <div className="option-description">
                        {option.description}
                      </div>
                    </div>
                    {selectedOptions.includes(option) && (
                      <span className="option-selected-indicator">
                        &#10003;
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="custom-select-no-options">Нет опций</div>
          )}
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultLabel: FC<CustomLabelProps<any>> = ({ option, onRemove }) => (
  <div className="default-label">
    <img src={option.avatar} alt={option.title} className="label-avatar" />
    <span className="label-text">{option.title}</span>
    <button className="label-remove" onClick={() => onRemove(option)}>
      &times;
    </button>
  </div>
);

export default CustomSelect;
