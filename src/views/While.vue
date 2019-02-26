<template>
    <div id="while-loop">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="intro">
                    <h1><code>while</code> Loop</h1>
                    <p class="lead text-black-50">Zum <strong class="text-body">Wiederholen einer Anweisung</strong> abhängig von einer Bedingung.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Wir sollen unsere Arbeit optimieren!</b> <br>
                        Wir benötigen mehrere Scheiben Käse, sollen aber nicht jeden Schritt einzeln notieren.
                    </p>
                    <p>
                        Unser Helfer: Die <code>while</code>-Schleife. Sie ermöglicht einen Code-Block <b>beliebig oft
                        zu wiederholen</b>, ohne den Inhalt mehrmals schreiben zu müssen. <br>
                        Hier hilft sie uns, in einem Schritt genau so viel Cheese auf unseren Burger zu packen wie wir
                        benötigen.
                    </p>
                    <p>
                        <b>Wie erreichen wir das?</b> <br>
                        Um die Anzahl der Wiederholungen zu bestimmen, benötigen wir eine <b>Bedingung</b> im Kopf der
                        Schleife. Diese funktioniert genau wie ein <code>if</code>-Statement und <b>bestimmt, ob die
                        Schleife weiterläuft </b>(<code>true</code>)<b> oder nicht.</b>
                    </p>
                    <p>
                        Um hier im Beispiel 2 Schichten Käse zu bekommen, <b>erstellen wir</b> daher <b>die Variable</b>&nbsp;
                        <code>$cheeseCount = 0</code>, symbolisch für die Anzahl der Scheiben
                        Käse. In der <b>Bedingung</b> legen wir fest, <b>wie oft die Schleife wiederholt wird</b>. Dass das auch
                        funktioniert, müssen wir allerdings im Schleifeninhalt <b>die Variable bei jedem Durchgang um 1
                        erhöhen</b>. <br>
                        Erreicht die Variable dann den Wert <code>2</code>, <b>trifft die Bedingung</b>&nbsp;
                        <code>$cheeseCount &lt; 2</code>&nbsp;<b>nicht mehr zu und die Schleife beendet</b> nach der
                        richtigen Anzahl Durchläufen.
                    </p>
                    <p>
                        Yeah, so haben wir zwei gleiche Schritte zu einem zusammengefasst!
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
                sourcecodeGeneral: [
                    'while ($condition) {',
                    '   // Code',
                    '}',
                ],
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
                    // sourcecode line, line-indicator status, burger animation frame, line-indicator tooltip
                    [ 0, 0, 0, ''],
                    [ 0, 0, 0, 'Großartige Bestellung, ein "Double-Cheeseburger".'],
                    [ 0, 0, 0, 'Hier können wir richtig gut eine Schleife einsetzen!'],
                    [ 0, 0, 0, 'Schauen wir\'s uns an!'],
                    [ 2, 0, 0, 'Legen wir fest, wieviele Schichten Käse wir anfangs haben.'],
                    [ 2, 0, 0, 'Logischerweise 0.'],
                    [ 4, 0, 1, 'Also Basiszutaten hinzufügen.'],
                    [ 6, 0, 1, 'Jetzt wird\'s spannend!'],
                    [ 6, 0, 1, 'Wir wollen einen "Double-Cheeseburger..."'],
                    [ 6, 0, 1, '...also führen wir 2 mal die gleiche Aktion aus.'],
                    [ 6, 0, 1, 'Benutzen wir eine "While"-Schleife...'],
                    [ 6, 0, 1, '...können wir die Aktion beliebig oft wiederholen.'],
                    [ 6, 0, 1, 'Wir brauchen aber nur 2 Schichten Käse.'],
                    [ 6, 0, 1, 'Deshalb schreiben wir "$cheeseCount < 2".'],
                    [ 6, 1, 1, 'Wir starten bei $cheeseCount = 0, also:'],
                    [ 6, 1, 1, 'Ist 0 < 2?'],
                    [ 6, 2, 1, 'Ja. Wir führen den Schleifeninhalt aus.'],
                    [ 7, 0, 2, 'Wir fügen den Käse zum Burger hinzu'],
                    [ 8, 0, 2, 'und aktualisieren die Anzahl der Scheiben.'],
                    [ 8, 0, 2, '$cheeseCount + 1 = 1'],
                    [ 9, 0, 2, 'Schleife beendet, wir springen zurück.'],
                    [ 6, 1, 2, 'Nochmal überprüfen: Jetzt 1 < 2?'],
                    [ 6, 2, 2, 'Immer noch wahr! Mehr Käse!'],
                    [ 7, 0, 3, 'Yumyum.'],
                    [ 8, 0, 3, '1 + 1 = 2'],
                    [ 9, 0, 3, 'Ende. Und zurück.'],
                    [ 6, 0, 3, 'Interessant.'],
                    [ 6, 1, 3, 'Wir überprüfen wieder: 2 < 2?'],
                    [ 6, 3, 3, 'Nope! Das war\'s wohl! Keinen Käse mehr auf den Burger!'],
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