import { esc } from "../layout.mjs";
import { contact } from "../config.mjs";
const ph = (v) => `<span class="ph">${esc(v)}</span>`;

const body = `
<section class="phero phero--flat" style="background:var(--ink)">
  <div class="phero__in" style="padding-bottom:clamp(2.4rem,5vw,4rem)">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Gestion des cookies</nav>
    <h1 style="font-size:clamp(2rem,1.4rem + 2.6vw,3.4rem)">Gestion des cookies</h1>
    <p class="phero__sub" style="font-size:var(--t-body)">Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="legal">
      <h2>1. En résumé</h2>
      <p><strong>Ce site ne dépose aucun cookie.</strong> Il n'utilise ni outil de mesure d'audience, ni traceur
      publicitaire, ni bouton de réseau social, ni service de chat, ni police de caractères chargée depuis un
      serveur tiers. Les polices, les images, la feuille de style et le script sont tous servis depuis le domaine
      du site lui-même.</p>
      <p>Par conséquent, aucun consentement préalable n'est requis au titre de l'article 82 de la loi n° 78-17 du
      6 janvier 1978 modifiée.</p>

      <h2>2. Le seul stockage utilisé</h2>
      <p>Le site utilise une unique entrée de stockage local (<code>localStorage</code>) de votre navigateur, afin
      de ne pas réafficher indéfiniment le bandeau d'information relatif aux cookies après que vous y avez
      répondu.</p>
      <dl>
        <dt>Nom de l'entrée</dt><dd><code>choix-cookies</code></dd>
        <dt>Valeur stockée</dt><dd><code>ok</code> ou <code>no</code>, selon le bouton utilisé</dd>
        <dt>Finalité</dt><dd>Mémoriser votre choix d'affichage du bandeau d'information</dd>
        <dt>Nature</dt><dd>Strictement nécessaire au fonctionnement de l'interface, exempté de consentement</dd>
        <dt>Portée</dt><dd>Locale à votre navigateur, sur ce domaine uniquement</dd>
        <dt>Transmission</dt><dd>Aucune. Cette valeur n'est jamais envoyée à un serveur</dd>
        <dt>Durée</dt><dd>Jusqu'à ce que vous effaciez les données de navigation de ce site</dd>
      </dl>
      <p>Cette entrée ne contient aucun identifiant, aucune donnée personnelle et ne permet pas de vous
      reconnaître d'un site à l'autre ni d'un appareil à l'autre.</p>

      <h2>3. Supprimer cette entrée</h2>
      <p>Vous pouvez la supprimer à tout moment en effaçant les données de site de votre navigateur :</p>
      <ul>
        <li><strong>Chrome ou Edge</strong> — Paramètres, Confidentialité et sécurité, Cookies et autres données de sites, Afficher toutes les données et autorisations de sites</li>
        <li><strong>Firefox</strong> — Paramètres, Vie privée et sécurité, Cookies et données de sites, Gérer les données</li>
        <li><strong>Safari</strong> — Réglages, Confidentialité, Gérer les données de sites web</li>
      </ul>
      <p>Le bandeau d'information réapparaîtra alors lors de votre prochaine visite. Aucune autre fonctionnalité
      du site n'en dépend.</p>

      <h2>4. Et si cela changeait ?</h2>
      <p>Si un outil de mesure d'audience ou un service tiers venait à être ajouté au site, cette page serait
      mise à jour en conséquence et un véritable dispositif de recueil du consentement — permettant d'accepter,
      de refuser et de retirer son choix avec la même facilité — serait mis en place avant tout dépôt de
      traceur.</p>

      <h2>5. Formulaire de demande de devis</h2>
      <p>Les informations que vous saisissez dans le formulaire ne sont pas stockées dans votre navigateur. Leur
      traitement est décrit dans la <a href="/politique-de-confidentialite/">politique de confidentialité</a>.</p>

      <h2>6. Nous contacter</h2>
      <p>Pour toute question relative à cette page, écrivez à ${ph(contact.emailLabel)} ou utilisez le
      <a href="/contact/">formulaire de contact</a>.</p>
    </div>
  </div>
</section>
`;

export default {
  path: "/gestion-des-cookies/",
  title: "Gestion des cookies | CleanVitreService",
  description: "Ce site ne dépose aucun cookie et n'utilise aucun traceur tiers. Détail de l'unique entrée de stockage local utilisée et modalités de suppression.",
  darkHeader: false,
  body,
};
