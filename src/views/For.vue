<template>
    <div id="for-loop" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise">
                <template slot="intro">
                    <h1><code>for</code> Loop</h1>
                    <p class="lead text-black-50">Wie eine While-Schleife, die du <strong class="text-body">ohne Hilfsvariablen</strong> erzeugen kannst.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Kümmern wir uns um unsere nächsten Kunden, eine große Bestellung.</b> <br>
                        Was wenn wir für unsere Bestellungen nicht jedes Mal eine Variable für die Anzahl erstellen
                        wollen? Wir brauchen einen Helfer, der uns diese Arbeit erleichtert.
                    </p>
                    <p>
                        Wie die <code>while</code>-Schleife, kann eine <code>for</code>-Schleife einen Code-Block
                        beliebig oft wiederholen. Praktisch ist aber, dass die <code>for</code>-Schleife ohne extra
                        Variablen auskommt. <b>Wir erstellen alles was wir brauchen im Kopf der Schleife selbst.</b>
                        Wir brauchen also 3 Durchläufe um 3 Cheeseburger zu braten.

                    </p>
                    <p>
                        <b>Wie genau machen wir das?</b> <br>
                        Die <code>for</code>-Schleife erhält 3 Parameter, getrennt durch Semikolons. Der erste Parameter
                        ist die <b>Initialisierung der Laufvariable.</b> Hier legen wir den Startwert fest, also
                        <code>$burgerCount = 0</code>.<br>
                        Der 2. Parameter ist die <b>Fortsetzungs-Bedingung</b>, die wir schon von den vorherigen
                        Schleifen kennen. <br>
                        Der dritte Parameter, macht das, was wir vorher manuell machen mussten, also zum Beispiel, die
                        Laufvariable um 1 erhöhen (<code>$burgerCount++</code>). <b>Diese Anweisung wird nach jedem
                        Durchlauf ausgeführt.</b>
                    </p>
                    <p>
                        Wenn wir die Schleife so anlegen, können wir in einer Zeile gleich drei Burger braten und unsere
                        Aufgabe ist erfüllt!
                    </p>
                </template>

                <template slot="task">
                    <p>
                        <strong>TBD Aufgabe</strong>
                    </p>
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'For',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    'for ( $count = 0 ; $condition ; $count++ ) {',
                    '   // Code',
                    '}'
                ],
                sourcecode: [
                    '// Die Bestellung ist in der Küche angekommen!',
                    '',
                    '$order = [',
                    '    "Cheeseburger",',
                    '    "Double-Cheeseburger",',
                    '    "Hamburger",',
                    '];',
                    '',
                    '// Wir gehen Step by Step die Liste ab und braten unsere Burger:',
                    'for ($burgerIndex = 0; $burgerIndex < count($order); $burgerIndex++) {',
                    '    $burger = $order[$burgerIndex];',
                    '    make($burger);',
                    '}',
                    '',
                    '// Guten Appetit!'
                ],
                animation: [
                    [0, 0, 0, ''],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'Da hat jemand Hunger. 3 Cheeseburger!'],
                    [0, 0, 0, 'So einen repetitiven Task können wir vereinfachen.'],
                    [2, 0, 0, 'Applaus für die "For"-Schleife!'],
                    [2, 1, 0, 'Was passiert hier im Detail?'],
                    [2, 1, 0, 'Beim ersten Aufruf der Schleife wird zuerst...'],
                    [2, 1, 0, '...die Laufvariable "$burgerCount" mit dem Wert 0 erstellt.'],
                    [2, 1, 0, 'Wir wollen 3 Burger, also soll die Schleife so lang laufen...'],
                    [2, 1, 0, '...bis wir mit dem 3. Parameter, ...'],
                    [2, 1, 0, '...der sog. Fortsetzungs-Anweisung, ...'],
                    [2, 1, 0, '...die Laufbedingung, den 2. Parameter, ...'],
                    [2, 1, 0, '...nicht mehr erfüllen.'],
                    [2, 2, 0, 'Also starten wir mit $burgerCount = 0.'],
                    [3, 0, 1, 'Wir vereinfachen das Braten und machen den Burger in einem Schritt'],
                    [4, 0, 1, 'Und beenden den Schleifendurchlauf.'],
                    [4, 0, 1, 'Hier, nach dem Code-Block, wird der 3. Parameter ausgeführt.'],
                    [4, 0, 0, 'Also $burgerCount++'],
                    [2, 1, 0, 'Zurück am Schleifen-Anfang prüfen wir wieder:'],
                    [2, 1, 0, '$burgerCount < 3?'],
                    [2, 2, 0, 'Ja, noch ein Burger!'],
                    [3, 0, 1, 'Burger braten...'],
                    [4, 0, 1, 'Laufvariable aufzählen. Nun haben wir 2'],
                    [2, 1, 0, 'Und zurück auf Anfang.'],
                    [2, 2, 0, '2 < 3. Jap.'],
                    [3, 0, 1, 'Burger braten.'],
                    [4, 0, 1, 'Hochzählen: $burgerCount = 3'],
                    [2, 1, 0, 'Wieder prüfen:'],
                    [2, 3, 0, 'Oh! Wir haben 3 Burger. 3 ist nicht kleiner als 3!'],
                    [4, 0, 0, 'Die Schleife wird übersprungen und beendet!'],
                    [6, 0, 0, 'Und wieder ein gesättigter Kunde!'],
                    [6, 0, 0, 'Wahnsinn. Kompakter geht\'s wirklich nicht.'],
                    [6, 0, 0, 'Was aber, wenn wir verschiedene Burger braten müssen?'],
                    [6, 0, 0, 'Auf der nächsten Seite kommt die Königsklasse.'],
                    [6, 0, 1, 'Lerne jetzt "Foreach"-Schleifen kennen!'],
                ],
                burgerAnimation: [
                    [],
                    [],
                ],
                exercise: [
                    [ 0, 1, 2, 3, 4 ]
                ]
            }
        }
    }
</script>