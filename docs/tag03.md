# Tag 03 – Decks visualisieren und Detailseite vorbereiten

## Screenshots

![Screenshot von einem Android Gerät mit einem aktuellen Stand der Expo-App](/img/expo-app-tag3.png)  

## Was gemacht wurde

Heute habe ich meine Flashcard-App so erweitert, dass die Startseite optisch ansprechender wirkt. Die gespeicherten Decks werden nun als visuelle Karten dargestellt.  

Der Button oben auf der Startseite wurde in „+ Deck erstellen“ umbenannt. Wenn man darauf klickt, gelangt man zur Seite `/create`. Die Decks werden jetzt in einem zweispaltigen Grid angezeigt. Jede Deck-Karte hat einen LinearGradient als Platzhalterfarbe. Auf der Karte sieht man den Titel des Decks und die Anzahl der Karten.  

Wenn man auf eine Deck-Karte klickt, gelangt man zur Detailseite. Hält man die Karte länger gedrückt, erscheint ein Alert-Menü mit Platzhalteroptionen. Das Styling habe ich komplett in die Datei `styles.ts` ausgelagert, damit der Code sauber und übersichtlich bleibt.  

Auf der Detailseite wird momentan nur die Deck-ID angezeigt. In den nächsten Tagen möchte ich dort den Titel und die Karten sichtbar machen.  

## Herausforderungen

Am Anfang trat ein Fehler auf: `Cannot read property 'length' of undefined`. Der Fehler entstand, weil neue Decks ohne `cards`-Array gespeichert wurden. Ich habe das Problem gelöst, indem ich beim Erstellen eines Decks immer ein leeres `cards`-Array initialisiere.  

Ausserdem mussten die TypeScript-Typen genau definiert werden, damit der Zugriff auf die Eigenschaften `cards` und `title` fehlerfrei funktioniert. Die Umsetzung des zweispaltigen Grids mit LinearGradient und TouchableOpacity erforderte zudem ein wenig Feinabstimmung bei den Styles und Abständen.  

## Fazit

Heute habe ich gelernt, wie man lokale Daten lädt und dynamisch in einer FlatList darstellt. Ich habe gelernt, Klick- und LongPress-Interaktionen korrekt umzusetzen. Ausserdem habe ich UI-Komponenten mit LinearGradient ansprechend gestaltet und Styles sauber ausgelagert und wiederverwendet.  

Die App ist jetzt deutlich benutzerfreundlicher und übersichtlicher. Ich bin zufrieden mit dem Fortschritt und freue mich darauf, in den nächsten Tagen die Detailseite und die Kartendarstellung umzusetzen.