import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from '@mui/material';

import { toDateTimeString } from '../formatHelper';

function ProductDetailItem({ product }) {
    const placeholderImageUrl = 'https://picsum.photos/600/600';

    return product ? (
        <Card elevation={0} sx={{ background: 'transparent' }}>
            <CardHeader
                title={
                    <Typography variant="h5" component="h3">
                        {product.title}
                    </Typography>
                }
                subheader={`Skapad: ${toDateTimeString(product.createdAt)}`}
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
        </Card>
    ) : (
        <Typography>Produkt saknas</Typography>
    );
}

export default ProductDetailItem;
