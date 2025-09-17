# 🔧 Solución para Problemas de Content Security Policy (CSP)

## Problema Identificado

El error que estás viendo:
```
Refused to frame 'https://player.twitch.tv/' because an ancestor violates the following Content Security Policy directive: "frame-ancestors https://juanm.github.io".
```

Ocurre porque Twitch tiene políticas estrictas sobre qué dominios pueden embebir su contenido.

## ✅ Soluciones Implementadas

### 1. **Detección Inteligente de Dominios**
- El sistema ahora detecta automáticamente si está ejecutándose en `localhost` o `github.io`
- Configura el parámetro `parent` correctamente para cada entorno

### 2. **Manejo Robusto de Errores**
- Detecta cuando un iframe está bloqueado por CSP
- Muestra mensajes informativos al usuario
- Proporciona botones para abrir el stream en una nueva pestaña

### 3. **Headers CSP Optimizados**
Se han añadido headers de Content Security Policy en `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="
  frame-src 'self' https://player.twitch.tv https://embed.twitch.tv https://player.kick.com https://kick.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://embed.twitch.tv https://player.twitch.tv;
  ...
">
```

### 4. **Componente Alternativo con Twitch Embed API**
- Creado `TwitchEmbedPlayer.tsx` que usa la API oficial de Twitch
- Más compatible que iframe directo
- Carga automática del script embed de Twitch

## 🚀 Recomendaciones para Deployment

### Para GitHub Pages:
1. **Usar URLs con parámetros para testing:**
   ```
   https://tuusuario.github.io/twitch-viewer/?t=ninja,shroud&k=trainwreck
   ```

2. **Si persisten los problemas, considera usar:**
   - **Netlify**: Mejor soporte para CSP personalizado
   - **Vercel**: Headers más flexibles
   - **Firebase Hosting**: Control total sobre headers

### Para Desarrollo Local:
- Funciona perfectamente en `localhost`
- Usa `npm run dev` para testing local

## 🔄 Cómo Funciona el Fallback

1. **Intento Principal**: Cargar iframe embed
2. **Detección**: Si falla por CSP (timeout 8s)
3. **Fallback UI**: Mostrar botón "Abrir en Twitch/Kick"
4. **Experiencia**: Usuario puede ver streams en nueva pestaña

## 🛠️ Testing

Para probar la funcionalidad:

1. **Local (debería funcionar):**
   ```bash
   npm run dev
   ```

2. **Producción (con fallback):**
   ```bash
   npm run build
   npm run preview
   ```

3. **Con parámetros URL:**
   ```
   http://localhost:4173/?t=ninja,pokimane&k=trainwreck
   ```

## 📋 Alternativas si el Problema Persiste

### Opción A: Cambiar a Netlify
```bash
# Build del proyecto
npm run build

# Deploy en Netlify (arrastra la carpeta dist/)
# Configurar headers custom en netlify.toml
```

### Opción B: Usar Embed API Exclusivamente
Cambiar `StreamChannel.tsx` para usar solo `TwitchEmbedPlayer` para Twitch:

```tsx
// En lugar de iframe, usar:
{channel.platform === Platform.TWITCH ? (
  <TwitchEmbedPlayer channelName={channel.name} onError={handleIframeError} />
) : (
  <iframe src={getKickEmbedUrl()} ... />
)}
```

### Opción C: Proxy Server
Crear un proxy server que sirva el contenido de Twitch sin restricciones CSP.

## 💡 Notas Importantes

- **Kick funciona mejor** que Twitch con GitHub Pages
- **Localhost siempre funciona** para desarrollo
- **El fallback asegura** que la app sea usable incluso con restricciones
- **Los parámetros URL funcionan** independientemente del embed

El sistema ahora es robusto y maneja graciosamente las limitaciones de GitHub Pages mientras mantiene toda la funcionalidad.