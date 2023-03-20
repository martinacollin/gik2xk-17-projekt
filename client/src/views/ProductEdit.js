import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, Container, Snackbar, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { create, getOne, remove, update } from '../models/ProductModel';

function ProductEdit() {
    const params = useParams();
    const navigate = useNavigate();
    const productId = params.id;
    const emptyProduct = {
        id: 0,
        title: '',
        description: '',
        price: 0,
        imageUrl: ''
    };
    const [product, setProduct] = useState(emptyProduct);
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        if (!isNaN(productId)) {
            getOne(productId).then((product) =>
                setProduct({ ...product, imageUrl: product.imageUrl || '' })
            );
        } else {
            setProduct(emptyProduct);
        }
        // eslint-disable-next-line
    }, [productId]);

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        const newProduct = { ...product, [name]: value };
        setProduct(newProduct);
    }
    function onSave() {
        if (product.id === 0) {
            create({ ...product, userId: 2 }).then(() => {
                setAlertOpen(true);
                navigate('/');
            });
        } else {
            update(product).then(() => {
                setAlertOpen(true);
                navigate('/');
            });
        }
    }

    function onDelete() {
        remove(product.id).then(() =>
            navigate('/', { state: { message: 'Produkten togs bort' } })
        );
    }

    return (
        <Container maxWidth="md">
            <Snackbar
                open={alertOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2000}
                onClose={() => {
                    setAlertOpen(false);
                }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Produkten har sparats!
                </Alert>
            </Snackbar>
            <form>
                <TextField
                    fullWidth
                    value={product.title}
                    onChange={onChange}
                    name="title"
                    id="title"
                    label="Titel"
                    variant="standard"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    value={product.description}
                    onChange={onChange}
                    name="description"
                    id="description"
                    multiline
                    minRows={4}
                    label="Beskrivning"
                    variant="standard"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    value={product.price}
                    onChange={onChange}
                    type="number"
                    name="price"
                    id="price"
                    label="Pris"
                    variant="standard"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    value={product.imageUrl}
                    onChange={onChange}
                    name="imageUrl"
                    id="imageUrl"
                    label="Url till bild"
                    variant="standard"
                    margin="normal"
                />
                <br />
                <Box display="flex" justifyContent="space-between" marginTop="1rem">
                    <Button
                        startIcon={<ChevronLeftIcon />}
                        onClick={() => navigate(-1)}
                        variant="contained">
                        Tillbaka
                    </Button>
                    <Box>
                        {product.id !== 0 && (
                            <Button
                                startIcon={<DeleteIcon />}
                                sx={{ marginRight: '1rem' }}
                                color="warning"
                                onClick={onDelete}
                                variant="contained">
                                Ta bort
                            </Button>
                        )}
                        <Button
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                            variant="contained">
                            Spara
                        </Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}

export default ProductEdit;
