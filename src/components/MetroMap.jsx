import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Import the metro map image (you'll need to add the image to your project)
import metroMapImage from '../assets/metro-map.jpg';
// import metroMapImage from '../assets/Plano-Metro-CDMX.png';

const MetroMap = () => {
  return (
    <Box className="page-section" sx={{ width: '100%' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Mapa del Metro de la CDMX
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          Explora el Sistema de Transporte Colectivo Metro de la Ciudad de México.
          Encuentra todas las líneas, estaciones y conexiones disponibles.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        className="enhanced-card map-container"
        sx={{
          p: 3,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src={metroMapImage}
          alt="Mapa del Metro de la Ciudad de México"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: 'var(--border-radius)',
            transition: 'var(--transition-medium)',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        />

        {/* Overlay con información */}
        <Box className="map-overlay">
          <Chip
            icon={<LocationOnIcon />}
            label="12 Líneas Activas"
            color="primary"
            variant="filled"
            sx={{
              fontWeight: 600,
              background: 'rgba(25, 118, 210, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          />
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontStyle: 'italic',
            opacity: 0.8
          }}
        >
          Mapa oficial del Sistema de Transporte Colectivo Metro de la Ciudad de México
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="195 Estaciones"
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label="226.5 km de Red"
            size="small"
            color="secondary"
            variant="outlined"
          />
          <Chip
            label="24/7 Servicio"
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MetroMap;
