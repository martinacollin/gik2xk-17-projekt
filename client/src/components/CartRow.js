import { Box, Typography } from "@mui/material";

function CartRow({ label, price }) {
    return (
        <li>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginY: '1rem' }}>
                <Typography variant="body1">
                    {label}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {price}:-
                </Typography>
            </Box>
        </li>
    );
}

export default CartRow;