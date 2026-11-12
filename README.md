# Pack Place

The one stop shop for all your NBA trading card needs.

Pack Place is a personal collection tracker for NBA trading cards. Sign up, add your cards, and see your whole collection — and what you paid for it — in one place. Each user only ever sees their own cards.

Built as a fellowship demo day project. Demo day: **December 10, 2026**.

## What it does

- **User accounts** — sign up, log in, and log out with Passport local auth. Cards are stored with the owner's user ID, and the dashboard, edit, and delete routes all filter by it, so a second account sees none of the first account's cards.
- **Add a card** — player, company, card type, year, set, parallel, grade, and price paid.
  - Company: Panini, Topps, Upper Deck, Other
  - Card type: Base, Rookie, Autograph, Relic, Insert
- **Collection dashboard** — your card count and the total value of your collection, added up from what you paid for each card.
- **Edit a card** — update a card's grade or price from the card itself (pencil icon, `PUT /cards`). Only the fields you actually fill in are changed.
- **Delete a card** — remove a traded card with the x on the card (`DELETE /cards`).
- **Deck display** — cards stack and overlap like a deck. Hover a card to pull it out to full height and see its details.
- **Tilt and reflective glare** — cards tilt a few degrees toward your cursor and a glare follows it across the card, so they feel like real cards under light.

## Tech stack

- Node.js + Express 4
- EJS templates + Bootstrap
- MongoDB — native driver for cards, Mongoose for users
- Passport (local auth) + express-session + connect-flash
- dotenv for configuration

## Getting started

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/tbrown320/Pack-Place.git
   cd Pack-Place
   npm install
   ```

2. Create a `.env` file in the project root with your database connection string:

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   ```

   `config/database.js` reads `MONGO_URI` from the environment and uses the database name `cards`. `.env` is gitignored — never commit it.

3. Start the server:

   ```bash
   node server.js
   ```

4. Open http://localhost:8081, sign up, and add your first card. (Set the `PORT` environment variable to run on a different port.)

## Project structure

```
server.js              - app entry point (port 8081, or $PORT)
Procfile               - web: node server.js (for deployment)
app/
  routes.js            - routes: home, dashboard, add/edit/delete cards, auth
  models/user.js       - user model
config/
  database.js          - database connection (MONGO_URI, db name: cards)
  passport.js          - local signup / local login setup
views/
  index.ejs            - landing page
  login.ejs            - login form
  signup.ejs           - signup form
  profile.ejs          - collection dashboard + add-a-card form
  connect-local.ejs    - connect a local account
public/
  main.js              - dashboard interactions (edit, delete, tilt + glare)
  style.css            - layout, deck display, reflective effect
  fonts/               - Bhanira, MONOPOLY_INLINE
  img/                 - images
```

## Roadmap

- **Virtual binder** — cards in a 9-pocket binder page; click a card to bring it to center stage, flip it for details, and edit or remove it from there.
- **Stock ticker** — your most valuable cards, plus the most valuable cards on the market, in a rotating ticker grouped by company. The dashboard currently has only a placeholder for this (`#ticketer`); the working version will use SportsCardsPro data via ReefAPI, cached and refreshed daily.
- **More card options** — Fleer and other companies, plus card types like Rookie Patch Autograph, Patch, and Redemption, in the add-a-card form.
- Search and filter the collection

---

Thay Brown — [thaybrown22@gmail.com](mailto:thaybrown22@gmail.com) · [Portfolio](https://thaythecoder.netlify.app) · [GitHub](https://github.com/tbrown320) · [LinkedIn](https://www.linkedin.com/in/thaybrown)
