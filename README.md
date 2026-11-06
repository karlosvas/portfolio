# Portfolio

## 📊 GitHub Stats

![GitHub Streak](https://streak-stats.demolab.com?user=karlosvas&theme=tokyonight)

## 📂 Proyectos

You can see all my projects in 🌐 [carlos.dev](https://carlosvas.dev)

### Lenguajes y Frameworks

![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### Motores y Game Development

![Unreal Engine](https://img.shields.io/badge/Unreal_Engine-0E1128?style=for-the-badge&logo=unrealengine&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white)

### Bases de Datos y Backend Services

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### DevOps y Deployment

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

### Herramientas y Otros

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Taiga](https://img.shields.io/badge/Taiga-2D9CDB?style=for-the-badge&logo=taiga&logoColor=white)
![Kali Linux](https://img.shields.io/badge/Kali_Linux-557C94?style=for-the-badge&logo=kali-linux&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

## 📚 Filosofía de desarrollo

- Clean, documented code
- Modular, maintainable design
- Testing best practices
- Continuous learning and community collaboration
- If it works, learn why
- If it doesn't, learn why too

## 📫 Contacto

- 💼 LinkedIn: [Carlos Vásquez Sánchez](https://www.linkedin.com/in/carlosvassan)
- :information_source: **Note:**
  Get in touch! You can find me on LinkedIn to discuss collaborations, projects, or simply chat about programming; my email is [carlosvassan@gmail.com](mailto:carlosvassan@gmail.com)
  Thanks for visiting my portfolio! 🚀

## Editar los textos sin redeploy (Cloudflare R2)

Todos los textos visibles salen de `i18n/{es,en}.json`. En producción la web intenta leer
`lang/es.json` y `lang/en.json` del bucket de R2 (`PUBLIC_R2_PUBLIC_URL`) en cada petición:

- Vercel cachea la respuesta 5 minutos (`s-maxage=300`) y sirve la anterior mientras revalida,
  así que un cambio se ve en unos minutos, sin desplegar.
- Se **fusiona sobre el JSON empaquetado**: las claves que falten, o con un tipo distinto, se ignoran y
  se usa el texto local. Un JSON roto, ausente o un fallo de R2 nunca rompe la web.
- Para empezar, copia `content/example/{es,en}.json` (son los mismos que `i18n/`), edítalos y súbelos:

```sh
wrangler r2 object put <bucket>/lang/es.json --file content/example/es.json --content-type application/json
wrangler r2 object put <bucket>/lang/en.json --file content/example/en.json --content-type application/json
```

Los proyectos nuevos se pueden añadir en `projects.list` / `projects.others` con la misma forma que los
existentes (necesitan su imagen en `public/img/<clave>.webp`).
