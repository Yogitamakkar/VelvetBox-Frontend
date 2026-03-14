import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FilterSidebar from "../../components/products/FilterSideBar";
import SortDropdown from "../../components/products/SordDropDown";
import ProductGrid from "../../components/products/ProductGrid";
import { productApi, mapProduct } from "../../../api/api";
import { useSearchParams } from "react-router-dom";

const SORT_MAP = {
  popularity: "newest",
  priceLowHigh: "price_low",
  priceHighLow: "price_high",
  rating: "newest",
};

const ProductsPage = () => {
  const [sort, setSort] = useState("popularity");
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = {
      category: categoryParam || filters.category || undefined,
      brand: filters.brand || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      sort: SORT_MAP[sort] || "newest",
      pageNumber: page,
    };

    productApi
      .getAll(params)
      .then((data) => {
        if (cancelled) return;
        // Backend returns Page<Product> with { content, totalPages, ... }
        const items = data.content ?? data;
        setProducts(Array.isArray(items) ? items.map(mapProduct) : []);
        setTotalPages(data.totalPages ?? 1);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [sort, filters, page, categoryParam]);

  const handlePageChange = (_, value) => setPage(value - 1);

  return (
    <Box sx={{ display: "flex", p: 4, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <Box sx={{ flex: 1, ml: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5">
            {categoryParam || "Products"}
          </Typography>
          <SortDropdown sortValue={sort} onSortChange={setSort} />
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#e8006f" }} />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ textAlign: "center", py: 6 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && products.length === 0 && (
          <Typography sx={{ textAlign: "center", py: 6, color: "gray" }}>
            No products found.
          </Typography>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <ProductGrid products={products} />
            <Pagination
              count={totalPages}
              page={page + 1}
              color="primary"
              onChange={handlePageChange}
              sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
