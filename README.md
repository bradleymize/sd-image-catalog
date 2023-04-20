# sd-image-catalog
Angular application for cataloguing / indexing images for Stable Diffusion

# Pre-requisites
- Docker

# Development
- In one terminal run either `nodeDevEnv.bat` if using Windows, or `nodeDevEnv.sh` if using Linux
- `cd server`
- `npm run dev` - Starts the server in development mode
- In another terminal run `docker exec -it sd-image-catalog /bin/bash`
- `cd app`
- If using windows, `npm run watch-win`, if using Linux `npm run watch`


| OS      |  Server             | UI                  |
|---------|---------------------|---------------------|
| Windows |  `npm run dev`      | `npm run watch-win` |
| Linux   |  `npm run dev`      | `npm run watch`     |

# Creating a new page
- `npm run ng -- g m module-name --routing`
- `npm run ng -- g c module-name -m module-name`
- Add empty `''` route to module's routing module
- Add lazily loaded route to `app-routing.module.ts` referencing the module
- Add tab to `app.component.ts`


# Running
If Node is installed locally, run `ng serve` and access via http://localhost:4200

If using docker (and/or Windows), run `npm run start-win` to be able to access via http://localhost:4200