# 🦜 KEKU - Plataforma de Aprendizaje de Matemáticas

KEKU es una PWA educativa estilo Duolingo para aprender matemáticas de forma gamificada.

## 🚀 Instalación Local Completa

### Requisitos Previos
- Node.js 18+ ([Descargar aquí](https://nodejs.org/))
- Git ([Descargar aquí](https://git-scm.com/))
- Docker Desktop ([Descargar aquí](https://www.docker.com/products/docker-desktop/)) - Para Supabase local

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/TU_USUARIO/keku.git
cd keku
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Supabase Local

#### Instalar Supabase CLI

**Windows:**
```bash
npm install -g supabase
```

**macOS/Linux:**
```bash
brew install supabase/tap/supabase
```

#### Iniciar Supabase Local

```bash
# Iniciar Docker Desktop primero

# Iniciar Supabase (esto descargará las imágenes de Docker)
npx supabase start
```

Este comando mostrará las credenciales locales:
```
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
anon key: eyJh...
service_role key: eyJh...
```

#### Aplicar Migraciones

```bash
npx supabase db reset
```

### Paso 4: Configurar Variables de Entorno Locales

Crea un archivo `.env.local`:

```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
VITE_SUPABASE_PROJECT_ID=local
```

### Paso 5: Ejecutar la Aplicación

```bash
npm run dev
```

La app estará disponible en: `http://localhost:8080`

### Paso 6: Acceder al Dashboard de Supabase

Abre en tu navegador: `http://127.0.0.1:54323`

Aquí puedes:
- Ver y editar datos en las tablas
- Probar consultas SQL
- Gestionar autenticación
- Ver logs en tiempo real

## 📱 Acceso desde Móvil (Misma Red WiFi)

1. Encuentra tu IP local:
   - **Windows**: `ipconfig` (buscar IPv4)
   - **macOS/Linux**: `ifconfig` (buscar inet)

2. Abre en tu móvil: `http://TU_IP:8080`

## 🏗️ Estructura del Proyecto

```
keku/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ExerciseCard.tsx
│   │   ├── FeedbackMascot.tsx  # Personaje de feedback
│   │   └── ui/             # Componentes shadcn
│   ├── contexts/           # Contextos de React
│   │   └── AuthContext.tsx
│   ├── data/               # Datos estáticos
│   │   └── levels.ts
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilidades y generadores
│   │   ├── answerValidator.ts  # Validador de respuestas
│   │   ├── exerciseGenerator.ts
│   │   └── supabase.ts
│   ├── pages/              # Páginas de la app
│   │   ├── Index.tsx       # Landing page
│   │   ├── Auth.tsx        # Login/Registro
│   │   ├── Dashboard.tsx   # Mapa de niveles
│   │   ├── Level.tsx       # Vista de ejercicios
│   │   └── VarkTest.tsx    # Test de estilo de aprendizaje
│   └── main.tsx
├── supabase/
│   ├── config.toml
│   └── migrations/         # Migraciones de base de datos
├── public/
└── package.json
```

## 🗄️ Base de Datos

### Tablas Principales

- **profiles**: Perfiles de usuario (XP, rachas, estilo VARK)
- **level_progress**: Progreso en cada nivel
- **exercise_attempts**: Historial de ejercicios
- **badges**: Logros desbloqueados

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build
npm run preview

# Supabase
npx supabase start          # Iniciar base de datos local
npx supabase stop           # Detener base de datos
npx supabase db reset       # Resetear base de datos
npx supabase db diff        # Ver cambios en el schema
npx supabase migration new nombre  # Crear nueva migración

# Ver logs de Supabase
npx supabase logs
```

## 🚀 Despliegue a Producción

### Opción 1: Vercel + Supabase Cloud

1. **Crear proyecto en Supabase Cloud**: https://supabase.com/dashboard
2. **Aplicar migraciones**:
   ```bash
   npx supabase link --project-ref TU_PROJECT_REF
   npx supabase db push
   ```
3. **Conectar con Vercel**: Importa el repo en Vercel y configura las variables de entorno

### Opción 2: Netlify + Supabase Cloud

Similar a Vercel, importa en Netlify y configura las env vars.

## 🐛 Solución de Problemas

### La base de datos no inicia

```bash
# Asegúrate que Docker Desktop esté corriendo
# Elimina los contenedores anteriores
npx supabase stop --no-backup
npx supabase start
```

### Error de conexión a Supabase

- Verifica que el archivo `.env.local` existe
- Reinicia el servidor de desarrollo

### Problemas con migraciones

```bash
# Resetear completamente
npx supabase db reset
```

## ✨ Características Nuevas

### Personaje de Feedback
- Mascota animada que aparece al responder ejercicios
- Mensajes motivacionales personalizados
- Animaciones diferentes para respuestas correctas e incorrectas

### Validación Mejorada de Respuestas
- Tolerancia a variaciones de mayúsculas/minúsculas
- Normalización de tildes y espacios
- Validación flexible para respuestas numéricas

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

MIT

---

Hecho con ❤️ para mejorar la educación matemática
