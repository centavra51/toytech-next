ToyTech is a multilingual Next.js service site prepared for deployment on Vercel.

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm run build
```

## Vercel

Set the project root directory to `toytech-next`.

Optional environment variables:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

If Telegram variables are missing, the form request is accepted and logged server-side instead of sending a live notification.

`/api/sheets` accepts only HTTPS Google Apps Script endpoints.

The legacy HTML admin panel is not published as-is. `/admin` now serves a safe Next.js admin information page.
