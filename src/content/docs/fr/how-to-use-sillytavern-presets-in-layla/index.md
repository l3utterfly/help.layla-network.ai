---
title: Comment utiliser les presets SillyTavern dans Layla
description: Importez un preset de chat completion SillyTavern dans Layla, comprenez les informations de la fiche du preset et associez-le à vos personnages pour du roleplay IA hors ligne sur Android.
category: Characters & voice
order: 45
keywords:
  - presets SillyTavern
  - SillyTavern sur Android
  - import de preset SillyTavern
  - preset du gestionnaire d'invites
  - roleplay IA hors ligne
  - invites de personnages IA
  - IA hors ligne pour Android
  - chat IA sans censure
lastUpdated: 2026-09-03
translationKey: how-to-use-sillytavern-presets-in-layla
ai_translated: true
---

**Un preset SillyTavern est un fichier JSON qui définit les invites envoyées à un modèle, leur ordre d'envoi et celles qui sont activées. Layla peut importer ces fichiers et les utiliser pour construire l'invite de n'importe quel personnage auquel vous les associez.** Tout se déroule sur votre appareil ; importer un preset ne l'envoie nulle part.

Ce guide couvre l'installation de la mini-application Presets SillyTavern, l'export d'un preset depuis SillyTavern, son import dans Layla, la lecture des informations d'une fiche de preset, l'association des presets aux personnages, ainsi que les parties d'un preset que Layla n'exécute délibérément pas.

## Ce que contient réellement un preset SillyTavern

Dans SillyTavern, un preset de chat completion se gère depuis le gestionnaire d'invites (Prompt Manager). Il contient une liste d'invites nommées — invite principale, description du personnage, personnalité, scénario, description du persona, exemples de dialogue, historique de conversation, instructions post-historique et toute invite personnalisée ajoutée par l'auteur — ainsi qu'une liste d'ordre des invites qui indique lesquelles sont activées et dans quelle séquence elles interviennent.

Les auteurs de presets s'en servent pour construire des systèmes d'invites élaborés : piles d'instructions en plusieurs parties, règles de mise en forme, invites injectées à une profondeur fixe dans la conversation et invites qui ne se déclenchent que pour certains types de génération. Lorsque quelqu'un partage un « preset » pour le roleplay, c'est ce fichier qu'il partage.

Deux points méritent d'être connus avant d'en importer un :

- Layla lit les **presets de chat completion** — les fichiers qui contiennent une liste d'invites et une liste d'ordre des invites. Les presets de text completion, qui ne portent que des valeurs d'échantillonnage, constituent un format différent et seront refusés à l'import.
- Un preset concerne la **construction de l'invite**, pas le modèle. Il ne télécharge pas de modèle et ne change pas celui que vous utilisez. Consultez [comment ajouter un modèle d'IA personnalisé à Layla](/how-to-add-custom-models-to-layla/) si vous souhaitez également changer de modèle.

## Installer la mini-application Presets SillyTavern

La gestion des presets est une mini-application Layla optionnelle.

1. Ouvrez **Mes applications** dans Layla, ou appuyez sur **Ajouter des mini-applications** sur le premier écran.
2. Appuyez sur le signe plus pour parcourir les mini-applications disponibles.
3. Trouvez **Presets SillyTavern** et ajoutez-la.
4. Ouvrez **Presets SillyTavern** depuis **Mes applications**.

Il n'y a rien à télécharger pour cette mini-application : elle est donc disponible immédiatement. Pour en savoir plus sur l'ajout et la suppression de fonctionnalités, consultez [comment ajouter des fonctionnalités (mini-applications) dans Layla](/how-to-add-features-mini-apps-in-layla/).

## Exporter un preset depuis SillyTavern

Si vous possédez déjà le fichier `.json` — publié par son auteur ou transmis par un ami — vous pouvez sauter cette section.

Pour exporter depuis votre propre installation de SillyTavern, ouvrez le panneau **AI Response Configuration** (l'icône de curseurs dans la barre supérieure), repérez la liste déroulante **Chat Completion Presets** en haut, sélectionnez le preset souhaité et utilisez le bouton d'export à côté de la liste. SillyTavern l'enregistre sous forme de fichier `.json`.

Vous pouvez aussi copier le fichier directement depuis le dossier de données de SillyTavern. Les presets de chat completion se trouvent dans `data/<votre-identifiant-utilisateur>/OpenAI Settings/`.

Transférez le fichier sur votre téléphone par la méthode qui vous convient : câble, stockage cloud, message que vous vous envoyez. Layla a seulement besoin que le fichier soit accessible depuis le sélecteur de fichiers Android.

## Importer le preset dans Layla

1. Ouvrez la mini-application **Presets SillyTavern**.
2. Appuyez sur **Importer un preset**.
3. Choisissez le fichier `.json` sur votre appareil.

Layla valide le fichier avant de l'enregistrer. Il doit se terminer par `.json`, être du JSON valide et contenir à la fois une liste d'invites et une liste d'ordre des invites non vide. Si l'un de ces éléments manque, Layla affiche une erreur nommant le problème — par exemple que le preset n'est pas du JSON valide, ou qu'une entrée d'invite n'a pas d'identifiant — et rien n'est importé.

Si vous importez un preset dont le nom de fichier existe déjà, Layla conserve les deux et ajoute un numéro au nouveau plutôt que d'écraser votre fichier existant. Les presets sont listés du plus récemment modifié au plus ancien, et vous pouvez tirer la liste vers le bas pour l'actualiser.

## Lire la fiche du preset

Chaque preset importé reçoit une fiche. Le grand nom est le nom interne du preset ; la ligne plus petite en dessous est le nom de fichier sous lequel Layla l'a enregistré. La fiche mérite d'être lue, car les presets varient énormément et c'est ainsi que vous saurez d'un coup d'œil ce que vous venez d'importer.

Les trois chiffres de synthèse sont :

- **Invites activées** — combien d'invites du preset sont activées, sur le total. Un preset comptant 40 invites dont 12 activées est normal ; l'auteur a désactivé le reste.
- **Système / utilisateur / assistant** — la répartition des invites activées entre les trois rôles de message.
- **Taille du fichier** — utile surtout pour repérer un preset anormalement volumineux.

En dessous, Layla affiche des étiquettes correspondant à ce que le preset spécifie : les limites de jetons de contexte et de sortie, la température, le nombre d'invites activées qui sont des marqueurs, le nombre d'injections en profondeur, le nombre de paramètres d'invites utilitaires renseignés et le nombre de scripts regex contenus dans le fichier. Certaines étiquettes sont mises en avant comme des avertissements plutôt que comme de simples informations :

- **Remplacement de l'invite principale** — le preset remplace l'invite système principale par son propre texte.
- **Invites système personnalisées** — le preset ajoute ses propres invites de rôle système.
- **Invites système désactivées** — le preset a entièrement désactivé les invites système.
- **Jailbreak activé** — l'invite d'instructions post-historique du preset contient du texte. Dans SillyTavern, cette invite est traditionnellement appelée « jailbreak » ; il s'agit simplement du dernier bloc d'instructions avant la génération.

Si Layla a relevé quelque chose de discutable à la lecture du fichier, un badge **avertissements** apparaît à côté du badge de preset JSON. Appuyez dessus pour afficher le détail. Les avertissements les plus courants signalent que le preset utilise un ordre d'invites ancien ou non standard, ou qu'il contient une extension que Layla enregistre sans l'exécuter. Les avertissements sont informatifs — le preset fonctionne quand même — mais ils vous indiquent quelles parties de l'intention de l'auteur ne survivront pas au passage.

## Associer un preset à vos personnages

Un preset ne fait rien tant qu'un personnage ne l'utilise pas. Il existe deux façons d'établir ce lien.

**Depuis la fiche du preset.** Appuyez sur **Personnages associés** en bas de la fiche, sélectionnez les personnages qui doivent utiliser ce preset, puis fermez le sélecteur avec le **X** ou en appuyant à l'extérieur. Votre sélection est enregistrée à la fermeture.

**Depuis l'éditeur de personnage.** Ouvrez un personnage en modification, allez dans l'onglet **Avancé** et, sous **Presets et connaissances**, appuyez sur **Preset SillyTavern**. Choisissez un preset dans la liste et enregistrez le personnage.

Deux règles découlent de ce mode de stockage :

- Un personnage peut utiliser **un seul preset à la fois**. Associer un personnage à un second preset le dissocie du premier.
- Seuls les personnages **que vous avez créés ou importés** peuvent être associés. Les personnages intégrés par défaut de Layla n'apparaissent pas dans le sélecteur. Si vous souhaitez utiliser un preset avec une personnalité intégrée, copiez-la d'abord dans un personnage personnalisé — consultez [comment créer un personnage IA personnalisé dans Layla](/how-do-i-create-custom-characters/) et [comment importer des personnages TavernPNG dans Layla](/how-to-import-tavernpng-characters-in-layla/).

Une fois qu'un personnage est associé à un preset, Layla construit l'invite de ce personnage à partir du preset chaque fois que vous discutez avec lui. Les invites activées sont assemblées dans l'ordre du preset, les invites marqueurs sont remplies avec la description, la personnalité, le scénario, les exemples de dialogue du personnage et la description de votre persona, l'historique de conversation est placé là où le preset le prévoit, et les invites injectées en profondeur sont insérées à la profondeur configurée dans la conversation. Les macros sont évaluées comme dans SillyTavern, notamment `{{char}}`, `{{user}}`, `{{persona}}`, `{{description}}`, `{{personality}}`, `{{scenario}}` et `{{lastmessage}}`, les macros de date et d'heure, les tirages de dés et sélections aléatoires, ainsi que les macros de variables locales et globales. Une macro que Layla ne reconnaît pas est laissée telle quelle plutôt que supprimée silencieusement.

## Ce qu'un preset ne change pas

Les presets sont des fichiers d'invites, et Layla en exécute fidèlement la partie « invites ». Certains éléments du fichier sont enregistrés et affichés, mais pas appliqués :

- **Paramètres d'échantillonnage et de contexte.** La température, la limite de contexte et la limite de jetons de sortie affichées sur la fiche décrivent ce que demande le preset. Ce sont les paramètres d'inférence de Layla qui régissent la génération. Modifiez-les plutôt dans les paramètres de votre moteur d'inférence — consultez [comment fonctionnent les moteurs d'inférence enregistrés dans Layla](/how-saved-inference-engines-work-in-layla/).
- **Scripts regex et données d'extension.** Layla les compte et les conserve dans le fichier, mais ne les exécute pas.
- **Placement des informations d'univers.** Les marqueurs d'informations d'univers du preset sont reconnus, mais Layla n'y injecte pas encore le texte des lorebooks.
- **Le modèle d'invite du modèle.** Le preset décide du contenu et de l'ordre des messages ; le modèle de conversation qui les encadre appartient au modèle. Consultez [comment configurer des modèles d'invite personnalisés pour les modèles](/how-to-set-up-custom-prompt-templates-for-models/).

Rien de tout cela n'empêche un preset de fonctionner. Cela signifie en revanche qu'un preset conçu autour des particularités d'un modèle cloud précis peut se comporter différemment sur un modèle local, ce qu'il est utile de garder à l'esprit lorsqu'un preset encensé par d'autres vous semble étrange.

## Gérer et supprimer les presets

Appuyez sur l'icône de corbeille d'une fiche pour supprimer un preset ; Layla demande d'abord confirmation. Supprimer un preset retire le fichier de votre appareil. Les personnages qui y étaient associés cessent d'utiliser un preset et reviennent à la construction d'invite habituelle de Layla.

Comme les presets sont des fichiers ordinaires, conserver le `.json` d'origine en dehors de Layla est une habitude raisonnable si vous l'avez modifié, ou s'il provient d'une source que vous ne retrouverez peut-être pas.

## Questions fréquentes

### Puis-je utiliser les presets SillyTavern hors ligne ?

Oui. L'import, le stockage et l'application d'un preset se font tous sur votre appareil. Si vous utilisez un modèle GGUF local, l'ensemble de la conversation — preset inclus — fonctionne sans connexion internet.

### Pourquoi mon preset a-t-il été refusé à l'import ?

La raison la plus fréquente est que le fichier est un preset de text completion ou une sauvegarde de paramètres plutôt qu'un preset de chat completion. Layla exige à la fois une liste d'invites et une liste d'ordre des invites. Un fichier JSON malformé ou tronqué sera lui aussi refusé, et le message d'erreur nomme le problème précis.

### Importer un preset écrase-t-il la personnalité de mon personnage ?

Non. La description, la personnalité et le scénario du personnage restent les vôtres ; le preset décide comment et dans quel ordre ils sont présentés au modèle. Un preset qui remplace l'invite principale modifie l'instruction qui entoure votre personnage, pas le personnage lui-même.

### Deux personnages peuvent-ils partager le même preset ?

Oui. Associez autant de personnages que vous le souhaitez à un même preset. L'inverse n'est pas vrai : chaque personnage utilise un seul preset.

### Que signifie le numéro d'ordre sur la fiche ?

C'est l'identifiant du bloc d'ordre des invites que Layla a sélectionné dans le fichier. `100001` est la valeur par défaut actuelle de SillyTavern. Si votre preset ne contient qu'un ancien bloc `100000`, ou un bloc non standard, Layla l'utilise et émet un avertissement pour que vous sachiez quel ordre a été suivi.

### Ai-je besoin d'une installation de SillyTavern pour utiliser les presets dans Layla ?

Non. Vous n'avez besoin que du fichier `.json`. De nombreux auteurs de presets publient directement leurs fichiers, et Layla les importe sans que SillyTavern intervienne à aucun moment.

Les presets illustrent la manière dont Layla parle les formats de l'écosystème IA local au sens large : modèles GGUF, cartes de personnages TavernPNG et presets SillyTavern s'importent tous dans une application Android qui fonctionne hors ligne, sans abonnement ni compte.
