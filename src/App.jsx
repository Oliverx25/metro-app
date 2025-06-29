import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import MetroMap from './components/MetroMap';
import RoutePlanner from './components/RoutePlanner';
import Tips from './components/Tips';
import './App.css';

function App() {
  return (
    <Box className="app-container" sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            🚇 Metro CDMX
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              className="nav-link"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Mapa
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/ruta"
              className="nav-link"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Ruta
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/consejos"
              className="nav-link"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Consejos
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box className="main-content">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<MetroMap />} />
            <Route path="/ruta" element={<RoutePlanner />} />
            <Route path="/consejos" element={<Tips />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
