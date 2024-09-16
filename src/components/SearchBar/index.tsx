import "./styles.css";
import { MagnifierIcon } from "../../assets/Icons/Magnifier";
import { TextField } from "@mui/material";
import CloseIcon from "../../assets/Icons/CloseIcon";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onDeleteInput?: () => void;
}

const SearchBar = ({ placeholder, value, onChange, onDeleteInput }: SearchBarProps) => {
  return (
    <TextField
        className={"custom-search-bar"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
            startAdornment: <MagnifierIcon />,
            endAdornment: onDeleteInput && <CloseIcon onClick={onDeleteInput} />,
        }}
    />
  );
};

export default SearchBar;
