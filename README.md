# API REST E-commerce — FUNVAL

API REST para la gestión de un sistema de comercio electrónico, desarrollada colaborativamente con Node.js, Express y TypeScript.

El proyecto implementa operaciones CRUD para administrar usuarios, productos, categorías, órdenes y detalles de órdenes.

## 1. Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express 5:** framework para construir la API REST.
- **TypeScript:** tipado estático y organización del código.
- **Swagger:** documentación interactiva de los endpoints.
- **Swagger Autogen:** generación automática de documentación.
- **dotenv:** administración de variables de entorno.
- **bcrypt:** generación de hashes seguros para las contraseñas.

## 2. Módulos de la aplicación

La API está organizada en cinco módulos principales:

| Módulo | Funcionalidad |
|---|---|
| Users | Gestión de usuarios. |
| Products | Gestión de productos. |
| Categories | Gestión de categorías. |
| Orders | Gestión de órdenes de compra. |
| OrderItems | Gestión de los detalles de cada orden. |

Los módulos implementan operaciones CRUD:

- **GET:** consultar registros.
- **POST:** crear registros.
- **PUT:** actualizar registros.
- **DELETE:** eliminar registros.

## 3. Requisitos

- Node.js.
- npm.
- Git.
- Visual Studio Code (recomendado).

## 4. Instalación

Clonar el repositorio:

```bash
git clone https://github.com/DocGus/FUNVAL-desafio-equipo-Intgeracion3.git
```

Entrar al directorio:

```bash
cd FUNVAL-desafio_equipo-integracion3
```

Instalar las dependencias:

```bash
npm install
```

## 5. Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
API_KEY=tu_clave_secreta
```

Variables disponibles:

- `PORT`: puerto del servidor.
- `NODE_ENV`: entorno de ejecución.
- `CORS_ORIGIN`: origen permitido para las solicitudes.
- `API_KEY`: clave utilizada por el middleware de seguridad.

**Importante:** el archivo `.env` contiene información privada y no debe subirse al repositorio.

## 6. Ejecución

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Generar la documentación Swagger:

```bash
npm run swagger
```

Compilar el proyecto TypeScript:

```bash
npm run build
```

Ejecutar la versión compilada:

```bash
npm start
```

## 7. Endpoints principales

| Módulo | Endpoint base |
|---|---|
| Users | `/api/users` |
| Products | `/products` |
| Categories | `/api/categories` |
| Orders | `/api/orders` |
| OrderItems | `/api/order-items` |

Cada módulo dispone de endpoints para consultar, crear, actualizar y eliminar registros.

Para consultar las rutas específicas y sus parámetros, utilizar la documentación Swagger.

## 8. Seguridad y middleware

La aplicación incorpora mecanismos para controlar y procesar las solicitudes:

- **API Key:** protege todas las rutas del módulo Users y las operaciones de escritura de Products y Categories.
- **CORS:** controla los orígenes permitidos.
- **Logger:** registra las solicitudes HTTP recibidas.
- **Validaciones:** comprueba los datos enviados en las operaciones de Orders y OrderItems.
- **bcrypt:** genera hashes de contraseñas durante el registro y actualización de usuarios.

Para las operaciones protegidas se debe enviar el encabezado:

```http
x-api-key: tu_clave_secreta
```

## 9. Documentación Swagger

La API cuenta con documentación interactiva para consultar y probar los endpoints.

Con el servidor en ejecución, acceder a:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 10. Consideraciones

- Los registros se administran en memoria, por lo que no existe almacenamiento persistente.
- El proyecto tiene un propósito académico y fue desarrollado mediante trabajo colaborativo.
- Las variables privadas deben mantenerse fuera del control de versiones.
