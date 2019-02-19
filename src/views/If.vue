<template>
    <div id="if-clause">
        <div class="container">
            <h1>If-Clause</h1>
            <p class="lead text-black-50">Immer wenn etwas abhängig von einer Bedingung ausgeführt werden soll.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="desc">
                    <p>
                        Der "if"-Block ermöglicht einen Code-Abschnitt auszuführen <u>nur falls</u> eine bestimmte
                        Kondition erfüllt ist.
                    </p>
                    <p>
                        Ist die Bedingung bei der Ausführung nicht erfüllt, wird der Block
                        übersprungen und falls vorhanden der "else"-Block ausgeführt.
                        Der "else"-Block wird daher <i>nur</i> ausgeführt, wenn die Bedingung anfangs <i>nicht</i>
                        erfüllt wurde.
                    </p>
                    <p>
                        Ebenfalls ist es möglich "else if"-Blöcke zu verwenden, die nach Nichterfüllen der vorherigen
                        Abfragen der Reihe nach überprüft werden. Sobald eine Bedingung in der Reihe erfüllt wurde wird
                        kein anderer Block mehr abgefragt.
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
                sourcecode: [
                    '// Unsere Burger-Rezeptur',
                    '',
                    'base = [ bottomBun, patty, salad, tomatoes ];',
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
                    '} else {',
                    '   add(sauce);',
                    '}',
                    '',
                    'add(topBun);',
                    '',
                    '// Done!'
                ],
                animation: [
                    // sourcecode line, line-indicator status, burger animation frame, line-indicator tooltip
                    [ 0, 0, 0, 'Ok, let\'s go. Braten wir ein paar Burger.'],
                    [ 0, 0, 0, 'Das ist unser Kochbuch.'],
                    [ 0, 0, 0, 'Unser erster Burger: "Double-Cheeseburger"'],
                    [ 2, 0, 1, 'Zuerst immer die Basiszutaten.'],
                    [ 4, 0, 1, 'Jetzt wird\'s schon tricky.'],
                    [ 4, 0, 1, 'Unsere Burger haben verschiedene Rezepte.'],
                    [ 4, 0, 1, 'Schauen wir, ob wir beim richtigen sind.'],
                    [ 4, 1, 1, 'Rezept für einen Double-Cheeseburger?'],
                    [ 4, 2, 1, 'Ja! $recipe == "Double-Cheeseburger".'],
                    [ 4, 2, 1, 'Also folgen wir diesem Rezept:'],
                    [ 5, 0, 2, 'Käse,'],
                    [ 6, 0, 3, 'Nochmal Käse,'],
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
                    [10, 0, 2, 'Käse,'],
                    [11, 0, 6, 'Soße,'],
                    [13, 0, 6, 'Rest überspringen,'],
                    [17, 0, 7, 'Deckel,'],
                    [19, 0, 0, 'Gut is.'],
                    [ 0, 0, 0, 'Ok, der Hamburger noch.'],
                    [ 2, 0, 1, 'Auch hier die Basiszutaten'],
                    [ 4, 1, 1, 'Hamburger?'],
                    [ 4, 3, 1, 'Nein.'],
                    [ 9, 1, 1, 'Hamburger?'],
                    [ 9, 3, 1, 'Nein.'],
                    [13, 1, 1, 'Hamburger?'],
                    [13, 1, 1, 'Nein, aber das ist das letzte Rezept!'],
                    [13, 2, 1, 'Also nehmen wir standardmäßig dieses.'],
                    [14, 0, 8, 'Soße,'],
                    [17, 0, 9, 'Brötchen,'],
                    [19, 0, 9, 'Auch das ist ein Burger.'],
                    [19, 0, 9, 'Toll, das waren unsere Rezepte!'],
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