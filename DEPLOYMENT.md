# Déploiement Vercel

Importez le dossier ou le dépôt `neuro-sploit-vercel` dans Vercel. Vercel détecte automatiquement Next.js et utilise les Route Handlers sous `app/api/` comme fonctions serverless.

Ajoutez les variables suivantes pour les environnements **Preview** et **Production** :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clé Clerk publique utilisée par les composants web. |
| `CLERK_SECRET_KEY` | Clé Clerk privée utilisée uniquement par les Route Handlers et le middleware. |
| `GROQ_API_KEY` | Clé privée utilisée uniquement par `/api/chat`. |
| `ADMIN_USER_ID` | Identifiant Clerk du compte qui peut ouvrir `/admin`. |
| `SUPABASE_URL` | URL du projet Supabase, nécessaire à la journalisation d’usage. |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé privée Supabase utilisée exclusivement par les Route Handlers. |

Avant d’activer Supabase, exécutez le contenu de `supabase.sql` dans l’éditeur SQL du projet Supabase. Sans les deux variables Supabase, le chat et Clerk restent opérationnels ; l’interface d’administration affiche alors les comptes Clerk, mais les métriques de messages sont indiquées comme indisponibles.

Dans le tableau de bord Clerk, ajoutez les domaines Vercel autorisés dans les réglages de l’instance. Après le premier déploiement, créez un compte depuis le bouton **Créer un compte**, récupérez son identifiant Clerk et définissez-le comme `ADMIN_USER_ID` dans Vercel.
