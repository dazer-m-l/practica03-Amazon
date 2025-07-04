
#  Scraper de Amazon con Puppeteer

Este proyecto realiza scraping de productos desde Amazon México según un término de búsqueda ingresado por el usuario. Extrae información de múltiples páginas de resultados y permite guardar los datos en formatos **CSV**, **JSON** o **XLSX** según preferencia.

---

##  Tecnologías utilizadas
- [Node.js]
- [Puppeteer]
- Módulos personalizados para exportación y entrada por consola

---

## ⚙️ ¿Qué hace este scraper?

1. Pregunta al usuario qué producto quiere buscar.
2. Accede a Amazon México y navega por los resultados de búsqueda.
3. Extrae información de cada producto:
   -  Título
   -  Precio actual
   -  Precio de lista
   -  Imagen del producto
4. Recorre automáticamente varias páginas.
5. Pregunta al usuario en qué formato desea exportar los datos:
   - CSV
   - JSON
   - Excel (XLSX)

## 📁 Estructura del proyecto

```
.
├── app.js                       # Código principal
├── src/
│   └── js/
│       ├── preguntarElementoABuscar.js
│       ├── preguntarOpcionGuardado.js
│       ├── exportarCSV.js
│       ├── exportarExcel.js
│       └── exportarJSON.js
├── dataCSV/                    # Archivos exportados en CSV
├── dataJSON/                   # Archivos exportados en JSON
├── dataXLSX/                   # Archivos exportados en Excel
```

---

## ▶️ Cómo ejecutar

1. Instala las dependencias necesarias:
   ```bash
   npm install puppeteer xlsx json2csv
   ```

2. Ejecuta el script:
   ```bash
   node app.js
   ```

3. Sigue las instrucciones por consola:
   - Ingresa un término de búsqueda (por ejemplo: "audífonos bluetooth").
   - Espera a que el scraper termine de recorrer las páginas.
   - Selecciona el formato de exportación.

---

## 📝 Notas adicionales

- El navegador se abre en modo visible (`headless: false`) para facilitar la depuración.
- Si no se desea guardar, puedes elegir "salir" cuando se te pregunte.

---

## 🧑‍💻 Autor

- 📧 [Sergio Monter Lara](dazer.mc1397@gmailcom / 2020704@utsh.edu.mx)
- 💼 Proyecto académico para prácticas de extracción de conocimiento en bases de datos
