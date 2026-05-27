# WanderLust

 WanderLust is a full-stack vacation rental marketplace built with Node.js, Express, MongoDB, EJS, Passport, and Cloudinary.

## Features

- User authentication (signup/login/logout)
- Create, edit, delete property listings
- Image uploads with Cloudinary + Multer
- Reviews and ratings for listings
- Interactive map display for listing locations (MapTiler)
- Responsive UI for desktop and mobile

## Tech Stack

- **Backend:** Node.js, Express, Mongoose
- **Templating:** EJS + ejs-mate
- **Auth:** Passport + passport-local + passport-local-mongoose
- **Storage:** MongoDB + connect-mongo (session store)
- **Media:** Cloudinary + multer-storage-cloudinary
- **Validation:** Joi
- **Frontend:** Bootstrap 5 + custom CSS/JS

## Project Structure

```text
controllers/      # Route handlers / business logic
models/           # Mongoose models
routes/           # Express routers
views/            # EJS templates
public/           # Static assets (CSS/JS)
utils/            # Helpers (error wrapper/classes)
middleware.js     # Auth, authorization and Joi validation middleware
app.js            # App bootstrap and server entry
```

## Environment Variables

Create a `.env` file in the project root (or copy from `.env.example`):

```bash
PORT=8000
SECRET=replace-with-strong-secret
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
MAP_TOKEN=your-maptiler-token
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Validation / Checks

```bash
npm run check
```

This runs syntax checks on core server files.

## Deployment Notes

- Set all environment variables from `.env.example` in your deployment provider.
- Use a production MongoDB URI for `ATLASDB_URL`.
- Set a strong, unique `SECRET`.
- Ensure Cloudinary and MapTiler credentials are valid.
- In production, cookies are set with `secure: true` when `NODE_ENV=production`.

## License

ISC
