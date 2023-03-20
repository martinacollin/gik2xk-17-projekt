
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

function ProductListItem({ product }) {
    const placeholderImageUrl = 'https://picsum.photos/300/300';

    return (
        <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardActionArea
                component={Link}
                to={'/products/' + product.id}>
                <CardMedia
                    component="img"
                    alt={'Produktbild för ' + product.title}
                    height="300"
                    image={product.imageUrl || placeholderImageUrl}
                />
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                        {product.price}kr
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton color="secondary" size="large">
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