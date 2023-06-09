import AddIcon from '@mui/icons-material/Add';
import PolylineIcon from '@mui/icons-material/Polyline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AppBar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { addToCart } from './models/ProductModel';
import { getCart, getUser } from './models/UserModel';
import Cart from './views/Cart';
import ProductDetail from './views/ProductDetail';
import ProductEdit from './views/ProductEdit';
import Products from './views/Products';

function App() {
  const userId = 1;

  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [cartTotalAmount, setCartTotalAmount] = useState();

  useEffect(() => {
    getUser(userId).then((user) => {
      setUser(user);
    });
    getCart(userId).then((cart) => {
      setCartTotalAmount(calculateTotalAmount(cart.products));
      setCart(cart);
    });
  }, [userId, cartTotalAmount]);

  function onAddToCartClick(product, amount) {
    addToCart(product.id, cart.id, amount).then((cartRow) => {
      const updatedCart = { ...cart };
      const existingProduct = updatedCart.products.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.amount = cartRow.amount;
      } else {
        updatedCart.products.push({
          id: product.id,
          title: product.title,
          price: product.price,
          amount: cartRow.amount
        });
      }
      setCart(updatedCart);
      setCartTotalAmount(calculateTotalAmount(updatedCart.products));
    });
  }

  function calculateTotalAmount(cartProducts) {
    let totalAmount = 0;
    cartProducts.forEach(p => {
      totalAmount += p.amount;
    });
    return totalAmount;
  }

  return (
    <div className="App">

      <AppBar position="fixed">
        <Container>
          <Toolbar disableGutters>
            <PolylineIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              EnCo
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Button
                component={Link}
                to="/"
                key={'products'}
                sx={{ my: 2, mr: 2, color: 'white' }}
              >
                Produkter
              </Button>
              <Button
                component={Link}
                to="/products/new"
                startIcon={<AddIcon />}
                key={'newProduct'}
                sx={{ my: 2, color: 'white' }}
              >
                Skapa produkt
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                component={Link}
                to={`/users/${userId}/cart`}
                size="large"
                color="inherit"
              >
                {user &&
                  <Typography
                    variant="body2"
                    sx={{ marginRight: '1rem' }}
                  >{user.firstName} {user.lastName}
                  </Typography>
                }
                {cartTotalAmount ?
                  <Badge badgeContent={cartTotalAmount} color="secondary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                  :
                  <ShoppingCartOutlinedIcon />
                }
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ marginTop: '6rem' }}>
        <Routes>
          <Route
            exact
            path="/"
            element={<Products onAddToCartClick={onAddToCartClick}></Products>}></Route>
          <Route
            exact
            path="/products/new"
            element={<ProductEdit></ProductEdit>}></Route>
          <Route
            exact
            path="/products/:id/edit"
            element={<ProductEdit></ProductEdit>}></Route>
          <Route
            exact
            path="/products/:id"
            element={<ProductDetail onAddToCartClick={onAddToCartClick}></ProductDetail>}></Route>
          <Route
            exact
            path="/users/:id/cart"
            element={<Cart cart={cart}></Cart>}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
