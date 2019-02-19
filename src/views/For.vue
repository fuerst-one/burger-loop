<template>
    <div id="for-loop">
        <div class="container">
            <h1>For-Loop</h1>
            <p class="lead text-black-50">Wie eine While-Schleife die "on-the-go" definiert wird.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="desc">
                    <p>
                        Eine "For"-Schleife ist hilfreich, wenn man einen Code-Block eine bestimmte Anzahl oft
                        wiederholen will. Im Gegensatz zur "While"-Schleife, kann hier die Schleifen-Variable im Kopf
                        des "For"-Loops erstellt werden.
                    </p>
                    <p>
                        "For"-Schleifen können darüber hinaus aber auch viel flexibler eingesetzt werden als es zuerst
                        scheint. So muss die Abbruchbedingung der Schleife nicht zwangsläufig mit der Laufvariable zutun
                        haben, sondern kann ebenfalls durch jede andere Form eines Wahrheitswerts definiert werden.
                    </p>
                    <p>
                        Auch interessant: Man kann alle Teile des Kopfes weglassen, solange man die Schleife mit einem
                        "break" oder "return" beendet. Andernfalls wird die Schleife theoretisch unendlich ausgeführt.
                    </p>
                </template>
                <template slot="anim">
                    <img src="../assets/img/topbun.svg" alt="" class="img-fluid">
                    <img src="../assets/img/bottombun.svg" alt="" class="img-fluid">
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
        directives: {},
        props: {},
        data() {
            return {
                sourcecode: [
                    '// Nächste Bestellung: 3 Cheeseburger',
                    '',
                    'for ($burgerCount = 0; $burgerCount < 3; $burgerCount++) {',
                    '    make(Cheeseburger);',
                    '}',
                    '',
                    '// Guten Appetit!'
                ],
                animationStep: 0,
                animation: [
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
                    [4, 0, 1, 'Hier, nach dem Anweisungs-Block, wird der 3. Parameter ausgeführt.'],
                    [4, 0, 0, 'Also $burgerCount++'],
                    [2, 1, 0, 'Zurück am Schleifen-Anfang prüfen wir wieder:'],
                    [2, 1, 0, '$burgerCount < 3?'],
                    [2, 2, 0, 'Ja, noch ein Burger!'],
                    [3, 0, 1, 'Burger braten...'],
                    [4, 0, 0, 'Laufvariable aufzählen. Nun haben wir 2'],
                    [2, 1, 0, 'Und zurück auf Anfang.'],
                    [2, 2, 0, '2 < 3. Jap.'],
                    [3, 0, 1, 'Burger braten.'],
                    [4, 0, 1, 'Hochzählen: $burgerCount = 3'],
                    [2, 1, 1, 'Wieder prüfen:'],
                    [2, 3, 1, 'Oh! Wir haben 3 Burger. 3 ist nicht kleiner als 3!'],
                    [4, 0, 1, 'Die Schleife wird übersprungen und beendet!'],
                    [6, 0, 1, 'Und wieder ein gesättigter Kunde :)'],
                    [6, 0, 1, 'Wahnsinn. Schneller geht wirklich nicht.'],
                    [6, 0, 1, 'Was aber, wenn wir verschiedene Burger braten müssen?'],
                    [6, 0, 1, 'Auf der nächsten Seite kommt die Königsklasse.'],
                    [6, 0, 1, 'Lerne jetzt "Foreach"-Schleifen kennen!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                ]
            }
        },
        computed: {},
        watch: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
</style>