import {
    Box,
    Card, CardContent,
    CardHeader,
    CardMedia, IconButton, Rating,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { addRating, calculateRating } from '../models/ProductModel';
import ProductRatingsDialog from './ProductRatingsDialog';


function ProductDetailItem({ product }) {

    const placeholderImageUrl = 'http://dummyimage.com/600x600.png/dddddd/000000'; // 'https://picsum.photos/600/600';

    const [rating, setRating] = useState();
    const [ratings, setRatings] = useState();
    const [ratingsDialogOpen, setRatingsDialogOpen] = useState(false);


    useEffect(() => {
        setRating(product.rating || 0);
        setRatings(product.ratings);
    }, [product]);

    function onRatingChange(productId, rating) {
        if (!rating) {
            return;
        }
        addRating(productId, { rating: rating }).then((savedProduct) => {
            setRating(calculateRating(savedProduct.ratings));
            setRatings(savedProduct.ratings);
        });
    }

    function handleRatingsDialogOpenClick() {
        setRatingsDialogOpen(true);
    };

    function handleRatingsDialogCloseClick() {
        setRatingsDialogOpen(false);
    };

    return rating != null && (
        <Card elevation={0} sx={{ background: 'transparent' }}>
            <CardHeader
                title={
                    <Typography variant="h5" component="h3">
                        {product.title}
                    </Typography>
                }
                subheader={`${product.price}:-`}
                action={
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '.5rem' }}>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            precision={0.5}
                            onChange={(event) => {
                                onRatingChange(product.id, event.target.value);
                            }}
                        />
                        <IconButton color="primary" size="small"
                            onClick={handleRatingsDialogOpenClick}>
                            ({ratings?.length})
                        </IconButton>
                        <ProductRatingsDialog
                            productTitle={product.title}
                            ratings={ratings}
                            open={ratingsDialogOpen}
                            onClose={handleRatingsDialogCloseClick}
                        />
                    </Box>
                }
            ></CardHeader>
            <CardMedia
                component="img"
                image={
                    product.imageUrl || placeholderImageUrl
                }
                alt={`Bild till ${product.title}`}
            />
            <CardContent>
                <Typography variant="body2">{product.description}</Typography>
            </CardContent>
        </Card >
    );
}

export default ProductDetailItem;
