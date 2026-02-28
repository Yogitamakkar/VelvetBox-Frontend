import React, { memo } from 'react';
import {
  Box, Typography, RadioGroup, FormControlLabel,
  Radio, Accordion, AccordionSummary, AccordionDetails, Divider, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { filterData } from '../../data/filterData';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = ({ filters, setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    const keysToClear = Object.keys(filters);
    keysToClear.forEach((key) => searchParams.delete(key));
    setSearchParams(searchParams);
    setFilters({});
  };

  return (
    <Box p={2} width={280}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        <Button size="small" color="error" onClick={clearAllFilters}>Clear</Button>
      </Box>
      <Divider />

      <section>
        {filterData.map(({ label, key, options }) => (
        <Accordion key={key} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RadioGroup value={filters[key] || ''} onChange={handleChange(key)}>
              {options.map(({ label, value }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio size="small" />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      ))}
      </section>
    </Box>
  );
};

export default memo(FilterSidebar);