import { Dialog, DialogTitle, List, ListItem, Rating, Typography } from "@mui/material";

function ProductRatingsDialog({ open, onClose, productTitle, ratings }) {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Omdömen för {productTitle}</DialogTitle>
            <List sx={{ pt: 0 }}>
                {ratings?.length ? ratings.map((rating, index) => (
                    <ListItem key={index}>
                        <Rating
                            name="readonly"
                            readOnly
                            value={rating}
                            precision={0.5}
                        />
                    </ListItem>
                )) :
                    <Typography variant="body1" sx={{padding: '1rem'}}>
                        Denna produkt har inte fått några omdömen.
                    </Typography>
                }
            </List>
        </Dialog>
    );
}

export default ProductRatingsDialog;