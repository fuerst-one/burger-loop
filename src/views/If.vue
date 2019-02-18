<template>
    <div id="if-clause">
        <div class="container">
            <h1>If-Clause</h1>
            <p class="lead text-black-50">Immer wenn etwas abhängig von einer Bedingung ausgeführt werden soll.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" @step="animationStep = $event">
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
        name: 'If',
        components: {Layout},
        directives: {},
        props: {},
        data() {
            return {
                sourcecode: [
                    '// Unsere Burger-Rezeptur',
                    '',
                    'base = [ patty, salad, tomato, onions ];',
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
                animationStep: 0,
                animation: [
                    [0, 0, 0, 'Ok, let\'s go. Braten wir ein paar Burger.'],
                    [0, 0, 0, 'Das ist unser Kochbuch.'],
                    [0, 0, 0, 'Unser erster Burger: "Double-Cheeseburger"'],
                    [2, 0, 0, 'Zuerst immer die Basiszutaten.'],
                    [4, 0, 0, 'Jetzt wird\'s schon tricky.'],
                    [4, 0, 0, 'Unsere Burger haben verschiedene Rezepte.'],
                    [4, 0, 0, 'Schauen wir, ob wir beim richtigen sind.'],
                    [4, 1, 0, 'Rezept für einen Double-Cheeseburger?'],
                    [4, 2, 0, 'Ja!'],
                    [4, 2, 0, 'Also folgen wir diesem Rezept:'],
                    [5, 0, 0, 'Käse,'],
                    [6, 0, 0, 'Nochmal Käse,'],
                    [7, 0, 0, 'Soße.'],
                    [9, 0, 0, 'Das ist das Ende des Rezepts.'],
                    [9, 0, 0, 'Das heißt wir überspringen den Rest!'],
                    [17, 0, 0, 'Also nur noch Deckel drauf...'],
                    [19, 0, 0, 'Fertig!'],
                    [0, 0, 0, 'Nächster Burger: "Cheeseburger"'],
                    [2, 0, 0, 'Wie immer, die Base...'],
                    [4, 1, 0, 'Cheeseburger?'],
                    [4, 3, 0, 'Nö.'],
                    [9, 1, 0, 'Jetzt Cheeseburger?'],
                    [9, 2, 0, 'Yes. Also:'],
                    [10, 0, 0, 'Käse,'],
                    [11, 0, 0, 'Soße,'],
                    [13, 0, 0, 'Rest überspringen,'],
                    [17, 0, 0, 'Deckel,'],
                    [19, 0, 0, 'Gut is.'],
                    [0, 0, 0, 'Ok, der Hamburger noch.'],
                    [2, 0, 0, 'Auch hier die Basiszutaten'],
                    [4, 1, 0, 'Hamburger?'],
                    [4, 3, 0, 'Nein.'],
                    [9, 1, 0, 'Hamburger?'],
                    [9, 3, 0, 'Nein.'],
                    [13, 1, 0, 'Es gibt kein Rezept für Hamburger!'],
                    [13, 2, 0, 'Dann nehmen wir standardmäßig dieses.'],
                    [14, 0, 0, 'Soße,'],
                    [17, 0, 0, 'Brötchen,'],
                    [19, 0, 0, 'Auch das ist ein Burger.'],
                    [19, 0, 0, 'Toll, das waren unsere Rezepte!'],
                    [19, 0, 0, 'Beginnen wir, uns die Arbeit zu erleichtern.'],
                    [19, 0, 0, 'Schau weiter zu "While"-Schleifen!'],
                ],
            }
        },
        computed: {},
        watch: {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
</style>