# Ejecutar Swagger-Express

## Acceder a la documentación de Swagger  
Una vez que el servidor esté en ejecución, la documentación de la API estará disponible en:  

[http://localhost:3000/api-docs/#/Products/post_api_product](http://localhost:3000/api-docs/#/Products/post_api_product)  

## Instalación de dependencias  
Antes de ejecutar el servidor, es necesario instalar las dependencias del proyecto con el siguiente comando:  
npm install

Para ejecutarlo con:
npm run start

# Requisitos del Frontend  

## 1. Vista de Login  
La aplicación debe contar con una vista de autenticación con los siguientes elementos:  

### **Campos:**  
- **Usuario** (input de texto)  
- **Contraseña** (input de tipo password)  

### **Funcionalidad:**  
- Permitir al usuario ingresar sus credenciales.  
- Si las credenciales son correctas, redirigir a la vista de la lista de productos.  
- Manejar errores en caso de credenciales incorrectas.  

---

## 2. Vista de Lista de Productos  
Debe permitir a los usuarios gestionar los productos con las siguientes acciones:  

### **Funcionalidades:**  
- **Ver la lista de productos** con su información relevante.  
- **Crear nuevos productos**, ingresando datos como nombre, precio y descripción.  
- **Editar productos existentes** modificando sus datos.  
- **Eliminar productos** de la lista.  

### **Consideraciones:**  
- Mostrar los productos en una tabla o lista con opciones para editar y eliminar.  
- Utilizar modales o formularios para la creación y edición de productos.  
- Confirmar la eliminación antes de borrar un producto.  
