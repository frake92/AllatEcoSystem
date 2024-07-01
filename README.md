# AllatEcoSystem
 Bemelegítő projekt
## A projekt terve
 Vanilla JS projekt, melynek lényege egy webes Állat ecosystem applikáció.
 A projekt HTML - CSS - JavaScript nyelven van megvalósítva
### Vágyálom rendszer
### Projekt élőlényei
 Légy, kacsa, pocok, nyúl, macska, kutya, őz, farkas, oroszlán, elefánt
 A való élethez hűen a légy a tápláléklánc alján helyezkedik el, őt megeszi a kacsa, a kacsa eszik még növényt, a pockot a kutya, és így tovább. 
 Projekt növényei: fű, bokor, fa, répa.

#### Mechanizmus
 Az állatok, ha eg bizonyos távolságra vannak egymástól, akkor a táplálékláncon feljebb levő állat megeheti(random eséllyel) a kisebb állatot. A növény evőknek lehetőségük van a pályán legenerált növényeket megenni, feltéve ha éhesek. Az állatoknak van éhségük, mely fél percenként csökken, ha egy bizonyos szintet elér az éhségük éhen halnak. Az állatok húsa ott marad, hogy a húsevők tudjanak mit fogyasztani. 

#### Mérföldkövek
 1. Főtér kialakítása
 2. Állat és növény osztályok létrehozása
 3. Mozgások implementálása
 4. Tápláléklánc törvényeinek implementálása
 5. Evés mechanizmusának implementálása a tápláléklénc alapján
 6. Éhség implementálása


#### Feladatok kiosztása
 Első mérföldkő részletei:
 Spriteok keresése
 1. Fű 
 2. Állatok - Réka, Jani
 3. Növények - Benji

 Második mérföldkő részletei:
 1. Növényevők - Barna (élőlények impl.)
 2. Húsevők - Réka (élőlények impl.)
 3. Növények - Jani (megéve metódus)
 4. Élőlények - Benji (evés, mozgás, halál metódus)
 5. Specifikus állat osztályok
 Légy, kacsa | pocok, nyúl | macska, kutya | őz, farkas | oroszlán, elefánt |
 Randomizálás futáshoz, és egyéb tevékenységekhez

 Harmadik mérföldkő részletei:
 1. Alap mozgás implementálása és bereferenciálása
 2. Spriteok megfelelő mozgatásáért felelős metódusok megírása
 3. CSS

 Negyedik mérföldkő részletei:
 1. Törvények meghatározása
 2. Implementálás külön fájlokba:
 Növényevők törvényei, húsevők törvényei.

 Ötödik mérföldkő részletei:
 1. Evés metódusok implementálása a különböző fajoknak
 2. törvények használata

 Hatodik mérföldkő részletei:
 1. Minden osztály külön éhségi szintjének meghatározás
 2. Hunger System implementálása

 



