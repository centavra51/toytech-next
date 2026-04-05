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
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If Telegram variables are missing, the form request is accepted and logged server-side instead of sending a live notification.

`/api/sheets` accepts only HTTPS Google Apps Script endpoints.

## Supabase Admin

1. Create a Supabase project.
2. In Supabase Auth, enable Email provider.
3. Run SQL from `supabase/schema.sql`.
4. Create your first auth user in Supabase Auth.
5. Add that user's `id` to `public.admin_users`.
6. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel.
7. Open `/admin/login` and sign in.

Public pages read content from `public.site_content`. If Supabase is empty or unavailable, the site falls back to local defaults.
