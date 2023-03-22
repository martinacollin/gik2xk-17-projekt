import { Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CartRow from "../components/CartRow";

function Cart({ cart }) {
    const [totalSum, setTotalSum] = useState(0);
    useEffect(() => {
        if (!cart?.products?.length) {
            return;
        }
        let sum = 0;
        cart.products.forEach(p => {
            sum += p.amount * p.price;
        });
        setTotalSum(sum);
    }, [cart]);
    return (
        <Container maxWidth="sm">
            <Card>
                <CardHeader
                    title={
                        <Typography variant="h5" component="h3">
                            Varukorg
                        </Typography>
                    }
                ></CardHeader>
                <CardContent>
                    {cart?.products?.length ? (
                        <ul>
                            {cart.products.map(p => (
                                <CartRow
                                    key={p.id}
                                    label={`${p.amount} x ${p.title}`}
                                    price={p.amount * p.price}
                                ></CartRow>
                            ))}
                            <li>
                                <Divider />
                            </li>
                            <CartRow
                                label="Summa"
                                price={totalSum}
                            ></CartRow>
                        </ul>
                    )
                        :
                        <Typography variant="body1">
                            Din varukorg är tom!
                        </Typography>
                    }
                </CardContent>
            </Card >
        </Container>
    );
}

export default Cart;