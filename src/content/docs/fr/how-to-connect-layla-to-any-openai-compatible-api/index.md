---
title: Comment connecter Layla à n’importe quelle API compatible avec OpenAI
description: Connectez Layla à un endpoint compatible avec OpenAI, dont LM Studio, Ollama et llama.cpp, pour exécuter un LLM local privé sur votre propre PC.
category: Models & performance
order: 15
keywords:
  - API compatible avec OpenAI pour Layla
  - endpoint compatible avec OpenAI
  - LLM local Android
  - endpoint API LM Studio
  - API OpenAI Ollama
  - serveur llama.cpp
  - connecter Android à un LLM local
  - chatbot IA auto-hébergé
  - assistant IA privé
  - serveur IA local
lastUpdated: 2026-08-22
translationKey: how-to-connect-layla-to-any-openai-compatible-api
ai_translated: true
---

**Layla peut se connecter à tout service proposant un endpoint de chat completions compatible avec OpenAI.** Le modèle peut fonctionner sur votre propre ordinateur à l’aide d’un serveur LLM local tel que LM Studio, Ollama ou llama.cpp, ou sur un service distant utilisant le même format d’API.

Ce guide explique d’abord les paramètres nécessaires à toute connexion API compatible avec OpenAI, puis présente trois configurations concrètes d’IA locale. Les exemples utilisent un téléphone et un PC Windows sur le même réseau privé, mais les mêmes paramètres Layla fonctionnent également avec des serveurs compatibles sous macOS ou Linux, un serveur domestique ou un service accessible sur Internet.

## Qu’est-ce qu’un endpoint compatible avec OpenAI ?

Un endpoint compatible avec OpenAI est une adresse d’API qui accepte les requêtes dans le même format général que l’API Chat Completions d’OpenAI. Il n’a pas besoin de se connecter à OpenAI, à ChatGPT ou à un modèle hébergé par OpenAI.

De nombreux moteurs d’inférence LLM locaux reproduisent ce format d’API afin qu’une même application puisse fonctionner avec différents serveurs de modèles. Layla envoie à l’endpoint la conversation, le nom du modèle sélectionné et une demande de réponse en streaming. Le serveur exécute le modèle de langage et renvoie la réponse à Layla.

Pour fonctionner avec la connexion **API OpenAI** de Layla, un service doit prendre en charge :

- La route Chat Completions compatible avec OpenAI, généralement `/v1/chat/completions`
- Les messages de chat et un identifiant de modèle
- Les réponses en streaming
- L’authentification par jeton Bearer lorsqu’une clé API est requise

LM Studio, Ollama et `llama-server.exe` proposent tous la route de chat completions nécessaire.

## Ce qu’il vous faut avant de commencer

Pour exécuter un LLM local sur votre PC, préparez les éléments suivants :

- Layla installé sur votre appareil Android ou iOS
- Un ordinateur capable d’exécuter le modèle de langage choisi
- Un modèle téléchargé avec le moteur d’inférence sélectionné, ou un modèle GGUF compatible pour llama.cpp
- Votre téléphone et votre ordinateur connectés au même réseau Wi-Fi ou local de confiance
- L’autorisation de laisser passer le serveur de modèle dans le pare-feu de l’ordinateur sur les réseaux privés

La taille du modèle a un effet direct sur l’utilisation de la mémoire et la vitesse des réponses. Si vous découvrez l’IA locale, commencez avec un petit modèle quantifié recommandé pour votre ordinateur. Vous pourrez passer à un modèle local plus grand après avoir confirmé que la connexion fonctionne.

## Ajouter une connexion compatible avec OpenAI dans Layla

Ouvrez les **Paramètres** de Layla, accédez à **Paramètres d’inférence**, puis appuyez sur **Ajouter un modèle personnalisé** sous **Mes modèles**. La fenêtre suivante sépare les modèles exécutés sur le téléphone des services connectés. Sous **Services connectés**, choisissez **API OpenAI**.

Malgré son nom, cette option n’est pas limitée aux modèles d’OpenAI. Elle sert à connecter LM Studio, Ollama, llama.cpp, OpenRouter et tout autre service acceptant le format compatible de chat completions décrit plus haut.

![Fenêtre de sélection du moteur d’inférence de Layla, avec API OpenAI dans la section Services connectés.](./choose.jpg)

La fenêtre **API OpenAI** demande ensuite les informations de connexion et le modèle. Les quatre mêmes champs sont utilisés dans tous les exemples de ce guide ; seules leurs valeurs changent :

| Paramètre    | Valeur à saisir                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nom**      | Un libellé clair, par exemple « LM Studio sur mon PC » ou « Ollama — Llama 3.2 ».                                                                                               |
| **Endpoint** | L’URL complète de chat completions. Pour la plupart des serveurs compatibles, elle se termine par `/v1/chat/completions`.                                                       |
| **Clé API**  | La clé fournie par un service distant. Laissez le champ vide pour un serveur local non sécurisé, ou saisissez le jeton du serveur local si vous avez activé l’authentification. |
| **Modèle**   | L’identifiant exact attendu par le serveur. Appuyez sur **Rechercher des modèles** si le serveur prend en charge la découverte des modèles.                                     |

![Écran de configuration de l’API OpenAI dans Layla avec les champs Nom, Endpoint, Clé API et Modèle, ainsi que les commandes de recherche et d’enregistrement.](./settings1.jpg)

Choisissez un nom qui vous permettra de reconnaître facilement la connexion par la suite. L’endpoint doit être la route complète : une adresse de base se terminant uniquement par un numéro de port ou par `/v1` ne suffit pas. Layla envoie chaque requête de chat directement à l’adresse saisie dans ce champ.

Après avoir saisi l’endpoint et la clé API éventuellement requise, appuyez sur **Rechercher des modèles** si vous ne connaissez pas le nom exact du modèle. Layla demande au même serveur sa liste de modèles compatible avec OpenAI et vous permet de sélectionner l’un des identifiants renvoyés. Si la découverte des modèles n’est pas disponible, recopiez exactement le nom indiqué par le serveur ou le fournisseur. Ne laissez le champ vide que si l’endpoint prend explicitement en charge un modèle par défaut.

Sous le champ du modèle se trouvent les **Paramètres de requête avancés**. Leur ouverture affiche une zone **JSON supplémentaire** destinée aux remplacements personnalisés de la requête, comme illustré ci-dessous. La plupart des utilisateurs doivent la laisser vide : elle sert lorsqu’un fournisseur vous demande précisément d’ajouter un autre champ à la requête. L’exemple de température affiché dans l’interface n’est pas nécessaire pour utiliser LM Studio, Ollama ou llama.cpp.

![Écran API OpenAI de Layla avec les paramètres de requête avancés ouverts et le champ JSON supplémentaire.](./settings2.jpg)

Lorsque les informations de connexion et le modèle sont corrects, appuyez sur **Enregistrer les modifications**. Layla enregistre la connexion API dans **Mes modèles** et la sélectionne comme source de modèle actuelle.

## Pourquoi localhost ne fonctionne pas depuis votre téléphone

Lorsqu’un serveur affiche une adresse telle que `http://localhost:1234`, celle-ci fonctionne uniquement sur l’ordinateur qui exécute le serveur. Sur votre téléphone, `localhost` désigne le téléphone lui-même.

Layla a donc besoin de l’adresse IPv4 privée de votre ordinateur, qui commence généralement par `192.168.` ou `10.`. Sous Windows, ouvrez **Paramètres**, sélectionnez **Réseau et Internet**, ouvrez les propriétés de la connexion Wi-Fi ou Ethernet active, puis repérez **Adresse IPv4**. Certaines applications serveur, notamment LM Studio, peuvent afficher la bonne adresse du réseau local une fois l’accès réseau activé.

Si l’adresse de votre ordinateur est `192.168.1.50`, conservez cette adresse et ajoutez le port ainsi que le chemin complet de l’API correspondant au serveur choisi. Ne copiez pas l’adresse IP d’exemple de cet article : utilisez celle attribuée à votre propre ordinateur.

## Référence rapide : endpoints OpenAI compatibles locaux pour Layla

| Moteur d’inférence | Endpoint Layla par défaut                     | Clé API par défaut                                    | Champ Modèle                                                               |
| ------------------ | --------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------- |
| LM Studio          | `http://YOUR-PC-IP:1234/v1/chat/completions`  | Vide, sauf si l’authentification est activée          | Utilisez **Rechercher des modèles** ou l’identifiant affiché par LM Studio |
| Ollama             | `http://YOUR-PC-IP:11434/v1/chat/completions` | Vide                                                  | Le nom du modèle Ollama installé, par exemple `llama3.2`                   |
| Serveur llama.cpp  | `http://YOUR-PC-IP:8080/v1/chat/completions`  | Vide, sauf si le serveur a été lancé avec une clé API | Utilisez **Rechercher des modèles** pour sélectionner le modèle chargé     |

Remplacez `YOUR-PC-IP` par l’adresse IPv4 privée de votre ordinateur.

## Exemple 1 : connecter Layla à LM Studio

[LM Studio](https://lmstudio.ai/download) fournit une interface de bureau pour rechercher, télécharger et exécuter des modèles de langage locaux. Sa page Developer permet d’exposer ces modèles au moyen d’[endpoints compatibles avec OpenAI](https://lmstudio.ai/docs/developer/openai-compat). C’est généralement l’option la plus simple si vous recherchez une configuration LLM locale avec une interface graphique.

### Installer un modèle dans LM Studio

1. Téléchargez le programme d’installation actuel depuis la [page de téléchargement officielle de LM Studio](https://lmstudio.ai/download).
2. Installez et ouvrez LM Studio.
3. Ouvrez la page **Discover** et recherchez un modèle.
4. Choisissez un modèle et une quantification adaptés à votre ordinateur. Si vous hésitez, les recommandations de LM Studio constituent un bon point de départ.
5. Attendez la fin du téléchargement du modèle.

Les petits modèles et les quantifications utilisant moins de bits consomment moins de RAM ou de VRAM. Un modèle trop volumineux pour la mémoire disponible peut se charger ou répondre lentement, voire ne pas démarrer.

### Démarrer le serveur API local de LM Studio

1. Ouvrez la page **Developer** de LM Studio.
2. Sélectionnez ou chargez le modèle téléchargé.
3. Ouvrez les paramètres du serveur.
4. Activez **Serve on Local Network** afin que Layla puisse atteindre le serveur depuis votre téléphone.
5. Conservez le port par défaut `1234`, sauf s’il est déjà utilisé par un autre programme.
6. Démarrez le serveur.
7. Si Windows demande l’autorisation de laisser passer LM Studio dans le pare-feu, autorisez uniquement les **Réseaux privés**.

LM Studio ne requiert pas d’authentification par défaut. Sa documentation recommande de l’activer lorsque le serveur écoute au-delà de `localhost`. Si vous activez **Require Authentication**, créez un jeton d’API dans LM Studio et saisissez-le dans le champ **Clé API** de Layla.

### Ajouter LM Studio à Layla

Dans la fenêtre **API OpenAI** de Layla, saisissez :

- **Nom :** LM Studio sur mon PC
- **Endpoint :** `http://YOUR-PC-IP:1234/v1/chat/completions`
- **Clé API :** Laissez vide, sauf si vous avez activé l’authentification de LM Studio
- **Modèle :** Appuyez sur **Rechercher des modèles** et sélectionnez le modèle téléchargé

Appuyez sur **Enregistrer les modifications**, laissez le serveur LM Studio actif, puis ouvrez un chat Layla. La conversation sera générée par le modèle sur votre ordinateur et renvoyée à Layla sur votre réseau local.

Pour utiliser les deux applications directement sous Windows, consultez [Comment exécuter Layla sur votre PC avec BlueStacks et LM Studio](/fr/how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio/).

## Exemple 2 : connecter Layla à Ollama

[Ollama](https://ollama.com/download) est un exécuteur de modèles locaux disponible sous Windows, macOS et Linux. Il intègre une [API compatible avec OpenAI](https://docs.ollama.com/api/openai-compatibility), accessible par défaut sur le port `11434`.

Les étapes suivantes concernent Ollama pour Windows. La documentation officielle d’Ollama fournit les instructions d’installation équivalentes pour les autres systèmes d’exploitation.

### Installer Ollama et télécharger un modèle

1. Téléchargez Ollama depuis la [page de téléchargement officielle](https://ollama.com/download).
2. Exécutez le programme d’installation et ouvrez Ollama.
3. Ouvrez Windows Terminal ou PowerShell.
4. Saisissez **ollama run llama3.2** pour télécharger et démarrer le modèle `llama3.2` utilisé dans cet exemple.
5. Attendez la fin du téléchargement, puis envoyez un court message de test.
6. Saisissez **/bye** lorsque vous souhaitez quitter le chat du terminal. Ollama continue de fonctionner en arrière-plan.

Vous pouvez utiliser un autre modèle de la bibliothèque Ollama. Dans ce cas, remplacez `llama3.2` dans cet exemple par le nom Ollama exact de votre modèle.

### Autoriser les connexions Ollama depuis le réseau local

Par défaut, Ollama écoute uniquement sur l’adresse `127.0.0.1` du PC. Modifiez son adresse d’écoute avant de connecter Layla :

1. Quittez Ollama depuis la zone de notification de la barre des tâches Windows.
2. Ouvrez les **Paramètres** Windows et recherchez **variables d’environnement**.
3. Choisissez **Modifier les variables d’environnement pour votre compte**.
4. Créez une variable utilisateur nommée **OLLAMA_HOST** avec la valeur **0.0.0.0:11434**.
5. Appliquez la modification, puis relancez Ollama depuis le menu Démarrer de Windows.
6. Si nécessaire, autorisez Ollama dans le Pare-feu Windows sur les réseaux privés.

L’écoute sur `0.0.0.0` permet aux appareils du réseau local d’atteindre Ollama. Cela ne signifie pas que vous devez exposer le port `11434` sur l’Internet public. Gardez-le derrière votre routeur et utilisez-le uniquement sur un réseau de confiance.

### Ajouter Ollama à Layla

Dans la fenêtre **API OpenAI** de Layla, saisissez :

- **Nom :** Ollama sur mon PC
- **Endpoint :** `http://YOUR-PC-IP:11434/v1/chat/completions`
- **Clé API :** Laissez vide
- **Modèle :** `llama3.2`, ou appuyez sur **Rechercher des modèles** et sélectionnez un modèle Ollama installé

Appuyez sur **Enregistrer les modifications**, puis démarrez une conversation. Ollama charge le modèle sélectionné à la réception de la requête ; la première réponse peut donc prendre plus de temps que les suivantes.

Si **Rechercher des modèles** ne renvoie aucun choix, vérifiez que le téléchargement du modèle est terminé et qu’Ollama a été redémarré après la modification de `OLLAMA_HOST`.

## Exemple 3 : connecter Layla à llama-server.exe

[`llama-server.exe`](https://github.com/ggml-org/llama.cpp/releases/latest) est le serveur Windows fourni avec llama.cpp. C’est une option légère pour exécuter un modèle GGUF sans gestionnaire de modèles de bureau distinct. La [documentation officielle du serveur llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) décrit son API compatible avec OpenAI, qui utilise le port `8080` par défaut.

Cette méthode nécessite une commande dans le terminal, mais aucune programmation ni compilation du code source si vous utilisez les fichiers Windows précompilés officiels.

### Télécharger llama.cpp et un modèle GGUF

1. Ouvrez la [dernière version officielle de llama.cpp](https://github.com/ggml-org/llama.cpp/releases/latest) sur GitHub.
2. Sous **Assets**, téléchargez le ZIP Windows x64 CPU actuel pour bénéficier de l’option de départ la plus largement compatible. Les versions CUDA, Vulkan, SYCL et HIP peuvent offrir une meilleure accélération sur le matériel pris en charge.
3. Extrayez l’intégralité du ZIP dans un nouveau dossier. Conservez toutes les DLL fournies à côté de `llama-server.exe`.
4. Téléchargez un modèle de chat ou instruct au format GGUF. Pour choisir un fichier et une quantification, consultez [Que sont les modèles GGUF et les quantifications de modèle ?](/fr/what-are-gguf-models-what-are-model-quants/).
5. Placez le fichier GGUF dans le dossier llama.cpp extrait et, si nécessaire, donnez-lui un nom court et facile à reconnaître.

Ne téléchargez pas un modèle de base, sauf si vous savez précisément comment le prompter. Un modèle de chat ou instruct convient aux conversations normales dans Layla.

### Démarrer llama-server.exe pour Layla

1. Ouvrez le dossier llama.cpp extrait dans l’Explorateur de fichiers.
2. Cliquez dans la barre d’adresse de l’Explorateur, saisissez **cmd**, puis appuyez sur Entrée. L’Invite de commandes s’ouvrira dans ce dossier.
3. Saisissez **llama-server.exe -m "your-model.gguf" --host 0.0.0.0 --port 8080**, en remplaçant `your-model.gguf` par le nom réel du fichier.
4. Laissez la fenêtre de l’Invite de commandes ouverte pendant l’utilisation de Layla.
5. Attendez que le serveur indique que le modèle est chargé et que le serveur HTTP est à l’écoute.
6. Si nécessaire, autorisez le serveur dans le Pare-feu Windows sur les réseaux privés.

La partie `--host 0.0.0.0` est nécessaire pour qu’un téléphone du réseau local puisse se connecter. Sans elle, llama.cpp écoute uniquement sur le PC. Le serveur fournit également une interface web à l’adresse de votre ordinateur sur le port `8080`, que vous pouvez ouvrir pour vérifier son démarrage.

### Ajouter le serveur llama.cpp à Layla

Dans la fenêtre **API OpenAI** de Layla, saisissez :

- **Nom :** llama.cpp sur mon PC
- **Endpoint :** `http://YOUR-PC-IP:8080/v1/chat/completions`
- **Clé API :** Laissez vide
- **Modèle :** Appuyez sur **Rechercher des modèles** et sélectionnez le modèle chargé

Appuyez sur **Enregistrer les modifications**, puis démarrez un chat Layla. Si vous fermez la fenêtre de l’Invite de commandes, le serveur s’arrête et Layla ne peut plus générer de réponse tant que vous ne l’avez pas relancé.

Pour renforcer la confidentialité sur un réseau partagé, llama.cpp peut être démarré avec une protection par clé API. Si vous activez cette option, utilisez la même clé dans Layla.

## Connecter Layla à un autre fournisseur d’API compatible avec OpenAI

Le même processus fonctionne avec une API d’IA hébergée, un serveur domestique, une machine équipée d’un GPU sur le réseau ou un autre moteur d’inférence local :

1. Vérifiez que le service prend en charge le chat completions compatible avec OpenAI en streaming.
2. Obtenez l’URL complète de chat completions du fournisseur.
3. Obtenez une clé API si le service en exige une.
4. Trouvez l’identifiant exact du modèle dans le tableau de bord ou la documentation du fournisseur.
5. Dans Layla, ouvrez **Paramètres d’inférence** > **Ajouter un modèle personnalisé** > **API OpenAI**.
6. Saisissez le nom, l’endpoint, la clé et le modèle.
7. Appuyez sur **Rechercher des modèles** si le service expose une liste de modèles compatible avec OpenAI.
8. Enregistrez la connexion et testez-la dans un nouveau chat.

Pour un endpoint hébergé sur Internet, utilisez exactement l’URL sécurisée `https://` indiquée par le fournisseur. N’ajoutez pas `/v1/chat/completions` si le fournisseur vous donne déjà une route complète et ne supprimez aucun segment de chemin propre à ce fournisseur.

Vous pouvez enregistrer plusieurs connexions API dans **Mes modèles** et passer de l’une à l’autre. Pour conserver ensemble une connexion, un prompt, une persona et un préréglage d’échantillonnage, consultez [Fonctionnement des moteurs d’inférence enregistrés dans Layla](/fr/how-saved-inference-engines-work-in-layla/).

## Considérations relatives à la confidentialité et à la sécurité

Une API locale compatible avec OpenAI peut conserver l’inférence du modèle de langage sur le matériel que vous contrôlez. Lorsque Layla se connecte à LM Studio, Ollama ou llama.cpp sur votre réseau domestique, le contenu du chat est envoyé du téléphone vers votre PC plutôt que vers un fournisseur commercial de modèles.

Il s’agit d’une inférence sur le réseau local, et non d’une inférence sur l’appareil. Le modèle fonctionne sur l’ordinateur, qui doit rester accessible depuis le téléphone. Après le téléchargement des applications et modèles requis, votre routeur n’a pas besoin d’une connexion Internet. Certaines fonctions de Layla ou certains outils tiers peuvent toutefois avoir leurs propres exigences en ligne.

N’exposez pas un serveur LLM local sans authentification à un Wi-Fi public et ne redirigez pas son port depuis votre routeur Internet. Toute personne capable d’atteindre un serveur non sécurisé pourrait utiliser le modèle et consommer les ressources de votre ordinateur. Activez l’authentification lorsqu’elle est disponible, limitez l’accès du pare-feu aux réseaux privés de confiance et arrêtez le serveur lorsque vous n’en avez plus besoin.

Avec un endpoint OpenAI compatible dans le cloud, la conversation quitte votre appareil et est traitée conformément aux règles de confidentialité et de conservation des données du fournisseur. Consultez-les avant d’envoyer des chats privés ou des informations personnelles.

## Résoudre les problèmes de connexion compatible avec OpenAI

### Layla indique que l’endpoint ou le modèle est introuvable

Une erreur `404` signifie généralement que l’endpoint est incomplet ou que l’identifiant du modèle ne correspond pas. Vérifiez que l’URL se termine par le chemin complet de chat completions requis par le serveur, généralement `/v1/chat/completions`, puis utilisez **Rechercher des modèles** ou recopiez le nom exact du modèle.

### Layla ne parvient pas à se connecter au PC

Vérifiez les points suivants :

- Le serveur LLM local fonctionne et le chargement du modèle est terminé.
- Le téléphone et le PC sont connectés au même réseau Wi-Fi ou local.
- L’endpoint utilise l’adresse IPv4 privée du PC plutôt que `localhost` ou `127.0.0.1`.
- **Serve on Local Network** est activé dans LM Studio, `OLLAMA_HOST` est configuré pour Ollama, ou llama.cpp a été démarré avec `--host 0.0.0.0`.
- Le Pare-feu Windows autorise le serveur sur les réseaux privés.
- Aucun VPN, réseau Wi-Fi invité ou mécanisme d’isolation des clients du routeur n’empêche la communication entre les appareils.

### Layla reçoit une erreur d’authentification

Une erreur `401` ou `403` indique généralement une clé API manquante ou incorrecte. Recopiez le jeton sans ajouter le mot « Bearer » ; Layla ajoute elle-même ce format d’authentification à la requête. Pour un serveur local non sécurisé, désactivez toute exigence d’authentification activée par erreur ou laissez le champ de la clé vide.

### La liste des modèles est vide

Vérifiez qu’au moins un modèle est téléchargé et disponible pour le serveur. LM Studio doit disposer d’un modèle accessible à son serveur, Ollama doit avoir téléchargé le modèle et un serveur llama.cpp à modèle unique doit avoir terminé le chargement de son fichier GGUF. Vous pouvez également saisir manuellement l’identifiant exact du modèle.

### Le serveur fonctionne sur le PC, mais pas dans Layla

L’ouverture de `localhost` sur le PC prouve uniquement que le serveur fonctionne localement. Vérifiez de nouveau l’adresse d’écoute réseau, l’adresse IP du PC et le pare-feu. Certains réseaux Wi-Fi invités ou publics bloquent volontairement les communications entre les appareils connectés.

### La connexion ne fonctionne plus après un redémarrage

Les serveurs de LM Studio et llama.cpp peuvent devoir être relancés. Ollama fonctionne normalement en arrière-plan, mais doit être redémarré après une modification des variables d’environnement. Votre routeur peut également attribuer une nouvelle adresse IP au PC après un redémarrage ; si elle a changé, mettez à jour l’endpoint enregistré dans Layla.

### Les réponses sont lentes

La vitesse d’inférence dépend de la taille et de la quantification du modèle, de la RAM ou VRAM disponible, du CPU, du GPU, de la longueur du contexte et de la qualité du réseau. Essayez un modèle plus petit ou une quantification plus compressée, fermez les applications gourmandes en mémoire et maintenez le téléphone sur un réseau local stable.

## Questions fréquentes

### Layla peut-elle utiliser un LLM local exécuté sur mon PC ?

Oui. Exécutez le modèle avec un serveur local compatible avec OpenAI, tel que LM Studio, Ollama ou llama.cpp, activez l’accès depuis le réseau local, puis saisissez l’endpoint de chat completions du PC dans Layla.

### Puis-je connecter Layla à Ollama sur Android ?

Oui. Ollama fonctionne sur l’ordinateur tandis que Layla fonctionne sur Android. Configurez Ollama pour écouter sur le réseau local, puis utilisez `http://YOUR-PC-IP:11434/v1/chat/completions` comme endpoint dans Layla.

### Une clé API est-elle nécessaire pour un serveur LLM local ?

Pas par défaut pour les trois exemples de cet article. Si vous activez l’authentification dans LM Studio ou llama.cpp, saisissez le jeton correspondant dans Layla. Les fournisseurs distants exigent généralement leur propre clé API.

### Cette configuration peut-elle fonctionner sans connexion Internet ?

Oui, lorsque le modèle et le serveur se trouvent sur votre propre PC et que les deux appareils restent connectés au même réseau local. Une connexion Internet est nécessaire pour le téléchargement initial des applications et des modèles. Les API cloud nécessitent toujours une connexion Internet.

### Le modèle fonctionne-t-il sur mon téléphone ?

Pas dans ces trois configurations. Layla sert d’interface de chat et de client API ; le modèle de langage fonctionne sur le PC. Pour exécuter un modèle directement sur le téléphone, importez plutôt un modèle local compatible. Consultez [Comment ajouter un modèle d’IA personnalisé à Layla](/fr/how-to-add-custom-models-to-layla/).

### Puis-je utiliser OpenRouter ou un autre fournisseur cloud ?

Oui, à condition que le service propose une API de chat completions en streaming compatible. Utilisez l’endpoint complet, la clé API et l’identifiant du modèle indiqués par le fournisseur.

Une API compatible avec OpenAI fournit à Layla un moyen commun de communiquer avec de nombreux modèles de langage locaux et hébergés. Avec LM Studio, Ollama ou llama.cpp sur un réseau local de confiance, vous pouvez utiliser Layla comme interface d’assistant IA privé tandis que votre PC prend en charge l’inférence du LLM local.
