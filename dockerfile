# --- 1) Rakennusvaihe ---
FROM node:20-alpine AS builder
WORKDIR /app

# Asenna riippuvuudet erikseen, jotta cache toimii
COPY package*.json ./
RUN npm ci

# Kopioi loput ja buildaa
COPY . .
# (varmista next.config.js: output: 'standalone')
RUN npm run build

# --- 2) Ajovaihe (pieni runtime) ---
FROM node:20-alpine AS runner
WORKDIR /app

# Turvallisuus: ei-root käyttäjä
RUN addgroup -S app && adduser -S app -G app
USER app

# Kopioi vain mitä ajossa tarvitaan
# standalone sisältää server.js:n ja minimal dependencies
COPY --chown=app:app --from=builder /app/.next/standalone ./
# Next tarvitsee public- ja .next/static -kansiot
COPY --chown=app:app --from=builder /app/public ./public
COPY --chown=app:app --from=builder /app/.next/static ./.next/static

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]