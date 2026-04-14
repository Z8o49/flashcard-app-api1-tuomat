# Tag 05 – Deck löschen & Farbverlauf

## Was gemacht wurde

Heute habe ich zwei bestehende Dateien erweitert: `index.tsx` und `create.tsx`.

In `index.tsx` habe ich die Funktion `handleLongPress` ausgebaut. Bisher hat sie nur einen einfachen Alert ohne weitere Funktion angezeigt. Jetzt öffnet sich beim langen Drücken auf ein Deck ein Bestätigungsdialog mit zwei Buttons: „Abbrechen" und „Löschen". Wenn der Benutzer „Löschen" bestätigt, wird das Deck mit `filter()` aus der Liste entfernt, die aktualisierte Liste wird mit `AsyncStorage.setItem()` gespeichert und der lokale State wird sofort mit `setDecks()` aktualisiert. Das UI reagiert dadurch ohne Neuladen sichtbar.

Zusätzlich habe ich den `LinearGradient` angepasst. Vorher waren die Farben fix auf `#6a11cb` und `#2575fc` gesetzt, jetzt wird die gespeicherte Farbe des jeweiligen Decks verwendet. Als Fallback, falls keine Farbe vorhanden ist, wird `#ccc` angezeigt. Der Verlauf geht von der Deck-Farbe zu Weiss.

In `create.tsx` habe ich dafür gesorgt, dass jedes neue Deck beim Erstellen automatisch eine zufällige Farbe erhält. Dazu habe ich ein `DECK_COLORS`-Array mit zwölf Farben definiert und eine Funktion `getRandomColor()` geschrieben, die zufällig eine davon auswählt. Diese Farbe wird zusammen mit dem Deck in `AsyncStorage` gespeichert, damit sie beim nächsten Laden der App noch vorhanden ist.

## Herausforderungen

Der `LinearGradient` hat zwei Farben als Array erwartet. Es war wichtig, den Fallback-Wert `#ccc` korrekt zu setzen, damit kein Fehler entsteht, wenn ältere Decks noch keine gespeicherte Farbe haben.

Ausserdem musste ich darauf achten, dass beim Löschen nicht nur der lokale State aktualisiert wird, sondern auch `AsyncStorage` – sonst wären die gelöschten Decks nach einem Neustart wieder erschienen.

## Fazit

Heute habe ich gelernt, wie man mit `Alert.alert()` einen Bestätigungsdialog mit mehreren Buttons erstellt und wie man einen Eintrag aus einer Liste löscht und diesen in `AsyncStorage` korrekt nachführt. Ausserdem habe ich verstanden, wie man Daten beim Erstellen eines Eintrags mitgibt, in diesem Fall eine zufällige Farbe, damit sie später in der Anzeige verwendet werden können.

Die App sieht jetzt deutlich lebendiger aus, weil jedes Deck seinen eigenen Farbverlauf hat. Und das Löschen funktioniert sauber mit einem Bestätigungsdialog, was sich auch für den Benutzer gut anfühlt.
