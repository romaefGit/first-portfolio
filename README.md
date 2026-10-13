# My First Portfolio - Angular

This is a portfolio project, originally built with AngularJS and now migrated to Angular 22. It includes parallax effects, Materialize CSS, and various animations to showcase my skills and professional experience, plus an admin panel to manage languages, companies and articles.

## Features

- **Parallax Effect:** Dynamic and immersive navigation.
- **Materialize CSS:** Clean and responsive design following Material Design principles.
- **Animations:** Attractive visual feedback to highlight my skills and work experience.
- **Admin panel:** JWT login and CRUD with image uploads, at `/admin`.

## Technologies Used

- Angular 22 (standalone components, signals, zoneless)
- Node.js + Express API (`server/`) with Sequelize + MySQL
- Materialize CSS (landing) and Material Dashboard (admin)
- d3 (language level gauges)

## Project structure

```
app.js          Express: API at /server/api, static files at /public, serves the Angular build
server/         API (routes, controllers, Sequelize models, JWT security)
public/         Styles and images (landing, admin, uploaded images)
frontend/       Angular app
  src/app/landing/   Portfolio: /inicio, /informacion, /fullstack
  src/app/admin/     Admin: /admin/login, /admin/languages, /admin/empresas, ...
```

## Requirements

- Node.js `^22.22.3` or `>=24.15.0` (required by Angular 22)
- MySQL with a `romaef` database. Connection settings are in `server/models/models.js`.
  To get one quickly with Docker:

  ```sh
  docker run -d --name romaef-mysql -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=romaef mysql:5.7
  docker exec -i romaef-mysql mysql romaef < "_docu/bk_romaef 4 tables good.sql"
  ```

## Installation

Clone the repository:

```sh
git clone https://github.com/romaefGit/first-portfolio
```

Install modules (also installs `frontend/`):

```sh
npm install
```

## Run

Build the Angular app and start the server:

```sh
npm run build
npm start
```

It runs at http://localhost:3000/ (set `PORT` to change it).

### Development

Run the API and the Angular dev server in two terminals:

```sh
npm run dev         # Express API with nodemon on :3000
npm run dev:front   # ng serve on :4200, proxies /server, /public and images to :3000
```

Then open http://localhost:4200/.

### Tests

```sh
npm test
```
