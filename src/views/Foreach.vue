<template>
    <div id="foreach-loop">
        <div class="container">
            <h1>Foreach-Loop</h1>
            <p class="lead text-black-50">Die Schleife, die alle Elemente eines Array oder Iterables durchläuft.</p>

            <Layout :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="desc">
                    <p>
                        Der "Foreach"-Loop vereinfacht das Durchlaufen von Arrays ungemein. Zwar kann man mit einem
                        normalen "For"-Loop unter Angabe der Array-Länge das gleiche erreichen, doch spart man sich hier
                        wertvolle Zeit und Schreibarbeit und hat gleichzeitig besser lesbaren Code.
                    </p>
                    <p>
                        Beim Durchlaufen der "Foreach"-Schleife wird nämlich jedem Feld des Iterables (bspw. Schlüssel
                        und Wert eines Arrays) der Variablenname im Kopf zugewiesen. So kann die Zuweisung durch
                        Adressieren einer bestimmten Stelle im Array (z.B. <code>$field = $array[$i]</code>) einfach
                        übersprungen werden.
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
                sourcecode: [
                    '// Das Restaurant läuft. 3 verschiedene Bestellungen.',
                    '',
                    '$tableOrders = array(',
                    '    11 => "Hamburger",',
                    '    23 => "Cheeseburger",',
                    '    35 => "Double-Cheeseburger",',
                    ');',
                    '',
                    'foreach ($tableOrders as $table => $order) {',
                    '    $burger = make($order);',
                    '    serve($table, $burger);',
                    '}',
                    '',
                    '// Feierabend! Geil.',
                ],
                animation: [
                    [ 0, 0, 0, 'Alright, get ready...'],
                    [ 2, 0, 0, 'Wir haben Bestellungen an 3 Tischen!'],
                    [ 2, 0, 0, 'Schlau wie wir sind, geben wir dem Koch einfach ein Array.'],
                    [ 2, 0, 0, 'Für die Kellner, weisen wir der Bestellung...'],
                    [ 2, 0, 0, '...auch noch eine Tischnummer zu.'],
                    [ 3, 0, 0, 'Tisch 11: Ein Hamburger,'],
                    [ 4, 0, 0, 'Tisch 23: Ein Cheeseburger,'],
                    [ 5, 0, 0, 'Tisch 35: Ein Double-Cheeseburger,'],
                    [ 8, 0, 0, 'Was passiert hier nun?'],
                    [ 8, 0, 0, 'Wir haben das Array "$tableOrders", ...'],
                    [ 8, 0, 0, 'mit den Nummern und Bestellungen.'],
                    [ 8, 0, 0, 'Wir nennen die Nummern "$table"...'],
                    [ 8, 0, 0, '... und die Bestellungen "$order".'],
                    [ 8, 0, 0, 'Natürlich sind die Namen frei wählbar ;)'],
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
                    [13, 0, 0, 'Alle Bestellungen raus!'],
                    [13, 0, 0, 'UND DAS RESTAURANT RASTET AUS!'],
                    [13, 0, 0, 'WAS FÜR EINE KRASSE SESSION!'],
                    [13, 0, 0, '...'],
                    [13, 0, 0, 'Spaß beiseite. Wir sind durch für heute!'],
                    [13, 0, 0, 'Wir hoffen, du hast etwas gelernt.'],
                    [13, 0, 0, 'Wenn nicht, schau doch einfach nochmal rum ;)'],
                    [13, 0, 3, 'Viel Erfolg!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                ]
            }
        }
    }
</script>