import AddIcon from '@mui/icons-material/Add';
import PolylineIcon from '@mui/icons-material/Polyline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './views/Cart';
import ProductDetail from './views/ProductDetail';
import ProductEdit from './views/ProductEdit';
import Products from './views/Products';

function App() {

  const userId = 1;
  const handleCart = (event) => {
    console.log('varukorg');
  };

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
                onClick={handleCart}
                color="inherit"
              >
                <ShoppingCartOutlinedIcon />
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
            element={<Products></Products>}></Route>
          <Route
            exact
            path="/products"
            element={<Products></Products>}></Route>
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
            element={<ProductDetail></ProductDetail>}></Route>
          <Route
            exact
            path="/users/:id/cart"
            element={<Cart></Cart>}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;