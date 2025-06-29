import { metroLines, getAllStations } from './metroStations';

// Construir el grafo del metro
export function buildMetroGraph() {
  const graph = {};
  const stations = getAllStations();

  // Inicializar nodos
  stations.forEach(station => {
    graph[station.id] = [];
  });

  // Conexiones directas (adyacentes en la misma línea)
  Object.values(metroLines).forEach(line => {
    for (let i = 0; i < line.stations.length; i++) {
      const current = line.stations[i];
      if (i > 0) {
        const prev = line.stations[i - 1];
        graph[current.id].push({ to: prev.id, weight: 2.5 });
      }
      if (i < line.stations.length - 1) {
        const next = line.stations[i + 1];
        graph[current.id].push({ to: next.id, weight: 2.5 });
      }
    }
  });

  // Conexiones de transbordo (misma estación, diferente línea)
  // Buscar estaciones con el mismo nombre pero diferente línea
  for (let i = 0; i < stations.length; i++) {
    for (let j = i + 1; j < stations.length; j++) {
      if (
        stations[i].name === stations[j].name &&
        stations[i].line !== stations[j].line
      ) {
        // Transbordo entre estaciones con el mismo nombre
        graph[stations[i].id].push({ to: stations[j].id, weight: 5 });
        graph[stations[j].id].push({ to: stations[i].id, weight: 5 });
      }
    }
  }

  return graph;
}

// Algoritmo de Dijkstra para encontrar el camino más corto
export function dijkstra(graph, startId, endId) {
  const times = {};
  const prev = {};
  const visited = new Set();
  const pq = [];

  Object.keys(graph).forEach(id => {
    times[id] = Infinity;
    prev[id] = null;
  });
  times[startId] = 0;
  pq.push({ id: startId, time: 0 });

  while (pq.length > 0) {
    // Extraer el nodo con menor tiempo
    pq.sort((a, b) => a.time - b.time);
    const { id: currentId, time: currentTime } = pq.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    if (currentId === endId) break;

    for (const neighbor of graph[currentId]) {
      const newTime = currentTime + neighbor.weight;
      if (newTime < times[neighbor.to]) {
        times[neighbor.to] = newTime;
        prev[neighbor.to] = currentId;
        pq.push({ id: neighbor.to, time: newTime });
      }
    }
  }

  // Reconstruir el camino
  const path = [];
  let current = endId;
  while (current) {
    path.unshift(current);
    current = prev[current];
  }
  if (path[0] !== startId) return null; // No hay camino
  return { path, time: times[endId] };
}

// Utilidad para obtener detalles de la ruta
export function getRouteDetails(path) {
  const stations = getAllStations();
  const stationMap = {};
  stations.forEach(s => (stationMap[s.id] = s));

  let transfers = 0;
  let lastLine = null;
  const steps = [];

  for (let i = 0; i < path.length; i++) {
    const station = stationMap[path[i]];
    if (i > 0 && station.line !== lastLine) {
      transfers++;
    }
    steps.push(station);
    lastLine = station.line;
  }

  return { steps, transfers };
}
