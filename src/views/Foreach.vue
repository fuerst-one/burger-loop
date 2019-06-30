<template>
    <div id="foreach-loop" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise">
                <template slot="intro">
                    <h1><code>foreach</code> Loop</h1>
                    <p class="lead text-black-50">Die Schleife, die alle <strong class="text-body">Schlüssel und Elemente einer Sammlung</strong> durchläuft.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Unser Restaurant läuft gut! Wir haben viele verschiedene Bestellungen!</b> <br>
                        Fangen wir also an, die hungrigen Kunden abzuarbeiten. Dabei wie immer: <b>möglichst effizient.</b>
                    </p>
                    <p>
                        Der <code>foreach</code>-Loop <b>vereinfacht</b> uns <b>das Durchlaufen von Arrays</b>
                        ungemein. Zwar kann man mit einem normalen <code>for</code>-Loop das Gleiche erreichen, doch
                        <b>man spart sich hier Schreibarbeit und hat gleichzeitig besser lesbaren Code</b>. Also fangen
                        wir an unser Bestellungs-Array abzuarbeiten.
                    </p>
                    <p>
                        <b>Wie gehen wir vor?</b> <br>
                        Beim Durchlaufen der <code>foreach</code>-Schleife wird <b>bei jedem Durchgang das aktuelle Feld</b>
                        des Arrays (also Schlüssel und Wert) <b>den Variablennamen im Kopf zugewiesen</b>. Dabei geht die
                        Schleife die Felder in genau der Reihenfolge ab, wie sie erstellt wurden. <br>
                        Wir erstellen also unser Array nach dem Schema <code>$table => $order</code>, um die Elemente
                        später komfortabel abrufen zu können. <br>
                        In den runden Klammern schreiben wir jetzt einfach <b>Array-Name</b>&nbsp;<code>as</code>&nbsp;
                        <b>Schlüssel</b>&nbsp;<code>=></code>&nbsp;<b>Wert</b>. Und schon laufen wir alle Felder des
                        Arrays ab!
                    </p>
                    <p>
                        Unsere Burger werden so ganz einfach der Reihe nach gebraten und dann an die Tische serviert.
                        Fertig!
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
        name: 'Foreach',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    'foreach ( $array as $key => $value ) {',
                    '   // Code',
                    '}'
                ],
                sourcecode: [
                    '// Weiter geht\'s in unsere Braterei!',
                    '',
                    '$tableOrders = [',
                    '    12 => [',
                    '        "Cheeseburger",',
                    '       "Double-Cheeseburger"',
                    '    ],',
                    '    8 => [',
                    '        "Hamburger",',
                    '        "Cheeseburger"',
                    '    ]',
                    '];',
                    '',
                    'foreach ($tableOrders as $table => $order) {',
                    '    foreach ($order as $item) { ',
                    '        $burger = make($item);',
                    '        serve($table, $burger);',
                    '    }',
                    '}',
                    '// Feierabend! Wohlverdient.',
                ],
                animation: [
                    [ 0, 0, 0, ''],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [0, 0, 0, 'TBD Edited'],
                    [ 0, 0, 0, 'Alright, get ready...'],
                    [ 0, 0, 0, 'Wir haben Bestellungen an 3 Tischen!'],
                    [ 2, 0, 0, 'Schlau wie wir sind, geben wir dem Koch einfach ein Array.'],
                    [ 2, 0, 0, 'Für die Kellner, weisen wir der Bestellung...'],
                    [ 2, 0, 0, '... auch noch eine Tischnummer zu.'],
                    [ 3, 0, 0, 'Tisch 11: Ein Hamburger'],
                    [ 4, 0, 0, 'Tisch 23: Ein Cheeseburger'],
                    [ 5, 0, 0, 'Tisch 35: Ein Double-Cheeseburger'],
                    [ 8, 0, 0, 'Was passiert hier nun?'],
                    [ 8, 0, 0, 'Wir haben das Array "$tableOrders"...'],
                    [ 8, 0, 0, '... mit Tischnummern und Bestellungen.'],
                    [ 8, 0, 0, 'Wir nennen die Nummern "$table"...'],
                    [ 8, 0, 0, '... und die Bestellungen "$order".'],
                    [ 8, 0, 0, 'Natürlich sind die Namen frei wählbar.'],
                    [ 8, 0, 0, 'Wie genau die "Foreach"-Schleife beschrieben wird,...'],
                    [ 8, 0, 0, '...hängt aber von der Programmiersprache ab.'],
                    [ 8, 0, 0, 'Hier in PHP ist es ($array as $key => $value).'],
                    [ 8, 0, 0, 'Oder ohne $key (aka. Tischnummer):'],
                    [ 8, 0, 0, '($array as $value)'],
                    [ 8, 1, 0, 'Haben wir schon alle Burger durch?'],
                    [ 8, 2, 0, 'Auf keinen Fall! Also los.'],
                    [ 9, 0, 1, 'Erste Bestellung, der "Hamburger", wird gebraten.'],
                    [ 9, 0, 1, 'Wir machen aus dem $order einen $burger'],
                    [10, 0, 0, 'Und servieren ihn an $table.'],
                    [11, 0, 0, 'Erster Burger serviert.'],
                    [11, 0, 0, 'Zurück zum Schleifenanfang.'],
                    [ 8, 1, 0, 'Nun der zweite Burger. Hier wird alles automatisch überprüft.'],
                    [ 8, 1, 0, 'Die Schleife läuft nur so oft, wie es Elemente im Array gibt.'],
                    [ 8, 2, 0, 'Wir sind bei Nummer 2 von 3.'],
                    [ 9, 0, 2, 'Zweiter Burger: "Cheeseburger", wird gebraten.'],
                    [10, 0, 2, 'Auch der geht an einen hungrigen Kunden.'],
                    [11, 0, 0, 'Und weiter.'],
                    [ 8, 1, 0, 'Noch Bestellungen da?'],
                    [ 8, 2, 0, 'Ja. Ein "Double-Cheeseburger" ist noch übrig.'],
                    [ 9, 0, 3, 'Pfannenwender-Action.'],
                    [10, 0, 3, 'Servier-Action.'],
                    [11, 0, 0, 'Bam.'],
                    [ 8, 1, 0, 'Wir schauen noch einmal, noch Burger übrig?'],
                    [ 8, 3, 0, 'Neeein...'],
                    [11, 0, 0, 'Also überspringen!'],
                    [13, 0, 0, 'Wir haben alle Bestellungen serviert!'],
                    [13, 0, 0, 'UND DAS RESTAURANT RASTET AUS!'],
                    [13, 0, 0, 'WAS FÜR EINE KRASSE SESSION!'],
                    [13, 0, 0, '...'],
                    [13, 0, 0, 'Spaß beiseite. Wir sind durch für heute!'],
                    [13, 0, 0, 'Wir hoffen, du hast etwas gelernt.'],
                    [13, 0, 0, 'Wenn nicht, schau doch einfach nochmal rum!'],
                    [13, 0, 3, 'Viel Erfolg!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                ],
                exercise: [
                    [ 0, 1, 2, 3, 4, 5, 6 ]
                ]
            }
        }
    }
</script>