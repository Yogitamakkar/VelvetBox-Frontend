import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products ,className,addToCartBtn , ...props }) => {
  return (
    <Grid container spacing={3} className={`${className}`} {...props}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} addToCartBtn={addToCartBtn} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
