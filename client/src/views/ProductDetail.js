import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import ProductDetailItem from '../components/ProductDetailItem';
import { getOne } from '../models/ProductModel';

function ProductDetail() {
    const params = useParams();
    const productId = params.id;

    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    useEffect(() => {
        getOne(productId).then((product) => setProduct(product));
    }, [productId]);

    return (
        <Container maxWidth="md">
            <ProductDetailItem product={product} />
            <Box
                marginBottom="1rem"
                display="flex"
                justifyContent="space-between"
                gap=".3rem">
                <Button
                    startIcon={<ChevronLeftIcon />}
                    color="secondary"
                    onClick={() => {
                        navigate(-1);
                    }}
                    variant="contained">
                    Tillbaka
                </Button>

                <Link to={`/products/${productId}/edit`}>
                    <Button
                        color="secondary"
                        startIcon={<EditIcon />}
                        variant="contained">
                        Ändra
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}

export default ProductDetail;
