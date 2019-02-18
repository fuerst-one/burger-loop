<template>
    <div id="while-loop">
        <div class="container">
            <h1>While-Loop</h1>
            <p class="lead text-black-50">Zum Wiederholen einer Anweisung abhängig von einer Bedingung.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" @step="animationStep = $event">
                <template slot="desc">
                    <p>
                        Die "While"-Schleife wiederholt einen Code-Block solange die Bedingung im Kopf erfüllt ist.
                        Das heißt, es wird <i>nach jedem Durchlauf</i> überprüft ob das der Fall ist.
                    </p>
                    <p>
                        Man kann die "While"-Schleife also als "If"-Block sehen, der sich solange wiederholt, bis er
                        nicht mehr zutrifft.
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
        name: 'While',
        components: {Layout},
        directives: {},
        props: {},
        data() {
            return {
                sourcecode: [
                    '// Einen Double-Cheeseburger, bitte.',
                    '',
                    '$cheeseCount = 0;',
                    '',
                    'add(Base);',
                    '',
                    'while ($cheeseCount < 2) {',
                    '    add(cheese);',
                    '    $cheeseCount = $cheeseCount + 1;',
                    '}',
                    '',
                    'add(topBun);',
                ],
                animationStep: 0,
                animation: [
                    [0, 0, 0, 'Großartige Bestellung, ein "Double-Cheeseburger".'],
                    [0, 0, 0, 'Hier können wir richtig gut eine Schleife einsetzen!'],
                    [0, 0, 0, 'Schauen wir\'s uns an!'],
                    [2, 0, 0, 'Legen wir fest, wieviele Schichten Käse wir anfangs haben.'],
                    [2, 0, 0, '(logischerweise 0)'],
                    [4, 0, 0, 'Also Basiszutaten hinzufügen.'],
                    [6, 0, 0, 'Jetzt wird\'s spannend!'],
                    [6, 0, 0, 'Wir wollen einen "Double-Cheeseburger"'],
                    [6, 0, 0, 'Wir führen also 2 mal die gleiche Aktion aus.'],
                    [6, 0, 0, 'Benutzen wir eine "While"-Schleife...'],
                    [6, 0, 0, '...können wir die Aktion beliebig oft wiederholen.'],
                    [6, 0, 0, 'Wir brauchen aber nur 2 Schichten Käse.'],
                    [6, 0, 0, 'Deshalb schreiben wir "$cheeseCount < 2".'],
                    [6, 1, 0, 'Wir starten bei 0, also:'],
                    [6, 1, 0, 'Ist 0 < 2?'],
                    [6, 2, 0, 'Ja. Führen wir den Schleifeninhalt aus.'],
                    [7, 0, 0, 'Wir fügen den Käse zum Burger hinzu'],
                    [8, 0, 0, 'und aktualisieren die Anzahl der Scheiben. $cheeseCount = 1.'],
                    [9, 0, 0, 'Schleife beendet, wir springen zurück.'],
                    [6, 1, 0, 'Nochmal überprüfen: Jetzt 1 < 2?'],
                    [6, 2, 0, 'Immernoch wahr! Mehr Käse!'],
                    [7, 0, 0, 'Yumyum.'],
                    [8, 0, 0, '+ 1 = 2'],
                    [6, 0, 0, 'Und zurück. Interessant.'],
                    [6, 1, 0, 'Wir überprüfen wieder: 2 < 2?'],
                    [6, 3, 0, 'Nope! Das war\'s! Kein Käse mehr auf den Burger!'],
                    [11, 0, 0, 'Also nur noch die obere Brötchenhälfte und wir sind fertig.'],
                    [11, 0, 0, 'Die "While"-Schleife hat aber auch einen Bruder.'],
                    [11, 0, 0, 'Schau dir auf der nächsten Seite den Unterschied an.'],
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