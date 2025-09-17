# 🚀 Deployment Instructions

Este documento explica cómo hacer deploy de la aplicación Multi-Stream Viewer en GitHub Pages.

## 📋 Pre-requisitos

1. **Repositorio en GitHub**: Asegúrate de que tu código esté en un repositorio de GitHub
2. **Node.js 18+**: Para construir la aplicación
3. **Permisos**: Acceso de escritura al repositorio

## 🔧 Configuración inicial

La aplicación ya está configurada para GitHub Pages con:

- **GitHub Actions**: Workflow automático en `.github/workflows/deploy.yml`
- **Vite config**: Base path configurado para GitHub Pages
- **Package.json**: Scripts de deployment incluidos
- **Embeds**: Configuración dinámica para localhost y GitHub Pages

## 🌐 Deployment automático (Recomendado)

### 1. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. ¡Listo! Los deployments serán automáticos

### 2. Hacer push al repositorio

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

El workflow se ejecutará automáticamente y desplegará la aplicación.

## 📦 Deployment manual

Si prefieres hacer deployment manual:

```bash
# Construir la aplicación
npm run build

# Deployar a GitHub Pages
npm run deploy
```

## 🔗 URL de la aplicación

Una vez desplegada, tu aplicación estará disponible en:
```
https://[tu-usuario].github.io/twitch-viewer
```

**Ejemplo**: https://juanm.github.io/twitch-viewer

## ⚙️ Configuración personalizada

### Cambiar el nombre del repositorio

Si tu repositorio tiene un nombre diferente, actualiza:

1. **package.json**: 
   ```json
   "homepage": "https://[usuario].github.io/[nombre-repo]"
   ```

2. **vite.config.ts**:
   ```typescript
   base: '/[nombre-repo]/'
   ```

3. **StreamChannel.tsx** (si es necesario):
   ```typescript
   const parentDomain = isLocalhost ? 'localhost' : '[usuario].github.io';
   ```

## 🔍 Verificación del deployment

1. **GitHub Actions**: Ve a la tab **Actions** en GitHub para ver el estado
2. **Logs**: Revisa los logs si hay errores
3. **Cache**: Puede tardar unos minutos en aparecer por el cache de GitHub

## 🐛 Troubleshooting

### Página en blanco
- Verifica que el `base` en `vite.config.ts` coincida con el nombre del repo
- Revisa la consola del navegador para errores de rutas

### Embeds de Twitch no cargan
- Asegúrate de que el dominio esté autorizado en la configuración de Twitch
- Verifica que `parentDomain` sea correcto en `StreamChannel.tsx`

### Errores en GitHub Actions
- Revisa que tengas permisos de Pages habilitados
- Verifica que la rama sea `main` o actualiza el workflow

## 📄 Scripts disponibles

- `npm run dev` - Desarrollo local
- `npm run build` - Construir para producción  
- `npm run deploy` - Deploy manual a GitHub Pages
- `npm run preview` - Previsualizar build local

## 🎯 Próximos pasos

1. Hacer push del código a GitHub
2. Habilitar GitHub Pages
3. ¡Disfrutar de tu Multi-Stream Viewer en vivo!

---

¿Necesitas ayuda? Revisa la documentación de [GitHub Pages](https://docs.github.com/en/pages) o [Vite deployment](https://vitejs.dev/guide/static-deploy.html).