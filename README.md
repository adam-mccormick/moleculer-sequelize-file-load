[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# moleculer-sequelize-file-load
This is a [Moleculer](https://moleculer.services/)-based project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

This project shows an example of file loading for MySQL

## Usage

`npm run dc:up` To start the stack with Docker compose then visit http://localhost:3000/api/posts to see 3 posts bulk loaded from
the `data.csv` file.

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
