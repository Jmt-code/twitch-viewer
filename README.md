# Multi-Stream Viewer (Twitch & Kick)

Un visualizador de múltiples canales que soporta tanto Twitch como Kick, permitiendo ver hasta 6 streams simultáneamente en un grid adaptativo.

## Características

- ✨ **Vista múltiple**: Visualiza hasta 6 canales simultáneamente
- 🎯 **Múltiples plataformas**: Soporte para Twitch y Kick
- 🔄 **Selector de plataforma**: Cambia fácilmente entre Twitch y Kick
- 🎯 **Grid adaptativo**: El layout se ajusta automáticamente según el número de canales
- 🔍 **Búsqueda fácil**: Añade canales simplemente escribiendo el nombre del streamer
- 🏷️ **Identificación visual**: Badges de colores para distinguir plataformas
- ❌ **Fácil eliminación**: Remueve canales con un clic
- 📱 **Responsive**: Funciona perfectamente en móviles, tablets y desktop
- 🎨 **Tema oscuro**: Diseño optimizado para sesiones largas de viewing

## Tecnologías utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático para mejor desarrollo
- **Vite** - Build tool y dev server
- **CSS3** - Estilos y animaciones
- **Twitch Embed Player** - Reproducción de streams de Twitch
- **Kick Player** - Reproducción de streams de Kick

## Instalación y uso

### Prerrequisitos
- Node.js 16+ instalado en tu sistema

### Pasos de instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone <tu-repositorio>
   cd twitch-viewer
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   - Ve a `http://localhost:5173`
   - ¡Ya puedes empezar a usar el multi-viewer!

## Cómo usar la aplicación

### Añadir un canal
1. Selecciona la plataforma (Twitch o Kick) en el selector
2. Escribe el nombre del canal en la barra de búsqueda
   - **Twitch**: "shroud", "ninja", "auronplay"
   - **Kick**: "trainwreckstv", "adin_ross", "xqc"
3. Presiona el botón `+` o la tecla Enter
4. El canal aparecerá automáticamente en el grid con su badge de plataforma

### Quitar un canal
1. Haz clic en el botón `✕` en la esquina superior derecha de cualquier canal
2. El canal se eliminará y el grid se reorganizará automáticamente

### Límites
- **Máximo 6 canales** simultáneos (de cualquier combinación de plataformas)
- Los nombres de canal deben ser válidos (sin espacios, caracteres especiales)
- No se pueden añadir canales duplicados de la misma plataforma
- Cada canal se identifica únicamente por plataforma:nombre

## Estructura del proyecto

```
src/
├── components/
│   ├── SearchBar.tsx      # Barra de búsqueda y selector de plataforma
│   ├── SearchBar.css      # Estilos de la barra de búsqueda
│   ├── StreamChannel.tsx  # Componente individual de canal (Twitch/Kick)
│   └── StreamChannel.css  # Estilos del reproductor de canal
├── types/
│   └── index.ts           # Tipos, interfaces y enums de TypeScript
├── App.tsx                # Componente principal con lógica del grid
├── App.css                # Estilos principales y grid layouts
├── index.css              # Estilos globales y reset
└── main.tsx               # Punto de entrada de la aplicación
```

## Layouts del grid

El sistema automáticamente organiza los canales según su cantidad:

- **1 canal**: Vista completa centrada
- **2 canales**: Grid 2x1 horizontal
- **3 canales**: Primer canal completo arriba, 2 canales abajo
- **4 canales**: Grid 2x2 cuadrado
- **5 canales**: Grid híbrido 2+3
- **6 canales**: Grid 3x2 completo

## Comandos disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de código
- `npm run deploy` - Despliega a GitHub Pages (manual)
- `npx tsc --noEmit` - Verifica tipos de TypeScript sin compilar

## 🚀 Deployment en GitHub Pages

Esta aplicación está configurada para desplegarse automáticamente en GitHub Pages.

### Deployment automático
1. Haz push a la rama `main`
2. GitHub Actions construirá y desplegará automáticamente
3. La aplicación estará disponible en: `https://[usuario].github.io/twitch-viewer`

### Deployment manual
```bash
npm run deploy
```

📖 **Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas**

## Notas técnicas

### Configuración de Embeds
- **Twitch**: Los embeds requieren que el dominio esté autorizado
  - En desarrollo, `localhost` está configurado como dominio permitido
  - Para producción, actualizar el parámetro `parent` en `StreamChannel.tsx`
- **Kick**: Los embeds funcionan directamente con `embedded=true`
  - No requiere configuración adicional de dominios
  - Autoplay deshabilitado por defecto

### Plataformas soportadas
- **Twitch**: Plataforma púrpura (#9146ff)
  - Usar nombres de usuario de Twitch
  - Embed oficial de Twitch Player
- **Kick**: Plataforma verde (#53fc18)  
  - Usar nombres de usuario de Kick
  - Embed oficial de Kick Player

### TypeScript
- Tipado estático para mejor experiencia de desarrollo
- Interfaces definidas para props de componentes
- Tipos centralizados en `src/types/index.ts`
- Compilación estricta habilitada

### Responsive breakpoints
- **Desktop**: 1200px+ (hasta 3 columnas)
- **Tablet**: 768px-1199px (máximo 2 columnas)
- **Mobile**: <768px (1 columna)

### Performance
- Los iframes de Twitch se cargan de forma lazy
- Estados de carga y error manejados individualmente
- Transiciones suaves en CSS para mejor UX

## Posibles mejoras futuras

- 🔊 Control de volumen individual por canal
- 💾 Guardar canales favoritos en localStorage  
- 🎮 Integración con APIs de Twitch y Kick para mostrar información del stream
- 💬 Opción para mostrar chat de cada canal
- 🎯 Modo teatro para maximizar un canal específico
- 🔄 Auto-refresh para canales offline
- ⚙️ Configuración de calidad de video
- 🌐 Soporte para más plataformas (YouTube Live, Facebook Gaming)
- 📊 Estadísticas de visualización y tiempo por canal

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

¡Disfruta viendo múltiples streams de Twitch y Kick! 🎮✨+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
