# Atria website

Static product, support and privacy site for `atria.kyokasuigetsu.xyz`.

The site is deployed as its own Vercel project so updates cannot change the Kyoka Suigetsu portfolio at the apex domain.

## Local preview

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173` from this directory.

## Content

- `index.html`: public product page
- `privacy/index.html`: App Store privacy-policy URL
- `support/index.html`: App Store support URL
- `content/app-store-copy.md`: canonical listing copy (excluded from deployment)
