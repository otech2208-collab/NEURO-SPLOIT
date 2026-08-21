# NEURO-SPLOIT — Next.js / Vercel Serverless

Cette version web utilise Next.js App Router, Clerk pour les sessions et Groq exclusivement dans la route serveur `/api/chat`. Les clés `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` et `GROQ_API_KEY` doivent être ajoutées dans les variables d’environnement Vercel avant le déploiement. Pour journaliser l’usage et activer les métriques de messages, créer la table décrite dans `supabase.sql`, puis renseigner `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`.

Le tableau `/admin` est contrôlé côté serveur par la variable `ADMIN_USER_ID`, qui doit contenir l’identifiant Clerk du compte administrateur. Lancez `npm install`, puis `npm run dev` pour le développement et `npm run build` pour vérifier la production.
