<template>
    <div id="while-loop">
        <div class="container">
            <h1>While-Loop</h1>
            <p class="lead text-black-50">Zum Wiederholen einer Anweisung abhängig von einer Bedingung.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
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
                    'add(sauce);',
                    'add(topBun);',
                ],
                animation: [
                    [ 0, 0, 0, 'Großartige Bestellung, ein "Double-Cheeseburger".'],
                    [ 0, 0, 0, 'Hier können wir richtig gut eine Schleife einsetzen!'],
                    [ 0, 0, 0, 'Schauen wir\'s uns an!'],
                    [ 2, 0, 0, 'Legen wir fest, wieviele Schichten Käse wir anfangs haben.'],
                    [ 2, 0, 0, '(logischerweise 0)'],
                    [ 4, 0, 1, 'Also Basiszutaten hinzufügen.'],
                    [ 6, 0, 1, 'Jetzt wird\'s spannend!'],
                    [ 6, 0, 1, 'Wir wollen einen "Double-Cheeseburger"'],
                    [ 6, 0, 1, 'Wir führen also 2 mal die gleiche Aktion aus.'],
                    [ 6, 0, 1, 'Benutzen wir eine "While"-Schleife...'],
                    [ 6, 0, 1, '...können wir die Aktion beliebig oft wiederholen.'],
                    [ 6, 0, 1, 'Wir brauchen aber nur 2 Schichten Käse.'],
                    [ 6, 0, 1, 'Deshalb schreiben wir "$cheeseCount < 2".'],
                    [ 6, 1, 1, 'Wir starten bei 0, also:'],
                    [ 6, 1, 1, 'Ist 0 < 2?'],
                    [ 6, 2, 1, 'Ja. Führen wir den Schleifeninhalt aus.'],
                    [ 7, 0, 2, 'Wir fügen den Käse zum Burger hinzu'],
                    [ 8, 0, 2, 'und aktualisieren die Anzahl der Scheiben. $cheeseCount = 1.'],
                    [ 9, 0, 2, 'Schleife beendet, wir springen zurück.'],
                    [ 6, 1, 2, 'Nochmal überprüfen: Jetzt 1 < 2?'],
                    [ 6, 2, 2, 'Immernoch wahr! Mehr Käse!'],
                    [ 7, 0, 3, 'Yumyum.'],
                    [ 8, 0, 3, '+ 1 = 2'],
                    [ 9, 0, 3, 'Ende. Und zurück.'],
                    [ 6, 0, 3, 'Interessant.'],
                    [ 6, 1, 3, 'Wir überprüfen wieder: 2 < 2?'],
                    [ 6, 3, 3, 'Nope! Das war\'s! Kein Käse mehr auf den Burger!'],
                    [11, 0, 4, 'Also nur noch Soße...'],
                    [12, 0, 5, '...und die obere Brötchenhälfte und wir sind fertig.'],
                    [12, 0, 5, 'Wir konnten den Käse jetzt mit nur einer Anweisung doppelt hinzufügen!'],
                    [12, 0, 5, 'Mit der "While"-Schleife kann man also sich wiederholende Aufgaben...'],
                    [12, 0, 5, '...ganz einfach und zeitsparend notieren! Besser als Copy&Paste!'],
                    [12, 0, 5, 'Die "While"-Schleife hat aber auch einen Bruder.'],
                    [12, 0, 5, 'Schau dir auf der nächsten Seite den Unterschied zur "Do While"-Schleife an!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>