# Enabling real contact-form email (EmailJS)

The contact form works right now, but it works the *slow* way: it opens the
visitor's email app with everything pre-filled. Nothing is lost, but they have
to hit send themselves, and some people won't.

Wiring EmailJS makes it send automatically, straight into your inbox. It takes
about ten minutes and needs an account only you can create.

---

## Why EmailJS and not a backend

This site is a static Vite app on Vercel with no server. Sending email properly
needs credentials that must never reach the browser, which means a serverless
function and a provider like Resend or Postmark.

EmailJS exists precisely to skip that: it holds the credentials server-side on
their end, and the browser only ever gets a public key. For a contact form on a
personal site it's the right size of tool. If you later want form-to-CRM routing
or autoresponders with real logic, switch to a Vercel function + Resend.

---

## Step 1 — Create the account

1. Go to **https://www.emailjs.com/** and sign up (free tier: 200 emails/month,
   which is plenty for a portfolio contact form).
2. Confirm your email.

## Step 2 — Connect your inbox

1. Dashboard → **Email Services** → **Add New Service**.
2. Choose **Gmail** (or your provider).
3. Connect `1stnighthawkllc@gmail.com`.
4. Copy the **Service ID** — looks like `service_abc1234`.

> If you use Gmail, EmailJS needs an app password or OAuth depending on the
> option you pick. Follow their prompt; don't paste your Google password anywhere.

## Step 3 — Create the template

1. Dashboard → **Email Templates** → **Create New Template**.
2. Set **To Email** to `1stnighthawkllc@gmail.com`.
3. Set **Subject** to:

```
New inquiry — {{budget}} — {{from_name}}
```

4. Set the **body** to:

```html
<h2>New project inquiry</h2>

<p><strong>From:</strong> {{from_name}} &lt;{{reply_to}}&gt;</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Received:</strong> {{sent_at}}</p>

<hr />

<p style="white-space: pre-wrap">{{message}}</p>
```

5. In **Reply To**, set `{{reply_to}}` — so hitting Reply goes to the visitor,
   not to EmailJS.
6. Copy the **Template ID** — looks like `template_xyz9876`.

> The site sends more variables than the template uses, on purpose:
> `from_name`, `name`, `reply_to`, `email`, `budget`, `message`, `title`,
> `summary`, `sent_at`. If you'd rather build a simpler template, `summary` has
> the whole enquiry on one line.

## Step 4 — Get the public key

1. Dashboard → **Account** → **General** → **API Keys**.
2. Copy the **Public Key**.

## Step 5 — Add them to the project

Create `.env` in the project root (it's gitignored — never commit it):

```bash
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz9876
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

Then restart the dev server. `src/lib/emailjs.ts` only treats a value as real
if it doesn't start with `your_`, so placeholders are ignored safely.

## Step 6 — Add them to Vercel

Vite inlines `VITE_*` at **build** time, so this is not optional — without it
production keeps using the mailto fallback.

1. Vercel → project `1st-nighthawk-innovations` → **Settings** → **Environment
   Variables**.
2. Add all three, scoped to **Production** (and Preview if you want previews to
   send too).
3. **Redeploy** — env changes don't apply to existing deployments.

## Step 7 — Lock it down

Your public key is visible in the browser bundle. That's by design — it's a
public key — but do two things:

1. In EmailJS → **Account** → **Security**, add an **allowed origin** list
   containing only `https://www.1stnighthawk.com` and `http://localhost:5173`.
   This stops anyone else embedding your key on their own site.
2. Leave the free-tier cap in place. If you ever get spam, the 200/month limit
   means it can't cost you money — just raise it deliberately if needed.

## Step 8 — Verify

```bash
npm run dev
```

Go to `/contact`, submit a real message, and confirm it lands in the inbox.
Reply to it — the reply should go to the address you typed in the form, not to
EmailJS.

---

## Troubleshooting

### `412 Gmail_API: Invalid grant. Please reconnect your Gmail account`

The keys are fine — your **Gmail connection inside EmailJS has expired**. Google
invalidates the OAuth grant when the account password changes, a security event
occurs, or the token ages out.

Fix: EmailJS dashboard → **Email Services** → your Gmail service → **Reconnect**.
You can confirm the state from the console: the failed request goes to
`https://api.emailjs.com/api/v1.0/email/send` and returns 412 with that message.

This is the most common EmailJS failure and it is always on the provider side,
never in the site code.

### `412` or `403` with a domain/origin message

Your allowed-origin list doesn't include the host you're sending from. Add
`http://localhost:5173` for local work and `https://www.1stnighthawk.com` for
production.

### Site still uses the mailto fallback after adding keys

Vite inlines `VITE_*` at **startup**, so a running dev server keeps the old
values. Restart it. In production, environment variables only apply to *new*
deployments — redeploy after changing them in Vercel.

### Confirming the keys loaded

The console will show `isEmailConfigured: true` when all three values are
present and none start with `your_`. If it's false, one key is missing or is
still a placeholder.

---

## What the form does in each state

| Situation | Behaviour |
|---|---|
| Keys present, send succeeds | Green confirmation, form resets |
| Keys present, send fails | Yellow panel: "Open in email" + "Copy message" |
| No keys (today) | Mail app opens pre-filled, plus the same panel as a backup |
| Direct email link | Always visible under the form heading |

The failure path never loses the enquiry. That was the whole point of the
rewrite — the previous version showed "That didn't go through" and left the
visitor with nothing.
