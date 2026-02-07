# FrameYourself – Art Gallery Shop

A Next.js art-prints / frame gallery shop with the same sales flow as the parent privacy-shop template. Products are loaded from a local JSON file; no Google Sheets. Placeholder images from Picsum.

## Features

- Home: Hero, product grid, About, Contact, Footer
- Product detail: by slug, discount table, add to cart / buy now
- Cart and checkout (billing, shipping, place order)
- Order confirmation (latest order from `data/orders.json`)
- Orders API: writes to `data/orders.json` only (no Google Sheet)
- Optional SMTP for order and contact emails
- Contact form and API

## Setup

```bash
cd art-gallery-shop
npm install
npm run dev
```

Runs on **http://localhost:3001** (configured in `package.json`).

## Data

- **Products:** `data/products.json` (edit to add/change prints)
- **Orders:** `data/orders.json` (created on first order)

## Optional: move to sibling path

This project lives inside `privacy-shop/art-gallery-shop`. To run it as a sibling of `privacy-shop` (e.g. `/Users/you/Developer/art-gallery-shop`), move the folder and run `npm install` then `npm run dev` there.

## Env

See `.env.example`. Optional: SMTP for order confirmation and contact form.
