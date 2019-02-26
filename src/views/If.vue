<template>
    <div id="if-clause">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="intro">
                    <h1><code>if</code> Statement</h1>
                    <p class="lead text-black-50">Immer wenn etwas <strong class="text-body">abhängig von einer Bedingung</strong> ausgeführt werden soll.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Dann starten wir doch gleich mal mit unseren Rezepten.</b> <br>
                        Da wir nicht jede Anweisung im Rezeptbuch ausführen dürfen, brauchen wir eine Art Schranke, die
                        sagt was wir ausführen sollen und was überspringen.
                    </p>
                    <p>
                        Auftritt <code>if</code>-Statement. Das <code>if</code>-Statement lässt bestimmte
                        <b>Code-Abschnitte nur dann ausführen, wenn eine bestimmte Bedingung erfüllt ist</b>. Ist sie
                        <b>nicht erfüllt, wird der Abschnitt</b> im Block <b>übersprungen</b>. <br>
                        Bei mehreren verschiedenen Anweisungen, werden <code>else if</code> und <code>else</code>
                        Blöcke angehängt, aber merke: <b>Es wird immer nur ein Teil-Block in der Reihe ausgeführt, der
                        Rest übersprungen.</b> So bekommen wir unsere verschiedenen Rezepte ganz einfach unter einen Hut.
                    </p>
                    <p>
                        <b>Was müssen wir also tun?</b> <br>
                        Wenn wir die Rezepte durchgehen, müssen wir zuerst die <b>Übereinstimmung von</b>&nbsp;
                        <code>$recipe</code>&nbsp;<b>und dem Rezept überprüfen</b>. Wenn eine Bestellung
                        <code>"Double-Cheeseburger"</code> lautet, sollte also das richtige Rezept ausgeführt werden.
                        Das machen wir, indem wir in den Klammern die Variable abfragen, also
                        <code>$recipe == "Double-Cheeseburger"</code>. Dann müssen wir nur noch  im zugehörigen Code-Block
                        unser Rezept fortführen. <b>Um die Verwendung mehrerer Rezepte gleichzeitig zu verhindern</b>,
                        fragen wir die anderen Rezepte in einem <code>else if</code>-Block ab.
                    </p>
                    <p>
                        Und schon haben wir unser Kochbuch mit drei verschiedenen Rezepten!
                    </p>
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'If',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    'if ($condition) {',
                    '   // Code',
                    '} else {',
                    '   // Code',
                    '}',
                ],
                sourcecode: [
                    '// Unsere Burger-Rezeptur',
                    '',
                    'add([ bottomBun, patty, salad, tomatoes ]);',
                    '',
                    'if ($recipe == \'Double-Cheeseburger\') {',
                    '   add(cheese);',
                    '   add(cheese);',
                    '   add(sauce);',
                    '',
                    '} elseif ($recipe == \'Cheeseburger\') {',
                    '   add(cheese);',
                    '   add(sauce);',
                    '',
                    '} else { // Standardrezept: \'Hamburger\'',
                    '   add(sauce);',
                    '}',
                    '',
                    'add(topBun);',
                    '',
                    '// Done!'
                ],
                animation: [
                    // sourcecode line, line-indicator status, burger animation frame, line-indicator tooltip
                    [ 0, 0, 0, ''],
                    [ 0, 0, 0, 'Ok, let\'s go. Braten wir ein paar Burger.'],
                    [ 0, 0, 0, 'Das ist unser Kochbuch.'],
                    [ 0, 0, 0, 'Unser erster Burger: "Double-Cheeseburger"'],
                    [ 2, 0, 1, 'Zuerst belegen wir immer die Basiszutaten.'],
                    [ 4, 0, 1, 'Jetzt wird\'s schon tricky.'],
                    [ 4, 0, 1, 'Unsere Burger haben verschiedene Rezepte.'],
                    [ 4, 0, 1, 'Schauen wir, ob wir beim richtigen sind.'],
                    [ 4, 1, 1, 'Rezept für einen Double-Cheeseburger?'],
                    [ 4, 2, 1, 'Ja! $recipe == "Double-Cheeseburger".'],
                    [ 4, 2, 1, 'Also folgen wir diesem Rezept:'],
                    [ 5, 0, 2, 'Käse'],
                    [ 6, 0, 3, 'Nochmal Käse'],
                    [ 7, 0, 4, 'Soße.'],
                    [ 9, 0, 4, 'Das ist das Ende des Rezepts.'],
                    [ 9, 0, 4, 'Das heißt wir überspringen den Rest!'],
                    [17, 0, 5, 'Also nur noch Deckel drauf...'],
                    [19, 0, 0, 'Fertig!'],
                    [ 0, 0, 0, 'Nächster Burger: "Cheeseburger"'],
                    [ 2, 0, 1, 'Wie immer, die Base...'],
                    [ 4, 1, 1, 'Cheeseburger?'],
                    [ 4, 3, 1, 'Nö.'],
                    [ 9, 1, 1, 'Jetzt Cheeseburger?'],
                    [ 9, 2, 1, 'Yes. Also:'],
                    [10, 0, 2, 'Käse'],
                    [11, 0, 6, 'Soße'],
                    [13, 0, 6, 'Rest überspringen'],
                    [17, 0, 7, 'Deckel'],
                    [19, 0, 0, 'Cheeseburger!'],
                    [ 0, 0, 0, 'Ok, der Hamburger noch.'],
                    [ 2, 0, 1, 'Auch hier die Basiszutaten'],
                    [ 4, 1, 1, 'Hamburger?'],
                    [ 4, 3, 1, 'Nein.'],
                    [ 9, 1, 1, 'Hamburger?'],
                    [ 9, 3, 1, 'Nein.'],
                    [13, 1, 1, 'Hamburger?'],
                    [13, 1, 1, 'Nein, aber das ist das letzte Rezept!'],
                    [13, 2, 1, 'Also nehmen wir standardmäßig dieses.'],
                    [14, 0, 8, 'Soße'],
                    [17, 0, 9, 'Brötchen'],
                    [19, 0, 9, 'Und das war der letzte Burger.'],
                    [19, 0, 9, 'Toll, wir haben unsere Rezepte!'],
                    [19, 0, 9, 'Beginnen wir, uns die Arbeit zu erleichtern.'],
                    [19, 0, 9, 'Schau weiter zu "While"-Schleifen!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                ]
            }
        }
    }
</script>