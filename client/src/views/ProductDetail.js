import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import ProductDetailItem from '../components/ProductDetailItem';
import { calculateRating, getOne, remove } from '../models/ProductModel';

function ProductDetail({ onAddToCartClick }) {
    const params = useParams();
    const productId = params.id;

    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        getOne(productId).then((product) => {
            product.rating = calculateRating(product.ratings);
            setProduct(product);
        });
    }, [productId]);

    function onAmountChange(e) {
        const value = e.target.value;
        setAmount(+value);
    }

    function onDelete() {
        remove(product.id).then(() =>
            navigate('/', { state: { message: 'Produkten togs bort' } })
        );
    }

    return (
        <Container maxWidth="sm">
            {product ?
                <ProductDetailItem product={product} />
                : (
                    <Typography>Produkt saknas</Typography>
                )}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <TextField
                    value={amount}
                    onChange={onAmountChange}
                    type="number"
                    name="amount"
                    id="amount"
                    label="Antal"
                    variant="outlined"
                    size="small"
                    margin="none"
                />
                <Button
                    sx={{ width: '100%', marginLeft: '1rem' }}
                    startIcon={<AddShoppingCartIcon />}
                    color="primary"
                    onClick={() => onAddToCartClick(product, amount)}
                    variant="contained">
                    Lägg i varukorg
                </Button>
            </Box>

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

                <Box>
                    <Button
                        startIcon={<DeleteIcon />}
                        sx={{ marginRight: '1rem' }}
                        color="warning"
                        onClick={onDelete}
                        variant="contained">
                        Ta bort
                    </Button>
                    <Button
                        component={Link}
                        to={`/products/${productId}/edit`}
                        color="secondary"
                        startIcon={<EditIcon />}
                        variant="contained">
                        Ändra
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ProductDetail;
