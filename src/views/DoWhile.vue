<template>
    <div id="do-while-loop" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise" :people="people">
                <template slot="intro">
                    <h1><code>do while</code> Loop</h1>
                    <p class="lead text-black-50">Zum Wiederholen einer Anweisung, <strong class="text-body">ohne den ersten Durchlauf zu prüfen</strong>.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Ein Burger soll umbelegt werden!</b> <br>
                        Es gibt nochmal Extra-Cheese oben drauf, laut Rezept ist die Maximalmenge aber 2.
                    </p>
                    <p>
                        Dafür benutzen wir die <code>do while</code>-Schleife. Diese funktioniert im
                        Prinzip genau wie die <code>while</code>-Schleife, allerdings wird die Bedingung hier <b>beim
                        ersten Durchlauf übersprungen</b>. Genau wie wir es für unsere Sonderbestellung mit der Scheibe
                        extra benötigen.
                    </p>
                    <p>
                        <b>Wie tricksen wir unser Rezept nun aus?</b> <br>
                        Im Beispiel haben wir schon 2 Scheiben Käse, deshalb schreiben wir <code>$cheeseCount = 2</code>.
                        Da die <b>Überprüfung erst am Ende der Schleife</b> stattfindet, wird der Code der <code>do while</code>-Schleife
                        <b>in jedem Falle ein Mal ausgeführt</b>. Ab hier ist der Vorgang dann der gleiche wie bei der
                        <code>while</code>-Schleife und der Inhalt wird wiederholt, bis die Bedingung nicht mehr zutrifft.
                    </p>
                    <p>
                        Somit können wir im ersten Durchlauf aus unserem fertigen Double-Cheeseburger ganz einfach
                        einen Triple machen, ohne das Rezept zu ändern!
                    </p>
                </template>

                <template slot="task">
                    <p>
                        Nur für die richtig Harten gibt es den Schärfsten unter unseren Burgern: den <code>redHotChiliBurger</code>. Um richtig scharfe <code>burger</code>  zu belegen, müssen wir unsere <code>while</code>-Schleife zu einer <code>do-while</code>-Schleife abändern.
                    </p>
                    <p>
                        <b> „Einmal den Red-Hot-Chili-Burger, aber pronto!“ </b> <br>
                        Und los geht‘s! Der <code>redHotChiliBurger</code> hat den Schärfegrad <code>3</code>.
                        Das heißt, du musst - nach der <code>$base</code> - den Burger solange mit <code>jalapenos</code> belegen, bis der hotCount 3 erreicht.
                        Zusätzlich zu den <code>jalapenos</code> bekommt er dann noch <code>redChilis</code>, <code>cheese</code> und <code>sourCream</code> mit dazu. <code>topBun</code> drauf und fertig! <br>
                        Versuche dich mit der <code>do-while</code>-Schleife und würze den heißen Klassiker! Nutze dazu wieder unseren <code>hotCount</code> um die Schärfegrade zu steigern. <br> Let's heat it up!
                    </p>
                  
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'DoWhile',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    'do {',
                    '   // Code',
                    '}',
                    'while ($condition);'
                ],
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
                    [ 0, 0, 0, ''],
                    [ 0, 0, 0, 'Unser Kunde hat seinen Burger umbestellt!'],
                    [ 0, 0, 0, 'Wir sollen noch eine Scheibe Käse hinzufügen!'],
                    [ 0, 0, 0, 'Eigentlich erlaubt es das Rezept garnicht...'],
                    [ 0, 0, 0, '...aber wir haben einen kleinen Trick.'],
                    [ 2, 0, 1, 'Der Double-Cheeseburger hat schon 2 Scheiben Käse,'],
                    [ 8, 1, 1, 'unsere While-Bedingung im Rezept sagt aber < 2!'],
                    [ 4, 1, 1, 'Das ist bei "Do While" aber kein Problem.'],
                    [ 4, 0, 1, 'Wir führen die erste Wiederholung immer aus, ohne zu prüfen.'],
                    [ 5, 0, 2, 'Also eine Scheibe Käse hinzu.'],
                    [ 6, 0, 2, 'Und aufzählen.'],
                    [ 8, 0, 2, 'Erst nach dem ersten Durchlauf wird überprüft (!):'],
                    [ 8, 1, 2, '$cheeseCount < 2?'],
                    [ 8, 3, 2, 'Nein! 3 ist größer als 2.'],
                    [ 8, 3, 2, 'Die Schleife wird also direkt abgebrochen.'],
                    [ 8, 3, 2, 'Bei einer "While"-Schleife, hätten wir den Inhalt gar nicht ausgeführt.'],
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
                ],
                exercise: [
                    [ "$hotCount", "=", "0",";" ],
                    [ "add($base);" ],
                    [ "do", "{" ],
                    [ "add(jalapeno);" ],
                    [ "$hotCount", "++", ";" ],
                    [ "}" ],
                    [ "while", "(", "$hotCount", "<", "4", ")", ";"  ],
                    [ "add(redChilis);" ],
                    [ "add(cheese);" ],
                    [ "add(sourCream);" ],
                    [ "add(topBun);" ]
                ],
                people: [ "chef" ]
            }
        }
    }
</script>
