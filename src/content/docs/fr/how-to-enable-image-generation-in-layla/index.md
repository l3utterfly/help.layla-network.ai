---
title: Activer la génération d'images par IA hors ligne dans Layla
description: Installez Local Dream pour générer des images hors ligne sur Android et iPhone. Découvrez les modèles, imports, paramètres et images de personnages dans Layla.
category: Image generation
order: 10
keywords:
  - génération d'images hors ligne
  - générateur d'images IA Android
  - Stable Diffusion
  - modèles Civitai
  - importer safetensors
  - modèles d'images GGUF
  - LoRA
  - Snapdragon NPU
  - Local Dream
  - NPU Forge
  - génération texte-image
  - génération image-image
  - images de personnages
  - Stable Diffusion sur iPhone
  - Layla
lastUpdated: 2026-11-04
translationKey: how-to-enable-image-generation-in-layla
ai_translated: true
---

**Layla permet de générer des images par IA hors ligne sur Android et iPhone. Installez la mini-application Local Dream pour exécuter Stable Diffusion, SDXL, FLUX, Z-Image et d'autres modèles texte-image directement sur votre téléphone, sans connexion Internet ni compte.** Vos invites et vos images restent sur l'appareil ; aucun service en ligne n'examine ce que vous générez.

Cet article présente la génération d'images dans Layla : installation de Local Dream, choix d'un modèle, importation de vos modèles, familles disponibles, paramètres de génération et choix du modèle utilisé par Layla et vos personnages dans le chat. Chaque section renvoie à un guide détaillé lorsqu'il en existe un.

## Pourquoi générer des images par IA sur votre téléphone avec Layla

- **Hors ligne.** Après avoir téléchargé un modèle, vous pouvez exécuter Stable Diffusion localement sans Internet, même en mode avion.
- **Confidentialité.** Les invites et images ne sont envoyées à aucun serveur : aucun compte, téléversement ou contrôle en ligne.
- **Sans crédits ni paiement par image.** Aucune limite quotidienne pour la génération locale : seuls le stockage et la vitesse de votre téléphone vous limitent.
- **Choix du modèle.** Utilisez les modèles intégrés, des petits SD 1.5 à FLUX.2 Klein et Z-Image Turbo, ou importez vos checkpoints et LoRA depuis [Civitai](https://civitai.com/).
- **Accélération matérielle.** Sur les téléphones Snapdragon compatibles, le NPU est généralement bien plus rapide que le CPU.
- **Intégration au chat.** Vos personnages peuvent envoyer des images pendant la conversation avec le modèle que vous leur attribuez.

## Trois façons de générer des images par IA dans Layla

| Méthode                 | Lieu de génération           | Connexion nécessaire                 | Coût                                                 |
| ----------------------- | ---------------------------- | ------------------------------------ | ---------------------------------------------------- |
| Sur l'appareil          | CPU, GPU ou NPU du téléphone | Seulement pour télécharger un modèle | Aucun coût par image                                 |
| Layla Cloud             | Serveurs de Layla            | Internet et connexion à Layla Cloud  | Quota mensuel selon votre formule                    |
| Stable Diffusion Web UI | PC sur votre réseau          | Réseau local                         | Aucun coût par image ; vous faites fonctionner le PC |

Cet article traite surtout de la première méthode, qui conserve entièrement vos invites et images sur votre téléphone. Le guide [Passer d'un LLM local à Layla Cloud](/fr/how-to-switch-between-local-llm-and-layla-cloud/) explique comment alterner entre les modèles locaux et Layla Cloud.

## Installer Local Dream, la mini-application de génération d'images hors ligne

Local Dream assure la génération sur l'appareil. Cette fonctionnalité facultative n'est pas installée par défaut.

1. Ouvrez l'écran des mini-applications de Layla (**Browse Apps**) et cherchez **Local Dream**. Consultez [Activer ou désactiver les mini-applications](/fr/how-to-enable-disable-mini-apps-within-layla/) pour trouver cet écran.
2. Appuyez sur la fiche et lisez la description. Le téléchargement supplémentaire indiqué est d'environ 54 Mo, bien plus petit qu'un modèle.
3. Appuyez sur **Download**.
4. Ouvrez la mini-application. Son en-tête indique _On-device image generation_.

![Fiche Local Dream dans Browse Apps, avec sa description, un téléchargement supplémentaire de 54 Mo et le bouton Download.](../../how-to-enable-image-generation-in-layla/install-local-dream-mini-app-layla.jpg)

Lorsqu'une mise à jour de Layla apporte un nouveau moteur, la mini-application indique qu'elle doit être mise à jour. Faites-le depuis l'écran des mini-applications avant de générer ou d'importer.

Désinstaller Local Dream supprime tous les modèles d'images qu'elle contient, y compris vos imports. Layla vous demande d'abord confirmation.

## Choisir et télécharger un modèle d'images par IA

En haut de Local Dream, appuyez sur la carte du modèle ou sa flèche pour ouvrir la liste **Select Model**.

![Liste Select Model de Local Dream avec recherche, filtres Downloaded, CPU, NPU et Cloud, filtre Tags et cartes SD1.5 Base et DreamShaper.](../../how-to-enable-image-generation-in-layla/select-image-generation-model-local-dream.jpg)

- **Search** recherche un modèle par nom.
- Les **filtres** limitent la liste aux modèles **Downloaded**, **CPU**, **NPU** ou **Cloud**. **Tags** filtre par style, par exemple _realistic_, _anime_ ou _sdxl_.
- Chaque carte affiche une icône de téléchargement, remplacée par une coche après téléchargement. Un badge indique CPU, NPU ou cloud.

Choisissez un modèle et appuyez sur **Download Model**. Les fichiers vont d'environ 1 Go pour SD 1.5 à bien plus de 10 Go pour les plus grands modèles NPU : utilisez le Wi-Fi et vérifiez l'espace disponible. Le modèle reste sur votre téléphone ; **Delete Model** permet de récupérer cet espace à tout moment.

Layla lit les informations de votre puce. Si le matériel requis par un modèle n'est pas détecté, un avertissement apparaît au-dessus de **Generate**. Il est indicatif : vous pouvez tout de même essayer le modèle.

## Importer des modèles Stable Diffusion personnalisés depuis Civitai

Si les modèles intégrés ne proposent pas le style souhaité, importez les vôtres. Deux chemins ouvrent le même écran **Add Image Model** :

- Dans Local Dream, appuyez sur **Add Model** en haut de l'écran.
- Ouvrez **Settings** → **Inference Settings**, descendez jusqu'à **Image Generation** et appuyez sur **Add Custom Model**.

![Écran Add Image Model avec les onglets Safetensor, Zip et Web UI, SD1.5 comme Base Model et le sélecteur de checkpoint safetensors ou GGUF.](../../how-to-enable-image-generation-in-layla/import-custom-image-model-safetensor-layla.jpg)

L'écran propose jusqu'à trois onglets :

- **Safetensor** : choisissez un checkpoint `.safetensors`, par exemple sur [Civitai](https://civitai.com/) ou [Hugging Face](https://huggingface.co/), pour le convertir sur le téléphone. Android accepte aussi les modèles de diffusion `.gguf`. Choisissez la famille de base du checkpoint et ajoutez éventuellement des LoRA.
- **Zip** : importez un modèle déjà converti et empaqueté pour Layla.
- **Web UI** : connectez une interface AUTOMATIC1111 Stable Diffusion Web UI sur votre PC en renseignant l'adresse de son API.

Sur iPhone, l'onglet Safetensor n'accepte que les checkpoints SD 1.5. Sur les téléphones dotés d'un NPU Qualcomm compatible, il suggère aussi une conversion pour accélérer la génération.

Consultez [Importer des modèles d'images personnalisés](/fr/how-to-import-custom-image-generation-models-into-layla/) pour le guide complet et [Importer des modèles SD 1.5 depuis Civitai](/fr/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/) pour un exemple illustré. Avec une puce Snapdragon compatible, [NPU Forge](/fr/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/) convertit les checkpoints SD 1.5 et SDXL pour le NPU plutôt que le CPU.

## Modèles d'images compatibles : Stable Diffusion, SDXL, FLUX, Z-Image et autres

Layla classe les modèles selon le matériel qui les exécute. Le badge de chaque carte indique ce groupe.

| Type                                     | Exemples intégrés                                                                               | Exécution           | Plateformes                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------- |
| SD 1.5 (CPU)                             | SD1.5 Base, DreamShaper, RealCartoon, Pastel-Mix                                                | CPU, GPU facultatif | Android et iOS                      |
| SD 1.5 (NPU)                             | CyberRealistic, Realistic Vision Hyper, Reliberate, ToonYou                                     | NPU Snapdragon      | Android                             |
| SDXL (CPU)                               | SDXL Turbo, AnimeMix XL, IntoRealism                                                            | CPU                 | Android ; IntoRealism aussi sur iOS |
| SDXL (NPU)                               | Pony Realism V23, Illustrious V17, Nova Anime XL V10                                            | NPU Snapdragon      | Android                             |
| Transformeurs de diffusion récents (NPU) | Z-Image Turbo, FLUX.2 Klein 4B et 9B, Qwen Image 2.1, Krea 2 Turbo, MOSS-Image, IntoRealism ZIT | NPU Snapdragon      | Android                             |
| FLUX et Z-Image compacts (locaux)        | Bonsai Image 4B, FLUX.2 klein 4B, Z-Image Turbo 6B                                              | CPU ou GPU          | Android et iOS                      |
| Core ML                                  | Realistic Vision Hyper, Deliberate v2                                                           | Matériel Apple      | iOS                                 |
| Layla Cloud                              | FLUX.1[dev], BrainDance, CyberRealisticXL, iNiverse Mix                                         | Serveurs de Layla   | Android et iOS                      |
| Web UI                                   | Tout modèle fourni par votre Web UI                                                             | Votre PC            | Android et iOS                      |

En pratique :

- **SD 1.5** ([Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5) est la famille la plus ancienne et légère, et la plus répandue sur Civitai. Elle génère en 512 x 512 sur la plupart des téléphones récents.
- **SDXL** produit des images plus détaillées en 1024 x 1024 et demande plus de mémoire. Ses modèles NPU nécessitent un Snapdragon 8 Elite ou ultérieur.
- Les **transformeurs de diffusion récents** (Z-Image, FLUX.2 Klein, Qwen Image, Krea, MOSS-Image) offrent la meilleure qualité de la liste. Volumineux, ils utilisent le NPU d'un Snapdragon 8 Elite ou ultérieur, acceptent jusqu'à 2048 x 2048 et plusieurs permettent de retoucher des images.
- Les **FLUX et Z-Image compacts** utilisent un autre moteur local sur les deux plateformes. Leurs résolutions sont petites et fixes ; les plus grands occupent plusieurs gigaoctets et sont lents.
- **Layla Cloud** ne nécessite aucun téléchargement. Connectez-vous à votre compte ; chaque formule comprend un quota mensuel de générations cloud.

Le NPU (unité de traitement neuronal) est l'accélérateur d'IA des puces Qualcomm Snapdragon. Généralement bien plus rapide que le CPU pour un même modèle, il explique l'existence des variantes NPU et d'outils comme NPU Forge pour convertir vos modèles.

## Paramètres de génération : invite, étapes, CFG et graine

Les commandes sous la carte du modèle dans Local Dream règlent la génération. Les options affichées dépendent du modèle : tous ne prennent pas tout en charge.

![Paramètres de Local Dream : Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale, Advanced Settings et Generate.](../../how-to-enable-image-generation-in-layla/local-dream-image-generation-settings.jpg)

| Paramètre                         | Rôle                                                          | Remarques                                                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt**                        | Décrit l'image souhaitée.                                     | Le bouton étoile rédige une invite à partir de mots-clés avec votre modèle de chat. Le second condense les longues invites et nécessite la mini-application Long-term Memory. |
| **Negative prompt**               | Décrit ce qu'il faut éviter.                                  | Masqué si ignoré par le modèle. Sur les transformeurs récents, agit seulement au-dessus de CFG 1.                                                                             |
| **Size**                          | Largeur et hauteur.                                           | Plusieurs tailles carrées pour SD 1.5 CPU ; jusqu'à 2048 x 2048 pour les nouveaux NPU. Certains modèles ont une taille fixe.                                                  |
| **Steps**                         | Nombre d'étapes de débruitage.                                | Plus d'étapes prennent plus de temps. Les modèles turbo et distillés visent 4 à 9 étapes.                                                                                     |
| **CFG Scale**                     | Fidélité à l'invite.                                          | Chaque modèle intégré a une valeur par défaut adaptée. Beaucoup de modèles récents sont réglés pour 1.                                                                        |
| **Seed**                          | Point de départ aléatoire.                                    | -1 choisit une graine aléatoire à chaque génération. Le résultat affiche sa graine pour reproduire l'image.                                                                   |
| **Scheduler**                     | Échantillonneur, par exemple DPM++ 2M Karras, Euler A ou LCM. | Affiché pour SD 1.5 et SDXL ; les modèles récents utilisent le leur.                                                                                                          |
| **Source image**                  | Part d'une image plutôt que du bruit (image-image).           | Disponible sur SD 1.5 CPU/NPU, SDXL NPU et les nouveaux NPU. Après sélection, peignez un masque pour refaire une zone et réglez **Denoise Strength**.                         |
| **Reference images**              | Jusqu'à trois images pour guider une retouche.                | Modèles FLUX.2 Klein et Qwen Image.                                                                                                                                           |
| **Show Preview While Generating** | Aperçu approximatif à chaque étape.                           | Pas disponible partout.                                                                                                                                                       |
| **Auto Upscale**                  | Agrandit les images terminées.                                | Choisissez le modèle d'agrandissement, l'utilisation d'OpenCL sur le GPU et la taille des tuiles. De petites tuiles consomment moins de mémoire.                              |

Dans **Advanced Settings** :

- **Prompt prefix** ajoute du texte avant chaque invite, utile pour un style ou un tag de qualité récurrent.
- **Use GPU** utilise le GPU sur les modèles compatibles. Layla avertit les appareils de moins de 12 Go de RAM, car la mémoire peut manquer.
- **Reset All Settings** rétablit les valeurs par défaut du modèle sélectionné.

Appuyez sur **Generate**. Pendant la génération, **Stop generating** permet de l'arrêter. Les images terminées apparaissent dans la galerie.

## Choisir le modèle dans Inference Settings

Local Dream sert à générer manuellement. Pour que Layla et vos personnages génèrent pendant le chat, choisissez un modèle dans **Inference Settings**.

1. Ouvrez **Settings** → **Inference Settings**, puis **Image Generation**.
2. La carte sous **Add Custom Model** affiche le modèle actuel. Ses flèches ouvrent la même liste **Select Model**.
3. Choisissez un modèle ou **No Image Generation** pour désactiver la fonction.

![Section Image Generation d'Inference Settings avec Add Custom Model, iNiverse Mix de Layla Cloud sélectionné et le bouton de changement.](../../how-to-enable-image-generation-in-layla/inference-settings-image-generation-model-layla.jpg)

Ce modèle s'applique aux personnages sans choix individuel. Téléchargez les modèles locaux dans Local Dream avant de les utiliser. Les modèles Layla Cloud et Web UI sont prêts une fois connecté. Pour modifier une connexion Web UI, ouvrez la liste et appuyez sur le crayon de sa carte.

## Configurer la génération pour chaque personnage

Le modèle d'Inference Settings n'est qu'une valeur par défaut. Chaque personnage personnalisé peut avoir son modèle et ses règles d'envoi, pour recevoir des images pendant le chat ou choisir un style anime pour l'un et photoréaliste pour l'autre.

1. Créez ou modifiez un personnage. Le guide [Créer des personnages personnalisés](/fr/how-do-i-create-custom-characters/) décrit l'éditeur.
2. Dans **Advanced**, cherchez **Image generation** sous **OUTPUT**. Le modèle actuel ou _No image generation_ y apparaît.
3. Appuyez pour ouvrir **Select Model** et choisissez un modèle. **No Image Generation** désactive la génération pour ce personnage.
4. Réglez les options ci-dessous, puis appuyez sur **Save**.

![Onglet Advanced de l'éditeur de personnage avec RealCartoon, les options d'envoi aléatoire et d'image de profil, et Fallback phrase.](../../how-to-enable-image-generation-in-layla/character-image-generation-settings-layla.jpg)

Lorsqu'un personnage a un modèle d'images, trois options apparaissent :

- **Send images randomly** : le personnage peut envoyer une image spontanément. Désactivé par défaut.
- **Generate Images based on your character's profile image** : utilise toujours son image de profil comme point de départ image-image pour préserver son apparence. Nécessite un modèle compatible, indiqué dans le tableau des paramètres.
- **Fallback phrase** : liste de phrases séparées par des virgules, par exemple _envoie-moi une photo_ ou _génère une image_. Si votre message en contient une, le personnage propose une image. Layla comprend aussi les demandes ordinaires de photos, images ou selfies ; ajoutez ici vos formulations personnelles, dans la langue souhaitée.

Vous pouvez refuser une image proposée. Une correspondance involontaire ne vous coûte donc que de fermer la proposition.

À retenir :

- Téléchargez d'abord le modèle dans Local Dream. Un modèle absent du téléphone ne peut pas générer.
- Un personnage utilisant Layla Cloud nécessite une connexion au compte. Chaque image utilise le quota mensuel de votre formule.
- Sans modèle individuel, le personnage utilise celui d'Inference Settings.

## Autres façons de générer dans Layla

Les agents peuvent aussi générer des images, notamment si votre téléphone est trop lent. Ces méthodes nécessitent Internet et envoient l'invite à un service externe :

- [Créer un agent de génération d'images](/fr/creating-an-image-generation-agent/) génère une scène ou un personnage après chaque message.
- [Générer avec l'agent Perchance](/fr/how-to-use-the-perchance-image-generation-agent/) utilise le site gratuit Perchance.
- [API Nano Banana dans Layla](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) utilise le modèle Google avec une clé d'API Google AI Studio.

## Questions fréquentes

### Comment générer des images hors ligne sur Android ?

Installez Local Dream et téléchargez un modèle. Layla génère ensuite sur votre téléphone, depuis du texte ou une image, sans Internet. Seules l'installation de la mini-application et le téléchargement du modèle nécessitent une connexion.

### La génération fonctionne-t-elle sur iPhone ?

Oui. Les modèles SD 1.5 utilisent le CPU ou le GPU, Core ML est disponible et les modèles FLUX et Z-Image compacts fonctionnent aussi sur iOS. Les modèles NPU Snapdragon sont réservés à Android.

### Puis-je exécuter Stable Diffusion sur mon téléphone ?

Oui. Layla exécute Stable Diffusion 1.5 et SDXL sur Android et iPhone. SD 1.5 utilise le CPU de la plupart des téléphones récents ou le NPU des Snapdragon compatibles pour accélérer. Vous pouvez aussi importer vos checkpoints et LoRA.

### Puis-je exécuter FLUX sur mon téléphone ?

Oui, sur le matériel compatible. FLUX.2 Klein utilise le NPU d'un Snapdragon 8 Elite ou ultérieur. Les modèles compacts FLUX.2 klein 4B et Bonsai Image 4B utilisent le CPU ou le GPU sur Android et iOS. FLUX.1[dev] est disponible via Layla Cloud.

### Faut-il un téléphone Snapdragon ?

Non. Les modèles SD 1.5 CPU fonctionnent sur la plupart des téléphones récents. Seuls les modèles NPU nécessitent un Snapdragon ; les plus récents demandent un 8 Elite ou ultérieur.

### Par quel modèle commencer ?

Essayez SD 1.5, par exemple DreamShaper : son téléchargement est relativement petit et il fonctionne sur presque tous les téléphones récents. Avec un Snapdragon 8 Elite ou ultérieur, essayez Z-Image Turbo sur NPU pour une meilleure qualité.

### Puis-je utiliser les modèles Civitai dans Layla ?

Oui, pour les familles compatibles. Téléchargez un checkpoint safetensors et importez-le dans **Safetensor**. Le guide d'importation ci-dessus détaille les familles prises en charge.

### Puis-je modifier une image existante ?

Oui, avec un modèle compatible image-image. Ajoutez une image source dans Local Dream. FLUX.2 Klein et Qwen Image acceptent aussi jusqu'à trois images de référence.

### La génération Layla Cloud est-elle payante ?

Chaque formule, même gratuite, comprend un quota mensuel de générations cloud. Les formules supérieures en offrent davantage. La génération locale n'a ni quota d'utilisation ni coût par image.

### Comment faire envoyer des images à mon personnage ?

Dans l'éditeur, ouvrez **Advanced** et choisissez un modèle sous **OUTPUT**. Activez **Send images randomly** ou ajoutez vos déclencheurs dans **Fallback phrase**.

### Les personnages peuvent-ils utiliser des modèles différents ?

Oui. Chaque personnage personnalisé peut avoir son modèle dans **Advanced**. Sans choix individuel, il utilise le modèle par défaut d'Inference Settings.

### Layla examine-t-elle ou censure-t-elle les images ?

En local, l'invite et l'image ne quittent pas le téléphone : aucun service en ligne ne les examine. Layla Cloud s'exécute sur les serveurs de Layla et votre Web UI sur votre PC ; ces deux méthodes suivent leurs propres réglages.

### Que vérifier pour choisir un générateur d'images hors ligne sur Android ?

Vérifiez la génération sans Internet, les modèles compatibles, l'utilisation du NPU, l'importation de checkpoints Stable Diffusion et LoRA, et la conservation des images sur l'appareil. Layla couvre ces cinq points et permet aussi aux personnages d'envoyer des images dans le chat.

### Comment connecter Layla à Stable Diffusion sur mon PC ?

Configurez AUTOMATIC1111 Web UI avec son API activée, puis ajoutez son adresse d'API dans **Web UI** sur l'écran Add Image Model. Le PC génère les images ; le téléphone doit pouvoir le joindre sur le réseau.

## Crédits

La génération d'images utilise [Local Dream](https://github.com/xororz/local-dream), créé par XORORZ. NPU Forge a été créé par AbrahamPaulJ.
