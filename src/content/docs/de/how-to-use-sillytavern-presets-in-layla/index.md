---
title: So verwenden Sie SillyTavern-Presets in Layla
description: Importieren Sie ein SillyTavern-Chat-Completion-Preset in Layla, lesen Sie die Angaben auf der Preset-Karte und weisen Sie es Ihren Charakteren für Offline-KI-Rollenspiel auf Android zu.
category: Characters & voice
order: 45
keywords:
  - SillyTavern-Presets
  - SillyTavern auf Android
  - SillyTavern-Preset-Import
  - Prompt-Manager-Preset
  - Offline-KI-Rollenspiel
  - KI-Charakter-Prompts
  - Offline-KI für Android
  - unzensierter KI-Chat
lastUpdated: 2026-09-03
translationKey: how-to-use-sillytavern-presets-in-layla
ai_translated: true
---

**Ein SillyTavern-Preset ist eine JSON-Datei, die festlegt, welche Prompts an ein Modell gesendet werden, in welcher Reihenfolge das geschieht und welche davon aktiv sind. Layla kann diese Dateien importieren und daraus den Prompt für jeden Charakter aufbauen, dem Sie sie zuweisen.** Alles läuft auf Ihrem Gerät; der Import eines Presets sendet es nirgendwohin.

Dieser Leitfaden behandelt die Installation der Mini-App SillyTavern-Presets, den Export eines Presets aus SillyTavern, den Import in Layla, das Lesen der Angaben auf einer Preset-Karte, das Zuweisen von Presets an Charaktere sowie die Teile eines Presets, die Layla bewusst nicht ausführt.

## Was ein SillyTavern-Preset tatsächlich enthält

In SillyTavern wird ein Chat-Completion-Preset über den Prompt Manager verwaltet. Es enthält eine Liste benannter Prompts — Haupt-Prompt, Charakterbeschreibung, Persönlichkeit, Szenario, Persona-Beschreibung, Dialogbeispiele, Chatverlauf, Anweisungen nach dem Verlauf und alle vom Autor ergänzten benutzerdefinierten Prompts — sowie eine Prompt-Reihenfolgeliste, die angibt, welche Prompts aktiviert sind und in welcher Abfolge sie stehen.

Preset-Autoren bauen damit ausgefeilte Prompt-Systeme: mehrteilige Anweisungsstapel, Formatierungsregeln, Prompts, die in einer festen Tiefe der Unterhaltung eingefügt werden, und Prompts, die nur bei bestimmten Generierungsarten greifen. Wenn jemand ein „Preset“ für Rollenspiel teilt, ist genau diese Datei gemeint.

Zwei Dinge sollten Sie vor dem Import wissen:

- Layla liest **Chat-Completion-Presets** — also Dateien mit einer Prompt-Liste und einer Prompt-Reihenfolgeliste. Text-Completion-Presets, die nur Sampler-Werte enthalten, sind ein anderes Dateiformat und werden beim Import abgelehnt.
- Ein Preset betrifft den **Aufbau des Prompts**, nicht das Modell. Es lädt kein Modell herunter und ändert nicht, welches Modell Sie ausführen. Siehe [wie Sie ein benutzerdefiniertes KI-Modell zu Layla hinzufügen](/how-to-add-custom-models-to-layla/), wenn Sie zusätzlich das Modell wechseln möchten.

## Die Mini-App SillyTavern-Presets installieren

Die Preset-Verwaltung ist eine optionale Layla-Mini-App.

1. Öffnen Sie in Layla **Meine Apps** oder tippen Sie auf dem ersten Bildschirm auf **Mini-Apps hinzufügen**.
2. Tippen Sie auf das Pluszeichen, um die verfügbaren Mini-Apps zu durchsuchen.
3. Suchen Sie **SillyTavern-Presets** und fügen Sie die App hinzu.
4. Öffnen Sie **SillyTavern-Presets** über **Meine Apps**.

Für diese Mini-App gibt es nichts herunterzuladen, sie ist daher sofort verfügbar. Mehr zum Hinzufügen und Entfernen von Funktionen finden Sie unter [wie Sie Funktionen (Mini-Apps) in Layla hinzufügen](/how-to-add-features-mini-apps-in-layla/).

## Ein Preset aus SillyTavern exportieren

Wenn Sie die `.json`-Datei bereits haben — vom Autor veröffentlicht oder von einem Bekannten erhalten — können Sie diesen Abschnitt überspringen.

Um aus Ihrer eigenen SillyTavern-Installation zu exportieren, öffnen Sie das Panel **AI Response Configuration** (das Regler-Symbol in der oberen Leiste), suchen Sie oben das Auswahlmenü **Chat Completion Presets**, wählen Sie das gewünschte Preset und nutzen Sie die Export-Schaltfläche daneben. SillyTavern speichert es als `.json`-Datei.

Sie können die Datei auch direkt aus Ihrem SillyTavern-Datenordner kopieren. Chat-Completion-Presets liegen in `data/<Ihr-Benutzerkürzel>/OpenAI Settings/`.

Übertragen Sie die Datei auf die übliche Weise auf Ihr Telefon — per Kabel, Cloud-Speicher oder indem Sie sie sich selbst schicken. Layla braucht nur, dass die Datei für die Android-Dateiauswahl erreichbar ist.

## Das Preset in Layla importieren

1. Öffnen Sie die Mini-App **SillyTavern-Presets**.
2. Tippen Sie auf **Preset importieren**.
3. Wählen Sie die `.json`-Datei auf Ihrem Gerät aus.

Layla prüft die Datei, bevor sie gespeichert wird. Sie muss auf `.json` enden, gültiges JSON sein und sowohl eine Prompt-Liste als auch eine nicht leere Prompt-Reihenfolgeliste enthalten. Fehlt etwas davon, zeigt Layla einen Fehler mit der Ursache an — etwa dass das Preset kein gültiges JSON ist oder dass einem Prompt-Eintrag der Bezeichner fehlt — und es wird nichts importiert.

Wenn Sie ein Preset mit einem bereits vorhandenen Dateinamen importieren, behält Layla beide und hängt an das neue eine Nummer an, statt Ihre bestehende Datei zu überschreiben. Presets werden nach zuletzt geändert sortiert aufgelistet, und Sie können die Liste durch Herunterziehen aktualisieren.

## Die Preset-Karte lesen

Jedes importierte Preset erhält eine Karte. Der große Name ist der interne Name des Presets; die kleinere Zeile darunter ist der Dateiname, unter dem Layla es gespeichert hat. Die Karte lohnt sich zu lesen, denn Presets unterscheiden sich enorm, und so erkennen Sie auf einen Blick, was Sie gerade importiert haben.

Die drei zusammenfassenden Zahlen sind:

- **Aktivierte Prompts** — wie viele Prompts des Presets von insgesamt wie vielen eingeschaltet sind. Ein Preset mit 40 Prompts, von denen 12 aktiv sind, ist normal; den Rest hat der Autor deaktiviert.
- **System / Benutzer / Assistent** — wie sich die aktivierten Prompts auf die drei Nachrichtenrollen verteilen.
- **Dateigröße** — vor allem nützlich, um ein ungewöhnlich großes Preset zu erkennen.

Darunter zeigt Layla Chips für alles, was das Preset angibt: die Kontext- und Ausgabe-Token-Grenzen, die Temperatur, wie viele der aktivierten Prompts Marker sind, wie viele Tiefeninjektionen es gibt, wie viele Hilfs-Prompt-Einstellungen belegt sind und wie viele Regex-Skripte die Datei enthält. Einige Chips sind als Warnhinweise statt als bloße Angaben hervorgehoben:

- **Haupt-Prompt überschrieben** — das Preset ersetzt den System-Haupt-Prompt durch eigenen Text.
- **Benutzerdefinierte System-Prompts** — das Preset ergänzt eigene Prompts mit Systemrolle.
- **System-Prompts deaktiviert** — das Preset hat System-Prompts vollständig abgeschaltet.
- **Jailbreak aktiviert** — der Prompt für die Anweisungen nach dem Verlauf enthält Text. In SillyTavern wird dieser Prompt herkömmlich „Jailbreak“ genannt; er ist schlicht der letzte Anweisungsblock vor der Generierung.

Hat Layla beim Einlesen der Datei etwas Auffälliges gefunden, erscheint neben dem JSON-Preset-Abzeichen ein Abzeichen **Warnungen**. Tippen Sie darauf, um die Einzelheiten aufzuklappen. Häufige Warnungen sind, dass das Preset eine veraltete oder nicht standardisierte Prompt-Reihenfolge verwendet oder eine Erweiterung enthält, die Layla speichert, aber nicht ausführt. Warnungen sind informativ — das Preset funktioniert weiterhin — sie sagen Ihnen aber, welche Teile der Absicht des Autors den Weg nicht überstehen.

## Ein Preset Ihren Charakteren zuweisen

Ein Preset bewirkt nichts, solange kein Charakter es verwendet. Es gibt zwei Wege, diese Verbindung herzustellen.

**Über die Preset-Karte.** Tippen Sie unten auf der Karte auf **Zugewiesene Charaktere**, wählen Sie die Charaktere aus, die dieses Preset verwenden sollen, und schließen Sie die Auswahl mit dem **X** oder durch Tippen daneben. Ihre Auswahl wird beim Schließen gespeichert.

**Über den Charakter-Editor.** Öffnen Sie einen Charakter zur Bearbeitung, gehen Sie auf den Tab **Erweitert** und tippen Sie unter **Presets & Wissen** auf **SillyTavern-Preset**. Wählen Sie ein Preset aus der Liste und speichern Sie den Charakter.

Aus der Art der Speicherung folgen zwei Regeln:

- Ein Charakter kann **jeweils ein Preset** verwenden. Weisen Sie ihn einem zweiten Preset zu, wird die Verbindung zum ersten gelöst.
- Nur Charaktere, die **Sie erstellt oder importiert haben**, lassen sich zuweisen. Laylas eingebaute Standardcharaktere erscheinen nicht in der Auswahl. Wenn Sie ein Preset mit einer eingebauten Persönlichkeit nutzen möchten, kopieren Sie diese zuerst in einen eigenen Charakter — siehe [wie Sie einen eigenen KI-Charakter in Layla erstellen](/how-do-i-create-custom-characters/) und [wie Sie TavernPNG-Charaktere in Layla importieren](/how-to-import-tavernpng-characters-in-layla/).

Sobald einem Charakter ein Preset zugewiesen ist, baut Layla den Prompt dieses Charakters bei jedem Chat aus dem Preset auf. Aktivierte Prompts werden in der Reihenfolge des Presets zusammengesetzt, Marker-Prompts mit Beschreibung, Persönlichkeit, Szenario und Dialogbeispielen des Charakters sowie Ihrer Persona-Beschreibung gefüllt, der Chatverlauf wird dort eingesetzt, wo das Preset ihn vorsieht, und tiefeninjizierte Prompts werden an der konfigurierten Tiefe der Unterhaltung eingefügt. Makros werden wie in SillyTavern ausgewertet, darunter `{{char}}`, `{{user}}`, `{{persona}}`, `{{description}}`, `{{personality}}`, `{{scenario}}` und `{{lastmessage}}`, die Datums- und Zeitmakros, die Würfel- und Zufallsauswahlen sowie die Makros für lokale und globale Variablen. Ein Makro, das Layla nicht kennt, bleibt unverändert stehen, statt stillschweigend entfernt zu werden.

## Was ein Preset nicht ändert

Presets sind Prompt-Dateien, und Layla führt deren Prompt-Teil originalgetreu aus. Manches in der Datei wird gespeichert und angezeigt, aber nicht angewendet:

- **Sampler- und Kontexteinstellungen.** Temperatur, Kontextgrenze und Ausgabe-Token-Grenze auf der Karte beschreiben, was das Preset verlangt. Für die Generierung gelten weiterhin Laylas eigene Inferenzeinstellungen. Ändern Sie diese stattdessen in den Einstellungen Ihrer Inferenz-Engine — siehe [wie gespeicherte Inferenz-Engines in Layla funktionieren](/how-saved-inference-engines-work-in-layla/).
- **Regex-Skripte und Erweiterungsdaten.** Layla zählt sie und behält sie in der Datei, führt sie aber nicht aus.
- **Platzierung von World Info.** Die World-Info-Marker des Presets werden erkannt, aber Layla speist derzeit keinen Lorebook-Text hinein.
- **Die Prompt-Vorlage des Modells.** Das Preset bestimmt Inhalt und Reihenfolge der Nachrichten; die Chat-Vorlage, die sie umschließt, gehört zum Modell. Siehe [wie Sie benutzerdefinierte Prompt-Vorlagen für Modelle einrichten](/how-to-set-up-custom-prompt-templates-for-models/).

Nichts davon hindert ein Preset daran zu funktionieren. Es bedeutet allerdings, dass ein Preset, das um die Eigenheiten eines bestimmten Cloud-Modells herum gebaut wurde, auf einem lokalen Modell anders wirken kann — daran lohnt es sich zu denken, wenn ein von anderen gelobtes Preset bei Ihnen seltsam liest.

## Presets verwalten und entfernen

Tippen Sie auf einer Karte auf das Papierkorb-Symbol, um ein Preset zu löschen; Layla fragt zuvor nach einer Bestätigung. Beim Löschen wird die Datei von Ihrem Gerät entfernt. Charaktere, denen es zugewiesen war, verwenden dann kein Preset mehr und fallen auf Laylas normalen Prompt-Aufbau zurück.

Da Presets gewöhnliche Dateien sind, ist es eine sinnvolle Gewohnheit, die ursprüngliche `.json` außerhalb von Layla aufzubewahren — vor allem, wenn Sie sie bearbeitet haben oder sie aus einer Quelle stammt, die Sie womöglich nicht wiederfinden.

## Häufig gestellte Fragen

### Kann ich SillyTavern-Presets offline verwenden?

Ja. Import, Speicherung und Anwendung eines Presets geschehen alle auf Ihrem Gerät. Wenn Sie ein lokales GGUF-Modell verwenden, funktioniert der gesamte Chat — inklusive Preset — ohne Internetverbindung.

### Warum wurde mein Preset beim Import abgelehnt?

Der häufigste Grund ist, dass die Datei ein Text-Completion-Preset oder eine Einstellungssicherung ist statt eines Chat-Completion-Presets. Layla verlangt sowohl eine Prompt-Liste als auch eine Prompt-Reihenfolgeliste. Auch eine fehlerhafte oder abgeschnittene JSON-Datei wird abgelehnt, und die Fehlermeldung benennt das konkrete Problem.

### Überschreibt der Import eines Presets die Persönlichkeit meines Charakters?

Nein. Beschreibung, Persönlichkeit und Szenario des Charakters bleiben Ihre; das Preset entscheidet nur, wie und in welcher Reihenfolge sie dem Modell vorgelegt werden. Ein Preset, das den Haupt-Prompt überschreibt, ändert die Anweisung um Ihren Charakter herum, nicht den Charakter selbst.

### Können zwei Charaktere dasselbe Preset verwenden?

Ja. Weisen Sie einem Preset so viele Charaktere zu, wie Sie möchten. Umgekehrt gilt das nicht: Jeder Charakter verwendet genau ein Preset.

### Was bedeutet die Reihenfolgenummer auf der Karte?

Sie ist der Bezeichner des Prompt-Reihenfolgeblocks, den Layla aus der Datei ausgewählt hat. `100001` ist der aktuelle SillyTavern-Standard. Enthält Ihr Preset nur einen älteren `100000`-Block oder einen nicht standardisierten, verwendet Layla ihn und gibt eine Warnung aus, damit Sie wissen, welcher Reihenfolge gefolgt wurde.

### Brauche ich eine SillyTavern-Installation, um Presets in Layla zu nutzen?

Nein. Sie brauchen nur die `.json`-Datei. Viele Preset-Autoren veröffentlichen ihre Dateien direkt, und Layla importiert sie, ohne dass SillyTavern zu irgendeinem Zeitpunkt beteiligt wäre.

Presets sind ein Beispiel dafür, dass Layla die Formate des breiteren lokalen KI-Ökosystems spricht: GGUF-Modelle, TavernPNG-Charakterkarten und SillyTavern-Presets lassen sich alle in eine Android-App importieren, die offline läuft — ohne Abo und ohne Konto.
