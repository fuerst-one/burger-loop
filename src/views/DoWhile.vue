<template>
    <div id="do-while-loop">
        <div class="container">
            <h1><code>do while</code> Loop</h1>
            <p class="lead text-black-50">Zum Wiederholen einer Anweisung abhängig von einer Bedingung, <strong class="text-body">ohne den ersten Durchlauf zu prüfen</strong>.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="desc">
                    <p>
                        Der einzige Unterschied zwischen "While"-Schleife und "Do While"-Schleife ist, dass "<u>Do</u> While"
                        die erste Abfrage überspringt und den Code ausführt, egal ob die Kondition erfüllt ist.
                    </p>
                    <p>
                        Zuerst "<u>Tun</u>", dann überprüfen, ob eine weitere Wiederholung gemacht wird.
                    </p>
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'While',
        components: {Layout},
        data() {
            return {
                sourcecode: [
                    '// Stop! Mach einen Triple draus.',
                    '',
                    '$cheeseCount = 2;',
                    '',
                    'do {',
                    '   add(cheese);',
                    '   $cheeseCount++;',
                    '}',
                    'while ($cheeseCount < 2)',
                    '// Zum Glück haben wir das "Do".',
                    '',
                    'add(sauce);',
                    'add(topBun);',
                ],
                animation: [
                    [ 0, 0, 0, 'Unser Kunde hat seinen Burger umbestellt.'],
                    [ 0, 0, 0, 'Wir sollen noch eine Scheibe Käse hinzufügen!'],
                    [ 0, 0, 0, 'Eigentlich erlaubt es das Rezept garnicht...'],
                    [ 0, 0, 0, '...aber wir haben einen kleinen Trick.'],
                    [ 2, 0, 1, 'Der Double-Cheeseburger hat schon 2 Scheiben Käse,'],
                    [ 8, 1, 1, 'unsere While-Bedingung sagt aber < 2!'],
                    [ 4, 1, 1, 'Das ist aber bei "Do While" kein Problem.'],
                    [ 4, 0, 1, 'Wir führen die erste Wiederholung aus, ohne zu prüfen.'],
                    [ 5, 0, 2, 'Also eine Scheibe Käse hinzu.'],
                    [ 6, 0, 2, 'Und aufzählen.'],
                    [ 8, 0, 2, 'Jetzt wird erst überprüft (!):'],
                    [ 8, 1, 2, '$cheeseCount < 2?'],
                    [ 8, 3, 2, 'Nein! 3 ist größer als 2.'],
                    [ 8, 3, 2, 'Die Schleife wird also abgebrochen.'],
                    [ 8, 3, 2, 'Hätten wir die Bedingung hier erfüllt, würden wir zum Anfang springen.'],
                    [ 8, 3, 2, 'Haben wir aber nicht, also gehen wir weiter.'],
                    [11, 0, 3, 'Soße drauf.'],
                    [12, 0, 4, 'Burger vollendet und wieder ein Kunde glücklich.'],
                    [12, 0, 4, '..."Do While". Auch ein hilfreicher Partner in der Programmier-Küche.'],
                    [12, 0, 4, 'Aber wir können unsere Schleifen noch einfacher gestalten!'],
                    [12, 0, 4, 'Wie das geht, siehst du auf der nächsten Seite.'],
                    [12, 0, 4, 'Schau dir die "For"-Schleifen an!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3', 'sauce' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3', 'sauce', 'topBun' ],
                ]
            }
        }
    }
</script>