# Reglas del proyecto

- Nunca añadas comentarios en ningún fichero del proyecto: ni `//`, ni `/* */`, ni `<!-- -->`, ni `#` en yaml o `.gitignore`. Si algo necesita explicación, usa nombres claros o cuéntalo en la respuesta, no en el fichero.
- Si necesitas guardar un dato que antes irías a poner en un comentario (nombre, descripción, tamaño...), guárdalo como código real: un JSON, una constante, un campo de configuración.
- Excepciones que no son comentarios y se mantienen: la directiva `/// <reference types="..." />` de `src/env.d.ts`.
- `public/robots.txt` conserva sus comentarios a propósito. No los quites ni añadas otros.
