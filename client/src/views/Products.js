import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";
import { getAll } from "../models/ProductModel";

function Products({ onAddToCartClick }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAll().then(products => setProducts(products));
    }, []);
    return (
        <Grid container spacing={1}>
            {products &&
                products
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((product) => {
                        return (
                            <ProductListItem
                                key={`productId_${product.id}`}
                                product={product}
                                onAddToCartClick={onAddToCartClick}
                            />
                        );
                    })}
        </Grid>
    );
}

export default Products;