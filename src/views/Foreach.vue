<template>
    <div id="foreach-loop" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise" :people="people">
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
                        <b>Last but not least! </b> <br>
                        Du hast es bis zum letzten Quiz geschafft. Dabei hast du gelernt zu implementieren wie man <code>burger</code> belegt, <code>orders</code> der <code>customers</code> aufnimmt und die <code>burger</code>-Produktion koordiniert.
                        Zuletzt sollen die <code>burger</code> nun an die richtigen <code>tables</code> kommen. Dazu nutzen wir unseren Hash mit den <code>$tableOrders</code>.
                        
                    </p>
                    <p> <b> „Tisch 4 bekommt noch einen Milkshake, Tisch 12 wartet schon seit 10 Minuten!“ </b> <br>
                    
                        Es müssen noch die Bestellungen von zwei Tischen zubereitet und serviert werden. <br>
                        Tisch <code>4</code> hatte einen <code>hamburger</code>, eine <code>fries</code> und einen <code>milkshake</code>. <br>
                        Die Bestellung von Tisch <code>12</code> umfasst zwei <code>Double-Cheeseburger</code> und eine <code>Coke</code>.
                        Wenn das <code>$tableOrders</code> steht, versuche die Zubereitung der <code>$items</code> bis hin zum servieren durch die <code>foreach</code>-Schleife auszudrücken.
                        Genauer gesagt, musst du zuerst jede <code>tableOrder</code> als <code>$table</code> und <code>$order</code> durchgehen und dann für jedes <code>$order</code> den <code>burger</code> machen und direkt servieren (<code>serve()</code>).
                        Damit hast du die Königsklasse des BurgerLoop abgeschlossen und kannst mehr als stolz sein. <br>
                        Also lass uns noch ein letztes Mal die Ärmel hochkrempeln und ran an die Arbeit!
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
                    'foreach ($array as $key => $value) {',
                    '   // Code',
                    '}'
                ],
                sourcecode: [
                    '// Weiter geht\'s in unsere Braterei!',
                    '',
                    '$tableOrders = [',
                    '    12 => [',
                    '        "Cheeseburger",',
                    '        "Double-Cheeseburger"',
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
                 
                    [ 0, 0, 0, 'Alright, get ready...'],
                    [ 0, 0, 0, 'Wir haben Bestellungen an 2 Tischen!'],
                    [ 2, 0, 0, 'Schlau wie wir sind, geben wir dem Koch einfach ein Array.'],
                    [ 2, 0, 0, 'Für die Kellner, weisen wir der Bestellung...'],
                    [ 2, 0, 0, '... auch noch eine Tischnummer zu.'],
                    [ 3, 0, 0, 'So implementieren wir Hashes in Arrays'],
                    [ 3, 1, 0, 'Tisch 12 bekommt...'],
                    [ 4, 2, 1, '...einen Cheese-...'],
                    [ 5, 2, 2, '...und einen Double-Cheeseburger'],
                    [ 7, 1, 0, 'Die Bestellung für Tisch 8:'],
                    [ 8, 2, 3, 'Einen Hamburger...'],
                    [ 9, 2, 1, '...und einen Cheeseburger, yam!'],
                    [ 9, 1, 0, 'Wie können wir nun die Bestellungen schnellstmöglich zubereiten...'],
                    [ 9, 1, 0, '...und an die Tische bringen?'],
                    [ 13, 0, 0, 'Hierfür nehmen wir gleich zwei foreach-Schleifen!'],
                    [ 13, 0, 0, 'Die äußere definiert alle $tableOrders die es abzuarbeiten gilt,...'],
                    [ 13, 0, 0, '...so dass keine Bestellung vergessen wird.'],
                    [ 14, 0, 0, 'Bei der inneren Schleife geht es rund!'],
                    [ 14, 0, 0, 'Hier werden die $items in den $orders...'],
                    [ 15, 2, 0, '...zubereitet...'],
                    [ 16, 2, 0, '...und serviert!'],
                    [ 16, 0, 0, 'So einfach und schnell kann es gehen!'],
                    
                    
              
                    [19, 0, 0, 'Wir haben alle Bestellungen serviert!'],
                    [19, 0, 0, 'UND DAS RESTAURANT RASTET AUS!'],
                    [19, 0, 0, 'WAS FÜR EINE KRASSE SESSION!'],
                    [19, 0, 0, '...'],
                    [19, 0, 0, 'Spaß beiseite. Wir sind durch für heute!'],
                    [19, 0, 0, 'Wir hoffen, du hast etwas gelernt.'],
                    [19, 0, 0, 'Wenn nicht, schau doch einfach nochmal rum!'],
                    [19, 0, 3, 'Viel Erfolg!'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                ],
                exercise: [
                    [ "$tableOrders", "=", "[", ],
                    [ "4", "=>", "[", "\"Hamburger\", \"Fries\", \"Milkshake\"", "]", ",", ],
                    [ "12", "=>", "[", "\"Double-Cheeseburger\", \"Double-Cheeseburger\", \"Coke\"", "]", ],
                    [ "]", ";", ],
                    [ "foreach", "(", "$tableOrders", "as", "$table", "=>", "$order", ")", "{", ],
                    [ "foreach", "(", "$order", "as", "$item", ")", "{", ],
                    [ "$burger", "=", "make" , "(", "$item", ")", ";", ],
                    [ "serve(", "$table", ",", "$burger", ")", ";", ],
                    [ "}" ],
                    [ "}" ]
                ],
                people: [ "barkeeper", "guest" ]
            }
        }
    }
</script>
