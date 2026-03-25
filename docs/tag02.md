# Tag 02 – Decks erstellen & speichern

## Screenshots

![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag2-2.png)
![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag2.png)

## Was wurde gemacht

Heute habe ich meine Flashcard-App so erweitert, dass man neue Decks erstellen und speichern kann. Dafür habe ich in `create.tsx` ein Eingabefeld eingebaut, in dem man einen Titel für ein neues Deck eingeben kann. Die Eingabe wird mit `useState` gespeichert und vor dem Speichern überprüft, damit keine leeren Titel möglich sind.

Beim Klick auf „Speichern“ wird ein neues Deck erstellt und im AsyncStorage gespeichert. Zusätzlich habe ich jedes Deck so erweitert, dass es automatisch drei Beispiel-Cards mit Frage und Antwort enthält. Danach wird man wieder auf die Startseite zurückgeleitet.

In `index.tsx` werden alle gespeicherten Decks geladen und mit einer `FlatList` angezeigt. Die Decks erscheinen in einem zweispaltigen Grid und sind anklickbar, sodass man auf die Detailseite gelangt.
Auf der Detailseite kann man bis jetzt nur eine ID sehen, die aus dem AsyncStorage geladen wurde.

## Herausforderungen

Am Anfang hatte ich Probleme mit TypeScript, vor allem mit dem Fehler „Property does not exist on type 'never'“. Das lag daran, dass ich den Typ für meine Decks nicht definiert hatte. Ausserdem war es nicht ganz einfach zu verstehen, wie AsyncStorage funktioniert und wie man Daten richtig speichert und wieder lädt.

Ein weiteres Problem war, dass ich zuerst nicht sauber auf meinem bestehenden Code aufgebaut habe, was zu Fehlern geführt hat. Nachdem ich das angepasst habe, hat alles besser funktioniert.

## Fazit

Ich habe heute gelernt, wie man Daten lokal speichert und wieder lädt. Ausserdem habe ich einigermassen verstanden, wie man mit State arbeitet und Inhalte in einer Liste darstellt. Die App ist jetzt deutlich weiter als gestern, da man bereits eigene Decks erstellen kann. Ich bin zufrieden mit meinem Fortschritt und freue mich weiterhin konzentriert und produktiv weiterzuarbeiten.
