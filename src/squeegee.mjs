/* Raclette de vitrier — dessin vectoriel.
   Vue de face, à travers la vitre : la lame de caoutchouc est verticale
   (perpendiculaire au mouvement, qui est horizontal), le manche part vers
   la droite en léger relevé, comme le tient réellement un laveur de vitres.

   Repères du gabarit (viewBox 150 × 340) :
     x = 2    → arête de la lame, c'est elle qui définit la zone nettoyée ;
     y = 170  → milieu de la lame ;
     lame de y = 20 à y = 320, soit 300 unités de long.
   Le script d'intro se sert de ces trois nombres pour positionner l'outil.   */
export const squeegee = () => `
<svg viewBox="0 0 150 340" fill="none" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="vtRub" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#05070A"/><stop offset=".12" stop-color="#14181E"/>
      <stop offset=".46" stop-color="#39414C"/><stop offset=".72" stop-color="#232A33"/>
      <stop offset="1" stop-color="#11151A"/>
    </linearGradient>
    <linearGradient id="vtMet" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4E5964"/><stop offset=".14" stop-color="#9DAAB7"/>
      <stop offset=".3" stop-color="#E6EEF6"/><stop offset=".4" stop-color="#FBFDFF"/>
      <stop offset=".52" stop-color="#B6C3D0"/><stop offset=".7" stop-color="#7D8995"/>
      <stop offset=".86" stop-color="#C2CDD8"/><stop offset="1" stop-color="#55606B"/>
    </linearGradient>
    <linearGradient id="vtBack" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#55616E"/><stop offset=".45" stop-color="#303943"/>
      <stop offset="1" stop-color="#1A1F26"/>
    </linearGradient>
    <linearGradient id="vtCap" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2B323B"/><stop offset=".35" stop-color="#4B5663"/>
      <stop offset="1" stop-color="#171C22"/>
    </linearGradient>
    <linearGradient id="vtJoint" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F0F6FC"/><stop offset=".45" stop-color="#A3B0BE"/>
      <stop offset="1" stop-color="#626E7B"/>
    </linearGradient>
    <linearGradient id="vtGrip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#333C47"/><stop offset=".34" stop-color="#1A212A"/>
      <stop offset="1" stop-color="#090D12"/>
    </linearGradient>
    <linearGradient id="vtShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#030710" stop-opacity=".3"/>
      <stop offset=".45" stop-color="#030710" stop-opacity=".1"/>
      <stop offset="1" stop-color="#030710" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Ombre portée sur le verre, côté déjà nettoyé -->
  <rect x="45" y="22" width="78" height="296" fill="url(#vtShade)"/>

  <!-- Lame de caoutchouc : arête vive, corps souple éclairé par la gauche,
       léger épaulement là où le rail la pince. -->
  <path d="M2 24 L16 20 L16 320 L2 316 Z" fill="url(#vtRub)"/>
  <rect x="2" y="24" width="2.6" height="292" fill="#04060A"/>
  <rect x="6.4" y="25" width="1.6" height="290" fill="#5E6B7A" opacity=".3"/>
  <rect x="14.2" y="22" width="1.8" height="296" fill="#0A0D12" opacity=".8"/>

  <!-- Rail inox qui pince la lame -->
  <rect x="15.5" y="14" width="23" height="312" rx="2.4" fill="url(#vtMet)"/>
  <rect x="21.4" y="16" width="3.4" height="308" fill="#fff" opacity=".55"/>
  <rect x="16.6" y="14" width="1.1" height="312" fill="#434D58" opacity=".6"/>
  <rect x="35.4" y="14" width="1.4" height="312" fill="#39424C" opacity=".5"/>

  <!-- Dos du rail -->
  <rect x="38" y="18" width="9" height="304" rx="2.2" fill="url(#vtBack)"/>
  <rect x="38" y="18" width="1.6" height="304" fill="#6E7B89" opacity=".45"/>

  <!-- Embouts : clips plastique qui retiennent la lame -->
  <rect x="12" y="7" width="37" height="14" rx="3.6" fill="url(#vtCap)"/>
  <rect x="12" y="319" width="37" height="14" rx="3.6" fill="url(#vtCap)"/>
  <rect x="14" y="9.6" width="33" height="2.2" rx="1.1" fill="#7E8A97" opacity=".5"/>
  <rect x="14" y="327" width="33" height="2.2" rx="1.1" fill="#7E8A97" opacity=".5"/>

  <!-- Articulation + manche, relevés de 14° comme en usage réel -->
  <g transform="rotate(-14 48 170)">
    <rect x="42" y="150" width="20" height="40" rx="5" fill="#242B34"/>
    <rect x="42" y="150" width="20" height="3" rx="1.5" fill="#4C5765" opacity=".6"/>
    <circle cx="62" cy="170" r="11.5" fill="url(#vtJoint)"/>
    <circle cx="62" cy="170" r="4" fill="#2A323B"/>
    <circle cx="62" cy="170" r="11.5" stroke="#5C6773" stroke-width=".8" opacity=".6"/>
    <rect x="70" y="161" width="15" height="18" rx="3.6" fill="url(#vtMet)"/>
    <rect x="83" y="150" width="58" height="40" rx="18" fill="url(#vtGrip)"/>
    <rect x="88" y="153" width="46" height="4.4" rx="2.2" fill="#66748A" opacity=".38"/>
    <g fill="#05080C" opacity=".55">
      <rect x="96" y="157" width="2.8" height="27" rx="1.4"/>
      <rect x="105" y="157" width="2.8" height="27" rx="1.4"/>
      <rect x="114" y="157" width="2.8" height="27" rx="1.4"/>
      <rect x="123" y="157" width="2.8" height="27" rx="1.4"/>
    </g>
    <rect x="135" y="159" width="8" height="22" rx="4" fill="#1668DC"/>
  </g>
</svg>`;
