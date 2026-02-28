import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortDropdown = ({ sortValue, onSortChange }) => {
  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        label="Sort By"
      >
        <MenuItem value="popularity">Popularity</MenuItem>
        <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
        <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
