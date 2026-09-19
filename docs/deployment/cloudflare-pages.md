# Deploying to Cloudflare Pages

This site is a static Astro site. It does not require a server, database, Astro adapter, or runtime secrets for its current content.

## Recommended Cloudflare Pages settings

Create a Cloudflare Pages project connected to the GitHub repository and use:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Deploy command | **Leave blank** — Cloudflare Pages deploys the `dist` output automatically |
| Root directory | `/` |
| Node.js version | Use the repository’s supported Node version; pin it in Cloudflare project settings when choosing a version |

The repository’s `package-lock.json` should be used for reproducible dependency installation. No environment variables are currently required for the static build.

Do not set a deploy command such as `npx wrangler deploy`. That is a separate Workers deployment workflow and causes Wrangler to reconfigure this static Astro project as a Worker. Cloudflare Pages handles the upload of the `dist` directory after the build completes.

## Custom domain

In Cloudflare Pages, open the project’s **Custom domains** settings and add:

```text
adhdandarfid.com
www.adhdandarfid.com
```

Cloudflare will show the DNS records or nameserver steps needed for the domain. Complete those steps in the DNS zone for `adhdandarfid.com`, then wait for certificate issuance and DNS propagation.

The canonical site URL is configured as:

```text
https://adhdandarfid.com
```

## First deployment checks

After the first successful deployment, verify:

- `https://adhdandarfid.com/` loads the homepage.
- `https://adhdandarfid.com/contact/` shows the contact page and `contact@adhdandarfid.com`.
- `https://adhdandarfid.com/favicon.svg` loads.
- HTTP redirects to HTTPS.
- The `www` hostname redirects or behaves according to the Cloudflare Pages custom-domain setting you selected.
- Representative safety, resource, research, and printable routes load directly, not only through internal navigation.
- The browser shows no mixed-content or missing-asset errors.

## Deployment scope

This runbook covers the current static site. If the project later adds forms, analytics, search indexing, authentication, or server-side features, review the privacy, security, data-retention, and Cloudflare Worker/Functions requirements before enabling them. Do not add a contact form that collects child health information without a separate privacy and security review.
