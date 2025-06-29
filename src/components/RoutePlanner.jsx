import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
  Chip,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Autocomplete
} from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrainIcon from '@mui/icons-material/Train';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Importar la base de datos completa de estaciones
import {
  getAllStations,
  getStationsByLine,
  metroLines
} from '../data/metroStations';
// Importar el grafo y Dijkstra
import { buildMetroGraph, dijkstra, getRouteDetails } from '../data/metroGraph';

const RoutePlanner = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [result, setResult] = useState(null);

  // Obtener todas las estaciones
  const allStations = getAllStations();
  // Obtener estaciones filtradas por línea seleccionada
  const filteredStations = selectedLine ? getStationsByLine(selectedLine) : allStations;

  // Calcular ruta óptima usando Dijkstra
  const calculateRoute = () => {
    if (!origin || !destination) return;
    const graph = buildMetroGraph();
    const dijkstraResult = dijkstra(graph, origin.id, destination.id);
    if (!dijkstraResult) {
      setResult({
        error: true,
        message: 'No se pudo calcular la ruta entre las estaciones seleccionadas.'
      });
      return;
    }
    const { steps, transfers } = getRouteDetails(dijkstraResult.path);
    setResult({
      steps,
      transfers,
      time: dijkstraResult.time,
      origin: steps[0],
      destination: steps[steps.length - 1],
      stations: steps.length,
      error: false
    });
  };

  // Limpiar selección de línea
  const clearLineFilter = () => {
    setSelectedLine('');
    setOrigin(null);
    setDestination(null);
    setResult(null);
  };

  return (
    <Box className="page-section">
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
          Planificador de Ruta
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
          Calcula la ruta más eficiente entre estaciones del Metro CDMX.
          Obtén tiempos estimados, transbordos y el listado de estaciones por las que pasarás.
        </Typography>
      </Box>
      <Paper elevation={0} className="form-container" sx={{ mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DirectionsIcon color="primary" />
            Selecciona tu ruta
          </Typography>
        </Box>
        {/* Filtro por línea */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Filtrar por línea (opcional)</InputLabel>
              <Select
                value={selectedLine}
                onChange={(e) => setSelectedLine(e.target.value)}
                label="Filtrar por línea (opcional)"
                sx={{
                  minWidth: '300px',
                  '& .MuiInputBase-root': {
                    minHeight: '56px'
                  }
                }}
              >
                <MenuItem value="">
                  <em>Todas las líneas</em>
                </MenuItem>
                {Object.keys(metroLines).map((lineName) => (
                  <MenuItem key={lineName} value={lineName}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: metroLines[lineName].color
                        }}
                      />
                      {lineName}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              onClick={clearLineFilter}
              disabled={!selectedLine}
              sx={{ height: '56px', width: '100%' }}
            >
              Limpiar filtro
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Autocomplete
              fullWidth
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(newValue);
              }}
              options={filteredStations}
              getOptionLabel={(option) => option.name}
              clearOnEscape
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: option.color
                      }}
                    />
                    {option.name} ({option.line})
                  </Box>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estación de origen"
                  variant="outlined"
                  placeholder="Busca una estación..."
                  sx={{
                    minWidth: '300px',
                    '& .MuiInputBase-root': {
                      minHeight: '56px'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Autocomplete
              fullWidth
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
              }}
              options={filteredStations}
              getOptionLabel={(option) => option.name}
              clearOnEscape
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: option.color
                      }}
                    />
                    {option.name} ({option.line})
                  </Box>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estación de destino"
                  variant="outlined"
                  placeholder="Busca una estación..."
                  sx={{
                    minWidth: '300px',
                    '& .MuiInputBase-root': {
                      minHeight: '56px'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={calculateRoute}
              size="large"
              disabled={!origin || !destination}
              sx={{
                height: '56px',
                fontWeight: 600,
                fontSize: '1rem'
              }}
              className="primary-button"
            >
              Calcular
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {result && (
        <Paper elevation={0} className="result-card" sx={{ p: 3 }}>
          {result.error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {result.message}
            </Alert>
          ) : (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'success.main'
                  }}
                >
                  <TrainIcon />
                  Resultado de la ruta
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box className="result-item">
                    <Box className="icon-container">
                      <LocationOnIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Origen
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {result.origin.name}
                      </Typography>
                      <Chip
                        label={result.origin.line}
                        size="small"
                        sx={{
                          backgroundColor: result.origin.color,
                          color: 'white',
                          mt: 0.5
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="result-item">
                    <Box className="icon-container">
                      <LocationOnIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Destino
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {result.destination.name}
                      </Typography>
                      <Chip
                        label={result.destination.line}
                        size="small"
                        sx={{
                          backgroundColor: result.destination.color,
                          color: 'white',
                          mt: 0.5
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box className="result-item">
                    <Box className="icon-container">
                      <TrainIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Estaciones totales
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {result.stations}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="result-item">
                    <Box className="icon-container">
                      <AccessTimeIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Tiempo estimado
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="success.main">
                        {result.time} min
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="result-item">
                    <Box className="icon-container">
                      <SwapHorizIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Transbordos
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="warning.main">
                        {result.transfers}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className="result-item">
                    <Box className="icon-container">
                      <DirectionsIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Tipo de ruta
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="info.main">
                        {result.transfers === 0 ? 'Directa' : 'Con transbordo'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              {/* Listado de estaciones con transbordos fusionados */}
              {(() => {
                // Agrupar estaciones consecutivas con el mismo nombre (transbordos)
                const compactSteps = [];
                let i = 0;
                while (i < result.steps.length) {
                  const current = result.steps[i];
                  let j = i + 1;
                  const lines = [current.line];
                  // Buscar repeticiones consecutivas del mismo nombre
                  while (
                    j < result.steps.length &&
                    result.steps[j].name === current.name
                  ) {
                    lines.push(result.steps[j].line);
                    j++;
                  }
                  compactSteps.push({
                    ...current,
                    lines: [...new Set(lines)],
                    ids: result.steps.slice(i, j).map(s => s.id)
                  });
                  i = j;
                }
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflowX: 'auto',
                      py: 1,
                      px: 2,
                      bgcolor: '#f8f9fa',
                      borderRadius: 2,
                      gap: 1,
                      minHeight: 56,
                      maxWidth: '100%',
                      width: '100%',
                    }}
                  >
                    {compactSteps.map((station, idx) => (
                      <React.Fragment key={station.ids.join('-')}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: { xs: 48, sm: 60, md: 70 },
                            maxWidth: 90,
                            flex: '0 1 auto',
                          }}
                          title={station.name}
                        >
                          {/* Círculo de colores múltiples */}
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              mb: 0.5,
                              background:
                                station.lines.length === 1
                                  ? station.color
                                  : `conic-gradient(${station.lines
                                      .map((line, i) => {
                                        const color =
                                          Object.values(metroLines)
                                            .find(l => l.name === line)?.color || '#888';
                                        const start = (i / station.lines.length) * 100;
                                        const end = ((i + 1) / station.lines.length) * 100;
                                        return `${color} ${start}%, ${color} ${end}%`;
                                      })
                                      .join(', ')})`,
                              border: '1.5px solid #fff',
                              boxShadow: '0 0 0 1px #bdbdbd',
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight:
                                idx === 0 || idx === compactSteps.length - 1 ? 700 : 400,
                              color:
                                idx === 0
                                  ? 'primary.main'
                                  : idx === compactSteps.length - 1
                                  ? 'secondary.main'
                                  : 'text.primary',
                              fontSize: { xs: '0.70rem', sm: '0.80rem', md: '0.95rem' },
                              textAlign: 'center',
                              whiteSpace: 'normal',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: 1.1,
                              maxHeight: 32,
                              maxWidth: 80,
                              wordBreak: 'break-word',
                              cursor: 'pointer',
                            }}
                          >
                            {station.name}
                          </Typography>
                        </Box>
                        {idx < compactSteps.length - 1 && (
                          <Typography
                            variant="body2"
                            sx={{
                              mx: 0.5,
                              color: 'text.disabled',
                              fontSize: { xs: '1.1rem', sm: '1.2rem' },
                              userSelect: 'none',
                              alignSelf: 'center',
                            }}
                          >
                            →
                          </Typography>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                );
              })()}
              <Alert
                severity="info"
                sx={{ mt: 2 }}
                icon={<AccessTimeIcon />}
              >
                Los tiempos son estimados y pueden variar según las condiciones del servicio.
                {result.transfers > 0 && ' Se incluyen 5 minutos adicionales por transbordo.'}
              </Alert>
            </>
          )}
        </Paper>
      )}
      {/* Información adicional sobre las líneas */}
      <Paper elevation={0} className="enhanced-card" sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Líneas del Metro CDMX
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(metroLines).map(([lineName, lineInfo]) => (
            <Grid item xs={6} sm={4} md={3} key={lineName}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: lineInfo.color
                  }}
                />
                <Typography variant="body2" fontWeight={500}>
                  {lineName}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {lineInfo.stations.length} estaciones
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default RoutePlanner;
