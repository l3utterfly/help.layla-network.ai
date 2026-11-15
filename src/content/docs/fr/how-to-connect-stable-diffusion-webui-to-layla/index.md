---
title: "Stable Diffusion WebUI sur Android : connecter AUTOMATIC1111 à Layla"
description: "Utilisez Stable Diffusion WebUI sur Android : connectez AUTOMATIC1111 à Layla, activez l'API, ajoutez un modèle Web UI dans Local Dream, modifiez le JSON."
category: Image generation
order: 17
keywords:
  - Stable Diffusion WebUI Android
  - Stable Diffusion WebUI sur Android
  - application Stable Diffusion Android
  - AUTOMATIC1111 Android
  - API AUTOMATIC1111
  - connecter Stable Diffusion WebUI au téléphone
  - utiliser Stable Diffusion sur son téléphone
  - exécuter Stable Diffusion sur Android
  - Stable Diffusion sur réseau local
  - accès à distance Stable Diffusion WebUI
  - stable-diffusion-webui --api
  - stable-diffusion-webui --listen
  - sdapi/v1/txt2img
  - corps de requête txt2img
  - paramètres API Stable Diffusion WebUI
  - Stable Diffusion SDXL sur Android
  - Stable Diffusion LoRA
  - API Hires fix
  - générateur d'images IA pour Android
  - application de génération d'images IA
  - application texte vers image
  - génération d'images Layla
  - Local Dream
lastUpdated: 2026-11-15
translationKey: how-to-connect-stable-diffusion-webui-to-layla
ai_translated: true
---

**Layla est une application Android qui sert de client à AUTOMATIC1111 Stable Diffusion WebUI : votre téléphone envoie le prompt par votre réseau à la WebUI de votre propre PC, et c'est le PC qui calcule l'image.** Vous activez l'API de la WebUI, vous ajoutez un modèle _Web UI_ dans la mini-application Local Dream, et Layla construit chaque requête à partir d'un modèle JSON que vous pouvez modifier. L'image apparaît dans Local Dream et dans vos discussions, comme avec n'importe quel autre modèle d'images de Layla.

AUTOMATIC1111 est une interface web pour ordinateur et ne propose pas d'application Android. Cette connexion permet d'utiliser Stable Diffusion WebUI sur Android : vous gardez les checkpoints, LoRA et extensions déjà configurés dans la WebUI, et vous générez depuis votre téléphone. Ce guide explique comment démarrer la WebUI avec son API activée, ajouter le modèle dans Local Dream, le modèle de requête avec tous ses marqueurs, des modèles prêts à l'emploi pour SD 1.5, SDXL, les LoRA et Hires fix, ainsi que les solutions aux erreurs de connexion courantes.

Contrairement aux modèles de Layla qui tournent sur l'appareil, cette méthode exige que le PC soit allumé et joignable depuis le téléphone pendant la génération. Le prompt et l'image transitent par votre réseau local jusqu'à votre propre ordinateur, et non vers un service en ligne : la connexion n'a donc pas besoin d'accès à Internet.

## Pourquoi utiliser Stable Diffusion WebUI sur Android avec Layla ?

Layla peut aussi exécuter Stable Diffusion directement sur le téléphone ; la connexion WebUI est donc l'une des deux façons d'obtenir un générateur d'images IA pour Android dans Layla. Elle convient dans ces cas :

- **Vous avez déjà une installation Stable Diffusion.** Vos checkpoints, LoRA, embeddings et extensions comme ControlNet ou ADetailer restent sur le PC et sont utilisables depuis le téléphone.
- **Votre PC a une carte graphique plus rapide que votre téléphone.** Le PC fait le calcul : la puissance du processeur du téléphone ne limite ni la taille de l'image, ni le nombre d'étapes, ni le modèle.
- **Vous voulez des modèles qu'un téléphone ne sait pas exécuter.** Les gros checkpoints SDXL et les extensions lourdes tournent sur un GPU de bureau sans aucune conversion.
- **Il n'y a aucun coût par image.** Vous générez avec votre propre matériel, sans crédits et sans compte.
- **Cela fonctionne dans la discussion.** Un modèle Web UI peut être le modèle d'images de Layla ou d'un seul personnage : vos personnages peuvent vous envoyer des images produites par votre propre PC.

|                           | Modèle sur l'appareil                                        | Connexion Web UI                           |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| Où les images sont créées | Sur votre téléphone                                          | Sur votre PC                               |
| PC et réseau nécessaires  | Non                                                          | Oui, le PC doit être allumé et joignable   |
| Modèles                   | Modèles que Layla peut importer et exécuter sur le téléphone | Tout ce que votre WebUI peut charger       |
| Réglages                  | Les commandes de Layla                                       | Les commandes de Layla plus un modèle JSON |

[Importer des modèles de génération d'images personnalisés dans Layla](/fr/how-to-import-custom-image-generation-models-into-layla/) présente la méthode sur l'appareil, y compris les checkpoints et LoRA de Civitai.

## Comment Layla communique avec Stable Diffusion WebUI

La WebUI possède une API HTTP distincte de sa page dans le navigateur. Layla n'en utilise qu'un seul appel :

```text
Layla (phone)                         Stable Diffusion WebUI (PC)
  |  POST /sdapi/v1/txt2img               |
  |  JSON body built from your template -> |  renders the image
  |  <- JSON with "images": [base64]      |
  |  saves the first image, shows it      |
```

Quand vous touchez **Generate**, Layla prend votre modèle, remplace les marqueurs comme `{prompt}` et `{steps}` par vos réglages actuels, puis envoie le résultat comme corps d'une requête `POST` vers l'endpoint saisi. La WebUI répond avec l'image encodée en base64 dans une liste `images`. Layla décode la première et l'enregistre comme un fichier image ordinaire. Si vous avez renseigné une clé d'API, Layla l'envoie dans un en-tête `Authorization: Bearer`.

Rien d'autre n'est envoyé. Layla ne change pas de modèle, ne choisit ni sampler ni taille de lui-même. Tout ce que la WebUI doit savoir figure dans le modèle.

## Ce qu'il vous faut

- Un PC avec [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) installée et capable de générer une image dans sa propre page du navigateur. Les forks qui conservent la même API, comme Forge, acceptent généralement les mêmes requêtes.
- Votre téléphone et votre PC sur le même réseau, par exemple le même Wi-Fi.
- Layla avec la mini-application **Local Dream** installée. [Activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/) explique l'installation, et [Activer ou désactiver les mini-applications dans Layla](/fr/how-to-enable-disable-mini-apps-within-layla/) indique où se trouvent les mini-applications.

## Étape 1 : activer l'API de Stable Diffusion WebUI (--api et --listen)

L'API est désactivée par défaut. Ajoutez l'argument `--api`, puis `--listen` pour que la WebUI accepte les connexions d'autres appareils et pas seulement du PC lui-même. Les deux se placent sur la ligne `COMMANDLINE_ARGS` du fichier de lancement de la WebUI, c'est-à-dire `webui-user.bat` sous Windows et `webui-user.sh` sous Linux :

```text
set COMMANDLINE_ARGS=--api --listen
```

Si cette ligne contient déjà d'autres arguments, ajoutez ces deux-là au lieu de les remplacer. Lancez la WebUI avec ce fichier. Par défaut, elle écoute sur le port `7860`.

Pour vérifier que l'API fonctionne, ouvrez `http://localhost:7860/docs` dans un navigateur sur le PC. La page liste les appels disponibles, dont `/sdapi/v1/txt2img`.

### Trouver l'adresse du PC et autoriser le port

Le téléphone ne peut pas utiliser `localhost`, car cela désignerait le téléphone lui-même. Il lui faut l'adresse du PC sur votre réseau :

1. Sous Windows, ouvrez un terminal et exécutez `ipconfig`. Cherchez l'**adresse IPv4** de votre adaptateur Wi-Fi ou Ethernet. Elle ressemble à `192.168.1.50`.
2. Si le pare-feu Windows Defender demande s'il faut autoriser Python sur les réseaux privés, autorisez-le. S'il n'a rien demandé et que le téléphone n'arrive pas à se connecter ensuite, ajoutez une règle entrante pour le port TCP `7860`.
3. Sur le téléphone, ouvrez `http://192.168.1.50:7860` dans un navigateur, avec votre propre adresse. Si la page de la WebUI s'affiche, le téléphone atteint le PC et la même adresse fonctionnera dans Layla.

Votre endpoint est cette adresse suivie du chemin txt2img, par exemple :

```text
http://192.168.1.50:7860/sdapi/v1/txt2img
```

La route s'écrit `txt2img`. Les anciennes versions de Layla affichaient `text2img` dans le texte d'exemple du champ Endpoint, une route qui n'existe pas dans la WebUI.

### Remarque sur les clés d'API et la sécurité

`--listen` rend la WebUI accessible à tous les appareils de votre réseau, et l'API n'a pas d'authentification sauf si vous en ajoutez une. Utilisez-la sur un réseau de confiance et ne redirigez pas le port `7860` vers Internet.

L'option `--api-auth` de la WebUI définit un nom d'utilisateur et un mot de passe, mais elle utilise l'authentification HTTP Basic, alors que Layla envoie sa clé d'API comme jeton Bearer. Les deux ne sont pas compatibles : laissez donc le champ **API Key** vide pour une WebUI ordinaire. Ce champ sert aux montages où un élément placé devant la WebUI, par exemple un proxy inverse, vérifie un jeton Bearer.

## Étape 2 : ajouter la WebUI à Layla comme modèle Web UI dans Local Dream

1. Ouvrez la mini-application **Local Dream**.
2. Touchez **Add Model** en haut à droite. L'écran Add Image Model s'ouvre avec trois onglets : Safetensor, Zip et Web UI.
3. Sélectionnez l'onglet **Web UI**.

![L'onglet Web UI de l'écran Add Image Model de Layla, avec les champs Name, Endpoint, API Key et Model pour une API Stable Diffusion compatible Automatic1111.](../../how-to-connect-stable-diffusion-webui-to-layla/connect-stable-diffusion-web-ui-api-layla.jpg)

4. Remplissez les champs :
   - **Name** : un nom que vous reconnaîtrez, par exemple `PC SDXL`. C'est le nom affiché dans la liste des modèles.
   - **Endpoint** : l'adresse complète de l'étape 1, par exemple `http://192.168.1.50:7860/sdapi/v1/txt2img`.
   - **API Key** : laissez vide pour une WebUI ordinaire.
   - **Model** : voir la remarque ci-dessous. Vous pouvez le laisser vide.
5. Touchez **Save & Select**.

Name et Endpoint sont obligatoires. Si l'un des deux est vide, Layla vous demande de fournir au moins un nom et un endpoint d'API.

Le modèle est enregistré parmi vos modèles d'images et sélectionné aussitôt. Il ne demande aucun téléchargement et est prêt dès que la WebUI tourne. Les nouveaux modèles Web UI démarrent avec 20 étapes, une échelle CFG de 7 et un negative prompt vide ; vous pouvez modifier ces trois valeurs dans Local Dream.

### Ce que fait le champ Model

La WebUI génère avec le checkpoint qu'elle a chargé. Dans la version actuelle de Layla, le texte du champ **Model** est enregistré avec la connexion mais n'est pas ajouté à la requête : y saisir un nom de checkpoint ne change donc pas le modèle de la WebUI. Pour choisir un checkpoint depuis Layla, placez-le dans le modèle de requête, comme le montre le modèle SDXL plus bas.

### Ajouter une connexion par configuration

Chaque modèle Web UI conserve ses propres réglages, y compris son propre modèle de requête. Vous pouvez ajouter plusieurs fois le même endpoint sous des noms différents, par exemple une connexion pour un checkpoint anime SD 1.5 et une pour un checkpoint photo SDXL, chacune avec un modèle qui sélectionne le bon checkpoint et la bonne taille d'image. Passer de l'une à l'autre dans Local Dream change alors toute la configuration. Pour modifier plus tard le nom, l'endpoint ou la clé d'une connexion, ouvrez la liste des modèles et touchez l'icône en forme de crayon sur sa carte.

## Étape 3 : générer des images Stable Diffusion depuis votre téléphone

Une fois le modèle Web UI sélectionné, Local Dream affiche les mêmes commandes que pour les autres modèles :

1. Saisissez un prompt et, si vous le souhaitez, un negative prompt.
2. Réglez **Steps**, **CFG Scale** et **Seed**. Un seed de `-1` en choisit un au hasard.
3. Touchez **Generate**.

![Les paramètres de Local Dream dans Layla : Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale et la section Advanced Settings.](../../how-to-connect-stable-diffusion-webui-to-layla/local-dream-image-generation-settings.jpg)

Le téléphone attend pendant que le PC calcule : la durée dépend donc de votre carte graphique et de vos réglages, pas du téléphone. L'aperçu de progression n'est pas disponible pour les modèles Web UI, car la requête ne revient qu'une fois l'image terminée. Si **Auto Upscale** est activé, Layla exécute l'upscaler sur le téléphone après l'arrivée de l'image.

Quelques commandes ne s'appliquent pas à un modèle Web UI :

- **Size** ne propose qu'une option, 512×512. Pour une autre taille, définissez `width` et `height` dans le modèle, comme décrit plus bas.
- **Scheduler** concerne les modèles de Layla sur l'appareil. Il n'est pas envoyé à la WebUI. Pour choisir un sampler ou un scheduler, définissez-les dans le modèle.
- **Image vers image** n'est pas disponible. La connexion Web UI de Layla n'appelle que txt2img.

## Le modèle de requête JSON de l'API Stable Diffusion WebUI

Le modèle est le JSON que Layla envoie à la WebUI. Sélectionnez un modèle Web UI dans Local Dream, ouvrez **Advanced Settings** et faites défiler jusqu'à **WEBUI API BODY TEMPLATE**. La zone de texte contient tout le corps de la requête et vous pouvez la modifier librement. Layla enregistre le changement automatiquement un instant après la dernière saisie, et il ne s'applique qu'à ce modèle.

**Reset All Settings**, en bas de Advanced Settings, remet le modèle à la valeur par défaut de Layla, avec les autres réglages de ce modèle.

### Le modèle par défaut

Voici le modèle avec lequel démarre chaque nouveau modèle Web UI. Il énumère presque tous les champs acceptés par l'API txt2img :

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "styles": [],
  "seed": {seed},
  "subseed": -1,
  "subseed_strength": 0,
  "seed_resize_from_h": -1,
  "seed_resize_from_w": -1,
  "sampler_name": "Euler A",
  "scheduler": "",
  "batch_size": 1,
  "n_iter": 1,
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "restore_faces": true,
  "tiling": false,
  "do_not_save_samples": false,
  "do_not_save_grid": false,
  "eta": 0,
  "denoising_strength": 0,
  "s_min_uncond": 0,
  "s_churn": 0,
  "s_tmax": 0,
  "s_tmin": 0,
  "s_noise": 0,
  "override_settings": {},
  "override_settings_restore_afterwards": true,
  "refiner_checkpoint": "",
  "refiner_switch_at": 0,
  "disable_extra_networks": false,
  "firstpass_image": "",
  "comments": {},
  "enable_hr": false,
  "firstphase_width": 0,
  "firstphase_height": 0,
  "force_task_id": "",
  "sampler_index": "",
  "script_name": "",
  "script_args": [],
  "send_images": true,
  "save_images": false,
  "alwayson_scripts": {},
  "infotext": ""
}
```

Vous n'avez pas besoin de tout. Tout champ omis prend la valeur par défaut de la WebUI : un modèle court est donc plus facile à lire et à maintenir. Les sections suivantes présentent d'abord les marqueurs, puis les champs qu'il vaut le plus la peine de modifier.

### Les marqueurs

Sept marqueurs sont remplacés par vos réglages à chaque génération. Tout autre texte du modèle est envoyé tel quel.

| Marqueur           | Remplacé par                                                                                  | Écriture                                |
| ------------------ | --------------------------------------------------------------------------------------------- | --------------------------------------- |
| `{prompt}`         | Votre prompt, précédé du Prompt Prefix                                                        | Entre guillemets : `"{prompt}"`         |
| `{negativePrompt}` | Le negative prompt                                                                            | Entre guillemets : `"{negativePrompt}"` |
| `{seed}`           | Le champ Seed. S'il vaut `-1` ou `0`, Layla choisit un nombre aléatoire inférieur à 1 000 000 | Sans guillemets                         |
| `{steps}`          | Le champ Steps                                                                                | Sans guillemets                         |
| `{cfg}`            | Le champ CFG Scale                                                                            | Sans guillemets                         |
| `{width}`          | La largeur choisie, soit 512 pour un modèle Web UI                                            | Sans guillemets                         |
| `{height}`         | La hauteur choisie, soit 512 pour un modèle Web UI                                            | Sans guillemets                         |

Quelques règles découlent de la manière dont Layla les remplit :

- **Mettez les marqueurs de texte entre guillemets, pas les nombres.** Layla échappe les guillemets et les retours à la ligne de votre prompt pour qu'ils ne cassent pas le JSON, et attend `{prompt}` et `{negativePrompt}` à l'intérieur d'une chaîne. Les marqueurs numériques deviennent de simples nombres : `"steps": {steps}` est correct, tandis que `"steps": "{steps}"` envoie les étapes sous forme de texte.
- **Le résultat doit être du JSON valide.** Layla ne le vérifie pas. Une virgule manquante ou en trop fait renvoyer une erreur par la WebUI au lieu d'une image.
- **Chaque occurrence est remplacée.** Si vous écrivez `{prompt}` à deux endroits, les deux sont remplis.
- **Il n'existe pas de marqueur `{scheduler}` ou `{model}`.** Écrivez le sampler, le scheduler ou le checkpoint directement dans le modèle.

### Ce que Layla fait d'abord au prompt

Avant que le prompt n'arrive dans `{prompt}`, Layla le prépare au style de Stable Diffusion, séparé par des virgules :

1. Le **Prompt Prefix** de Advanced Settings est ajouté devant, suivi d'une virgule.
2. Tout le prompt est converti en minuscules.
3. Le texte est découpé aux virgules, et un tag présent deux fois n'est conservé qu'une fois.

Le negative prompt est lui aussi converti en minuscules. Les pondérations comme `(detailed eyes:1.2)` passent sans changement.

Le texte que vous saisissez directement dans le modèle n'est pas modifié. C'est important pour les LoRA, car leurs noms peuvent être sensibles à la casse sur le PC. Écrivez un tag comme `<lora:MyStyle:0.8>` dans le modèle et non dans la zone de prompt de Layla : il conserve ses majuscules. Le modèle LoRA plus bas fait exactement cela.

### Les champs qui valent la peine d'être modifiés

| Champ                  | Rôle                                                                                                                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampler_name`         | Le sampler. La WebUI attend le nom exactement comme elle l'affiche, par exemple `Euler a`. La valeur par défaut de Layla est `Euler A` : si la WebUI signale un sampler inconnu, copiez le nom depuis sa liste **Sampling method**. |
| `scheduler`            | Le planning de bruit à partir de la WebUI 1.9, par exemple `Karras`. Une chaîne vide laisse la valeur par défaut.                                                                                                                   |
| `restore_faces`        | Applique un modèle de restauration des visages au résultat. Il vaut `true` dans le modèle par défaut de Layla. Mettez `false` pour les checkpoints stylisés ou anime, où il peut modifier l'aspect des visages.                     |
| `width`, `height`      | La taille de sortie. Saisissez des nombres ici pour dépasser 512×512. Utilisez des tailles pour lesquelles votre checkpoint a été entraîné, par exemple 1024 pour SDXL.                                                             |
| `batch_size`, `n_iter` | Le nombre d'images produites par la WebUI par requête. Layla n'utilise que la première : laissez les deux à `1`.                                                                                                                    |
| `override_settings`    | Réglages appliqués à cette requête uniquement. C'est ainsi que l'on choisit le checkpoint.                                                                                                                                          |
| `enable_hr`            | Active Hires fix : un rendu petit, puis un agrandissement avec une seconde passe.                                                                                                                                                   |
| `send_images`          | Doit rester `true`. Layla lit l'image dans la réponse.                                                                                                                                                                              |
| `save_images`          | Indique si la WebUI conserve aussi une copie sur le PC. Il vaut `false` par défaut.                                                                                                                                                 |
| `alwayson_scripts`     | Arguments pour les extensions comme ControlNet ou ADetailer, si elles sont installées.                                                                                                                                              |

La [documentation de l'API de la WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) décrit la requête, et la page `/docs` de votre propre WebUI liste tous les champs acceptés par votre version.

## Modèles prêts à l'emploi

Copiez-en un dans la zone du modèle et adaptez-le. Chacun est un JSON complet et valide.

### Modèle : SD 1.5 minimal

Le plus petit modèle utile. La WebUI complète tout ce qui n'est pas listé.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

### Modèle : SDXL avec un checkpoint choisi

SDXL génère autour de 1024×1024 : le modèle fixe donc lui-même la taille. Le bloc `override_settings` charge le checkpoint indiqué pour cette requête, et `override_settings_restore_afterwards` remet ensuite en place le checkpoint précédent de la WebUI.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": 1024,
  "height": 1024,
  "sampler_name": "DPM++ 2M",
  "scheduler": "Karras",
  "restore_faces": false,
  "override_settings": {
    "sd_model_checkpoint": "your-sdxl-checkpoint.safetensors"
  },
  "override_settings_restore_afterwards": true,
  "send_images": true,
  "save_images": false
}
```

Remplacez `your-sdxl-checkpoint.safetensors` par le nom du checkpoint tel que l'affiche la WebUI. La WebUI accepte aussi le nom de fichier sans extension. Si vous utilisez toujours le même checkpoint, il est plus rapide de le charger une fois dans la WebUI et de supprimer `override_settings` : une requête qui nomme un autre checkpoint que celui chargé oblige la WebUI à le charger d'abord, ce qui allonge chaque image.

### Modèle : LoRA et tags de qualité fixes

Le texte écrit dans le modèle est envoyé exactement tel que vous l'avez saisi. Servez-vous-en pour un tag LoRA et pour des tags de qualité que vous voulez toujours, et gardez la zone de Layla pour ce qui change d'une image à l'autre :

```json
{
  "prompt": "masterpiece, best quality, <lora:MyStyle:0.8>, {prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

Ici, `MyStyle` est le nom de la LoRA dans la WebUI. Le tag conserve ses majuscules, et seule la partie `{prompt}` est convertie en minuscules.

### Modèle : Hires fix

Hires fix génère à la taille de base, puis agrandit et affine le résultat, ce qui donne une image plus nette sans les sujets répétés qu'une grande première passe peut provoquer. C'est sensiblement plus long.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "enable_hr": true,
  "hr_scale": 2,
  "hr_upscaler": "Latent",
  "hr_second_pass_steps": 10,
  "denoising_strength": 0.5,
  "send_images": true,
  "save_images": false
}
```

Le modèle par défaut de Layla met `denoising_strength` à `0`, ce qui convient quand Hires fix est désactivé. Quand vous l'activez, saisissez une valeur comme `0.5`, sinon la seconde passe ne change rien. Une base de 512×512 avec `hr_scale` à `2` donne une image de 1024×1024.

## Conseils pour une configuration fiable

- **Testez d'abord dans la WebUI.** Si une combinaison de checkpoint, de sampler et de taille fonctionne dans la page de la WebUI, les mêmes valeurs fonctionnent dans le modèle. L'onglet **PNG Info** de la WebUI affiche les réglages d'une image qu'elle a produite.
- **Gardez le PC éveillé.** Si le PC se met en veille, le téléphone reçoit une erreur de connexion. Désactivez la veille pendant que vous générez.
- **Donnez une adresse fixe au PC.** Si votre routeur change l'adresse du PC, l'endpoint enregistré cesse de fonctionner. Réservez une adresse pour le PC dans les réglages du routeur, ou modifiez l'endpoint depuis la liste des modèles quand elle change.
- **Utilisez le Prompt Prefix pour les mots que vous voulez toujours.** Il est ajouté avant chaque prompt et, comme le reste du prompt, converti en minuscules. Pour tout ce qui est sensible à la casse, placez-le plutôt dans le modèle.
- **Utilisez aussi la connexion dans les discussions.** Une fois le modèle Web UI créé, vous pouvez le définir comme modèle d'images de Layla ou d'un seul personnage. [Activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/) indique où le choisir.

## Questions fréquentes

### Comment utiliser Stable Diffusion WebUI sur mon téléphone Android ?

Lancez la WebUI sur un PC avec `--api --listen`, puis ajoutez-la dans la mini-application Local Dream de Layla comme modèle **Web UI**, avec l'adresse du PC suivie de `/sdapi/v1/txt2img`. Le téléphone envoie le prompt, le PC calcule l'image et Layla l'affiche. Ouvrir la page de la WebUI dans le navigateur du téléphone fonctionne aussi, mais vous utilisez alors la page propre de la WebUI et non la discussion et les outils d'image de Layla.

### Existe-t-il une application AUTOMATIC1111 pour Android ?

AUTOMATIC1111 est une interface web qui tourne sur un ordinateur et ne propose pas d'application Android. Layla joue le rôle de client Android : son modèle Web UI envoie des requêtes txt2img à votre WebUI et affiche les images renvoyées, et vos personnages peuvent aussi utiliser la WebUI dans les discussions.

### Puis-je exécuter Stable Diffusion sur Android sans PC ?

Oui, mais pas avec une connexion Web UI, qui exige qu'une WebUI tourne sur un ordinateur. Layla peut exécuter Stable Diffusion sur le téléphone avec ses modèles sur l'appareil, sans PC et sans connexion Internet. [Activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/) les présente.

### Comment activer l'API de Stable Diffusion WebUI ?

Lancez la WebUI avec l'argument `--api`, normalement en l'ajoutant à `COMMANDLINE_ARGS` dans `webui-user.bat` ou `webui-user.sh`. Ajoutez aussi `--listen` pour que les autres appareils de votre réseau, comme votre téléphone, puissent l'atteindre. Vous pouvez vérifier que cela fonctionne en ouvrant `/docs` à l'adresse de la WebUI.

### Quel est l'endpoint de l'API Stable Diffusion WebUI pour Layla ?

L'adresse de la WebUI suivie de `/sdapi/v1/txt2img`, par exemple `http://192.168.1.50:7860/sdapi/v1/txt2img`. Utilisez l'adresse du PC sur votre réseau et non `localhost`, car sur le téléphone `localhost` désigne le téléphone.

### Puis-je accéder à Stable Diffusion WebUI depuis mon téléphone hors de chez moi ?

Seulement si le téléphone peut joindre le PC. À la maison, le même Wi-Fi suffit, et les données mobiles n'atteignent pas le PC d'elles-mêmes. Hors de chez vous, il faudrait une connexion privée vers votre réseau domestique, comme un VPN. N'exposez pas directement la WebUI à Internet, car son API n'a pas d'authentification par défaut. Pour des images hors de chez vous sans rien configurer, les modèles de Layla sur l'appareil fonctionnent avec les données mobiles ou sans aucune connexion.

### Layla fonctionne-t-il avec Forge, reForge ou SD.Next ?

Layla n'envoie qu'une requête txt2img au format AUTOMATIC1111 : tout serveur qui accepte la même requête sur `/sdapi/v1/txt2img` peut donc fonctionner. Les forks diffèrent par les champs et les noms de sampler qu'ils acceptent ; consultez la page `/docs` de la vôtre et adaptez le modèle.

### Comment utiliser SDXL, un autre checkpoint, une LoRA ou un autre sampler avec l'API de la WebUI ?

Modifiez le modèle. Ajoutez le checkpoint sous `override_settings` avec `"sd_model_checkpoint"`, écrivez le tag LoRA dans la ligne `prompt`, et réglez `sampler_name` et `scheduler` sur des noms que la WebUI liste. Pour un checkpoint SDXL, réglez aussi `width` et `height` autour de 1024. Les modèles ci-dessus en donnent chacun un exemple.

### Comment générer des images plus grandes ?

Définissez `width` et `height` avec des nombres dans le modèle. Un modèle Web UI ne propose dans Layla qu'un bouton de taille 512×512, valeur utilisée pour `{width}` et `{height}` : des nombres fixes dans le modèle sont donc la solution au-delà. Pour les checkpoints SDXL, prenez environ 1024×1024. Pour plus de détails avec un checkpoint SD 1.5, activez Hires fix.

### Pourquoi la génération échoue-t-elle avec « Failed to generate image » ?

Layla affiche après ce texte le code d'état et le message de la WebUI, qui indiquent ce qui a échoué. Un `404` signifie généralement que l'API n'est pas activée ou que le chemin de l'endpoint est mal orthographié : vérifiez `--api` et `txt2img`. Un `422` signifie que la WebUI a rejeté le corps de la requête : un champ a le mauvais type, un nom est mal orthographié ou le JSON est invalide. Un `500` signifie que la WebUI a rencontré une erreur pendant le calcul ; sa fenêtre de console sur le PC en donne la raison, par exemple un sampler inconnu ou un manque de mémoire.

### Pourquoi mon téléphone ne parvient-il pas à se connecter à Stable Diffusion WebUI ? (network request failed)

Le téléphone n'a pas pu joindre le PC. Vérifiez que la WebUI tourne, qu'elle a été lancée avec `--listen`, que le téléphone et le PC sont sur le même réseau, que l'adresse IP de l'endpoint est à jour et que le pare-feu autorise le port `7860`. Le test le plus rapide consiste à ouvrir l'adresse de la WebUI dans le navigateur du téléphone.

### Pourquoi Layla affiche-t-il « No images returned » ?

La WebUI a répondu avec succès, mais la réponse ne contenait pas de liste d'images. Vérifiez que `send_images` vaut `true` dans le modèle et que rien dans `alwayson_scripts` n'empêche le retour de l'image.

### Pourquoi ma LoRA est-elle ignorée ?

Layla convertit le prompt en minuscules : un tag LoRA saisi dans la zone de prompt peut donc ne plus correspondre à un nom qui contient des majuscules. Placez plutôt le tag dans la ligne `prompt` du modèle, où il est envoyé tel quel, et vérifiez que le nom correspond à celui de la WebUI.

### La génération d'images via la WebUI est-elle privée ?

Le prompt et l'image vont de votre téléphone à votre propre PC par votre réseau, et Layla ne les envoie pas à un service en ligne. Rien ne quitte votre réseau, sauf si vous mettez en place un accès à distance. Pour une génération qui n'exige aucun PC, utilisez les modèles de Layla sur l'appareil, décrits dans [Activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/).

### Puis-je l'utiliser dans une discussion pour que mon personnage envoie des images ?

Oui. Un modèle Web UI est un modèle d'images comme les autres. Sélectionnez-le comme modèle de génération d'images par défaut dans Inference Settings, ou choisissez-le pour un seul personnage dans l'onglet **Advanced** de l'éditeur de personnage. Le PC doit être allumé et la WebUI lancée au moment où le personnage génère une image.

## Conclusion

Un modèle Web UI permet d'utiliser Stable Diffusion WebUI sur Android : l'installation AUTOMATIC1111 de votre PC devient un générateur d'images pour Layla. La WebUI a besoin de `--api` et `--listen`, Local Dream a besoin de l'adresse de son endpoint `txt2img`, et le modèle de requête décide du reste : checkpoint, sampler, taille, LoRA et Hires fix. En gardant un modèle court par configuration, enregistré sous forme de connexions séparées, vous passez de l'une à l'autre depuis la liste des modèles.

Layla est conçu comme un assistant IA hors ligne pour Android, et ses modèles sur l'appareil restent le moyen d'exécuter Stable Diffusion sur le téléphone sans PC et sans réseau. La connexion WebUI est faite pour le cas où vous avez déjà une installation Stable Diffusion sur un ordinateur qui vous appartient et voulez la rendre disponible dans vos discussions et dans Local Dream.
