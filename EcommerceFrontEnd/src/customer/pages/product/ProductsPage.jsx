import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useState,useEffect } from "react";
import FilterSidebar from "../../components/products/FilterSideBar";
import SortDropdown from "../../components/products/SordDropDown";
import ProductGrid from "../../components/products/ProductGrid";
import productsData from "../../data/products.json";
import { useSearchParams } from "react-router-dom";


const ProductsPage = () => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("popularity");
  const [filters,setFilters] = useState({});
  
    const [searchParams] = useSearchParams();

    // useEffect(() => {
    // const initialFilters = {};
    // for (const [key, value] of searchParams.entries()) {
    //     initialFilters[key] = value;
    // }
    // setFilters(initialFilters);
    // }, []);

  const filteredProducts = productsData
    .filter((p) => !category || p.category === category)
    .sort((a, b) => {
      if (sort === "priceLowHigh") return a.price - b.price;
      if (sort === "priceHighLow") return b.price - a.price;
      return b.rating - a.rating;
    });

  const handleSortChange = (e) => {
    setSort(e.target.value);
  }

  return (
    <Box sx={{ display: "flex", p: 4, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <FilterSidebar filters={filters} setFilters={setFilters}/>
      <Box sx={{ flex: 1, ml: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5">Cakes </Typography>
          <SortDropdown sortValue={sort} onSortChange={setSort} />
        </Box>
        <ProductGrid products={filteredProducts}/>
        <Pagination count={10} color="primary" onChange={(e,value) => handlePageChange(value)}/>
      </Box>
    </Box>
    
  );
};

export default ProductsPage;
