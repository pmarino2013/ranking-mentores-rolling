# Ranking de Comisiones por Permanencia

Aplicación web en React que muestra un ranking visual de comisiones académicas agrupadas por módulo y subcategorizadas por modalidad (presencial u online). El ranking se calcula por porcentaje de permanencia (activos sobre inscriptos), permitiendo identificar rápidamente qué comisiones lideran en cada módulo y modalidad.

## ¿Por qué es útil?

- **Toma de decisiones**: facilita priorizar acciones pedagógicas/operativas donde la permanencia es menor.
- **Comparabilidad justa**: usa porcentaje de permanencia en lugar de cantidades absolutas, evitando sesgos por tamaño de cohorte.
- **Claridad visual**: diseño con podio y colores en la misma gama para distinguir los tres primeros lugares a simple vista.
- **Segmentación por modalidad**: permite analizar diferencias entre comisiones presenciales y online. Si no hay suficientes comisiones presenciales por módulo, se agrupan en un ranking general para no perder visibilidad.

## Características principales

- **Ranking por módulo y modalidad**: agrupación por `modulo` y subdivisión por `tipo` (`presencial`/`online`).
- **Métrica principal**: porcentaje de permanencia `cantidad / inscriptos * 100`.
- **Podio visual**: estilos en ámbar con intensidad decreciente (1°, 2°, 3°) para destacar jerarquía.
- **Responsive**: tarjetas en columna, mejoras específicas desde `min-width: 375px` para realzar el círculo de posición.
- **Datos en JSON**: la app consume `src/data/ranking.json` (incluye `id`, `comision`, `modulo`, `inscriptos`, `cantidad`, `tipo`).

## Tecnologías

- **React 19** (con React Compiler activado)
- **Vite** (rolldown-vite)
- **Tailwind CSS v4** (estilos utilitarios y gradientes)
- **ESLint** (calidad de código)

## Estructura de datos

Archivo: `src/data/ranking.json`

Campos por comisión:
- **id**: identificador de la comisión
- **comision**: nombre visible
- **modulo**: número de módulo (1, 2, 3, ...)
- **inscriptos**: total inicial (100%)
- **cantidad**: alumnos activos actuales
- **tipo**: `presencial` u `online`

La app calcula internamente `porcentaje = (cantidad / inscriptos) * 100` y ordena descendentemente.

## Scripts

- **Desarrollo**:

```bash
pnpm dev
```

- **Build**:

```bash
pnpm build
```

- **Preview**:

```bash
pnpm preview
```

## Cómo usar/editar los datos

1. Editá `src/data/ranking.json` para agregar/actualizar comisiones.
2. Asegurate de completar `inscriptos`, `cantidad`, `modulo` y `tipo`.
3. Guardá los cambios; el ranking se recalcula automáticamente en caliente en desarrollo.

## Diseño y UX

- Tema oscuro con gradientes y sombras suaves para mantener contraste y legibilidad.
- Podio con medalla SVG y colores ámbar con intensidad decreciente para los tres primeros.
- Tarjetas apiladas verticalmente, énfasis en el círculo de posición y en la métrica de permanencia.

## Roadmap sugerido

- Filtros por fecha y cohortes.
- Exportación de rankings (CSV/PNG/PDF).
- Indicadores complementarios (deserción, crecimiento neto, etc.).
- Accesibilidad reforzada (mejoras ARIA y contraste configurable).

## Contribuciones

Las contribuciones son bienvenidas. Abrí un issue o PR describiendo claramente el cambio propuesto. Seguí los estándares de código del proyecto y verificá que el linter pase sin errores.

## Licencia

MIT. Revisá el archivo de licencia si está disponible en el repositorio.
