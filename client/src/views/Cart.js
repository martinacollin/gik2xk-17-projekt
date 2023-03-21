import { Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CartRow from "../components/CartRow";
import { getAll } from "../models/ProductModel";

function Cart({ cart }) {
    const [cartRows, setCartRows] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    useEffect(() => {
        if (!cart?.cartRows?.length) {
            return;
        }
        getAll().then(products => {
            let sum = 0;
            const groupedRows = [];
            cart.cartRows.forEach(cr => {
                const existing = groupedRows.find(row => row.productId === cr.productId);
                if (existing) {
                    existing.count++;
                    existing.amount += cr.amount;
                } else {
                    const product = products.find(p => p.id === cr.productId);
                    const row = {
                        ...cr,
                        productTitle: product?.title,
                        count: 1
                    };
                    groupedRows.push(row);
                }
                sum += cr.amount;
            });
            setCartRows(groupedRows);
            setTotalSum(sum);
        });
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
                    {cartRows?.length ? (
                        <ul>
                            {cartRows.map(cr => (
                                <CartRow
                                    key={cr.id}
                                    label={`${cr.count} x ${cr.productTitle}`}
                                    amount={cr.amount}
                                ></CartRow>
                            ))}
                            <li>
                                <Divider />
                            </li>
                            <CartRow
                                label="Summa"
                                amount={totalSum}
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