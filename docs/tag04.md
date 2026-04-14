# Tag 04 – Tab Navigation, FAB & Karten erstellen

## Screenshots

![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag4.png)  
![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag4(4).png)  
![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag4(2).png)  
![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag4(3).png)  

## Was gemacht wurde

Heute habe ich die App-Struktur grundlegend angepasst und neue Funktionen eingebaut.

Als erstes habe ich einen neuen Ordner `(tabs)` erstellt und die Dateien `index.tsx` und `create.tsx` dorthin verschoben. Die Klammern im Ordnernamen sind Pflicht – `expo-router` erkennt dadurch, dass diese Screens Teil einer Tab-Navigation sind. Danach habe ich in `app/(tabs)/_layout.tsx` die Tab-Bar mit `<Tabs>` konfiguriert. Die zwei Tabs heissen „Home" und „Erstellen" und haben je ein Icon aus `@expo/vector-icons`.

Den alten „+ Deck erstellen" Button oben in der Mitte habe ich durch einen Floating Action Button (FAB) ersetzt. Der FAB ist ein runder Button, der mit `position: 'absolute'` über dem restlichen Inhalt schwebt und unten rechts positioniert ist. Das dazugehörige Styling habe ich in `styles.tsx` ergänzt.

Auf der Deck-Detailseite habe ich ebenfalls einen FAB eingebaut. Wenn man darauf tippt, öffnet sich ein Modal mit zwei Eingabefeldern für Frage und Antwort. Nach dem Speichern wird die neue Karte sofort in der Liste angezeigt und bleibt auch nach einem App-Neustart erhalten, da sie in `AsyncStorage` gespeichert wird. Die bisherigen Testkarten wurden entfernt – es werden jetzt nur noch echte gespeicherte Karten angezeigt.

## Herausforderungen

Zuerst wurden vier Tabs angezeigt statt zwei, weil `expo-router` automatisch alle Dateien im Projekt als Tabs erkannt hat, also auch `styles.tsx` und `[deckId].tsx`. Das Problem habe ich gelöst, indem ich diese Screens mit `href: null` aus der Tab-Bar ausgeblendet habe.

Ausserdem hat der Screen-Name im Layout nicht funktioniert. Ich hatte `"(tabs)/index"` geschrieben, aber `expo-router` erwartet innerhalb des `(tabs)/_layout.tsx` nur `"index"` ohne Pfadpräfix.

## Fazit

Heute habe ich gelernt, wie `expo-router` Ordnerstrukturen mit Klammern als Navigationsgruppen interpretiert und wie man eine Tab-Bar korrekt konfiguriert. Ich habe das FAB-Muster kennengelernt und verstanden, wann und warum man es einsetzt. Ausserdem habe ich zum ersten Mal ein Modal in React Native verwendet, um Benutzereingaben zu erfassen.

Die App hat jetzt eine richtige Navigation und man kann innerhalb eines Decks eigene Karten erstellen und speichern. Das ist ein grosser Schritt vorwärts gegenüber gestern.
