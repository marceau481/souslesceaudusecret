GUIDE — Publication sans code (Netlify + Admin)

A) Mise en place (une seule fois)
1) Mets ce dossier sur GitHub (repo public ou privé).
   - Option facile: sur Netlify → Add new site → Import from Git
2) Sur Netlify → Site settings → Identity → Enable Identity
3) Identity → Registration → Invite only (recommandé)
4) Identity → Services → Enable Git Gateway
5) Va sur https://TON-SITE.netlify.app/admin
6) Clique "Login with Netlify Identity"
7) Invite les membres:
   Netlify → Identity → Invite users → mets leurs emails

B) Publier un nouveau numéro (sans code)
1) Va sur /admin
2) "Contenu du site" → "Numéros (PDF + couvertures)" → "New entry" dans "Numéros"
3) Remplis:
   - Numéro (ex: 13)
   - Slug (ex: n13) (unique)
   - Titre/Thème
   - Mois
   - Upload couverture
   - Upload PDF
   - (optionnel) exergue, définition, extrait, sommaire
4) IMPORTANT: mets le nouveau numéro en PREMIER dans la liste (drag & drop dans l'admin)
5) Clique "Publish" / "Publish now"

C) Où vont les fichiers ?
- Les images/PDF uploadés sont stockés dans assets/uploads/
- Les données sont dans content/issues.json (géré automatiquement par l'admin)

D) Déploiement Netlify
- Si tu utilises "Import from Git": chaque publication déclenche un build, et le site se met à jour.
- Si tu faisais "drag & drop" sans Git, l'admin ne pourra pas écrire: il faut Git + Git Gateway.

