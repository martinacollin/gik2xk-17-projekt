
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

function ProductListItem({ product, onAddToCartClick }) {
    const placeholderImageUrl = 'http://dummyimage.com/600x600.png/dddddd/000000'; //'https://picsum.photos/300/300';

    return (
        <Card sx={{ maxWidth: 300, margin: '1rem' }}>
            <CardActionArea
                component={Link}
                to={'/products/' + product.id}>
                <CardMedia
                    component="img"
                    alt={'Produktbild för ' + product.title}
                    height="300"
                    image={product.imageUrl || placeholderImageUrl}
                />
                <CardContent sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontSize: '1rem', margin: 0 }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', margin: 0 }}>
                        {product.price}:-
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton color="secondary" size="large"
                    onClick={() => onAddToCartClick(product, 1)}>
                    <AddShoppingCartIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    to={'/products/' + product.id + '/edit'}
                    color="info"
                    sx={{ marginLeft: 'auto' }}>
                    <EditOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card >
    );
}

export default ProductListItem;