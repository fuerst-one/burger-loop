<template>
    <div id="hash" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise" :people="people">
                <template slot="intro">
                    <h1><code>hash</code> Liste</h1>
                    <p class="lead text-black-50">Wie das Array, nur mit eigenem Namen für jedes Feld.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b> „Tisch 6 wartet nun schon 10 Minuten – noch länger und sie fressen uns!“ </b> <br>
                        Unser Bestellprozess geht weiter. Nachdem die <code>orders</code> in unseren <code>arrays</code> aufgenommen sind geht’s weiter in die Küche.
                        Hier laufen alle aktuellen <code>orders</code> im <code>hash</code> <code>tableOrders</code> zusammen. <br>
                        Um das Chaos nicht zu unterstützen und schnellstmöglichen Zugriff auf einzelne Bestellungen zu gewährleisten, wird jede <code>order</code> beim Einpflegen in den <code>hash</code> mit einer Tischnummer versehen. <br>
                        What, das geht?! Klar!
                    </p>
                    <p>
                        <b> „Chef, die Bestellung kommt rein!“ </b> <br>
                        Unser <code>hash</code> funktioniert im Endeffekt wie ein <code>array</code>. Jedoch hat dieser keine bereits nummerierten Indizies, sondern diese können frei bestimmt werden. Schlüssel-Wert-Paare werden hier gebildet <br>
                        Ahhhhhja, Moment. Bitte WAS?! <br>
                        Schlüssel und Wert. Daraus bestehen die Felder eines <code>hashes</code>. So kann jedes Feld einen individuell und manuell generierten Schlüssel (Index) tragen, mittels dessen wir den <code>hash</code> schneller nach einzelnen Inhalten in den Feldern durchsuchen können. <br>
                        Das spart Zeit. Anders als beim vorherigen <code>orders-array</code> müssen wir nicht alle Felder durchlaufen, sondern haben direkten Zugriff auf den Wert eines Feldes – vorausgesetzt wir kennen den Schlüssel. Hierbei spricht man von einer ungeordneten Liste. Die einzelnen Elemente der Liste können nicht mittels des numerischen Indizes angesprochen werden, sondern über den selbst generierten Schlüsselwert des Feldes.
                    </p>
                    <p>
                        <b> „Bestellung für Tisch 8 geht raus!“</b> <br>
                        Unser <code>hash</code> <code>$tableOrders[]</code> beinhaltet kurz nach Öffnung der Ladentüren schon zwei <code>orders</code>. Die <code>customers</code> sitzen jeweils an den Tischen <code>12</code> und <code>8</code>. Anhand der Tischnummern fügen wir jetzt die vorherig aufgenommenen <code>orders-arrays</code> in unseren großen <code>hash</code> ein. Nun kann der komplette <code>hash</code> schnell nach den fehlenden <code>orders</code> durchsucht werden.<br>
                        Hat ein Tisch nun Prio können wir so ganz schnell mittels der Tischnummer (unser Schlüssel) die <code>order</code> (der Wert unseres Feldes – d.h. alle Werte unseres vorherigen <code>arrays</code>) schnell und effizient bearbeitet werden.
                    </p>
                </template>

                <template slot="task">
                    <p>
                        <b>„Ist der Tisch am Fenster noch frei?“</b>
                    </p>
                    <p>
                        Unsere <code>customers</code> haben an sich freie Platzwahl – solange es freie Plätze gibt.
                        Die Türen des Laden haben kaum geöffnet, da wurden schon die ersten drei <code>orders</code> abgegeben. Die <code>customers</code> setzen sich an drei verschiedene Tische:
                    </p>
                    <p>
                        <b>
                            Tischnummer 7 hat die Bestellung: Hamburger, Fries und Coke <br>
                            Tischnummer 15 hat die Bestellung: Double-Cheeseburger und Milkshake <br>
                            Tischnummer 3 hat die Bestellung: 2 x Cheeseburger, Fries, Coke und Milkshake <br>
                        </b>
                    </p>
                    <p>
                        Versuche die Bestellungen richtig in den <code>$tableOrders[]</code> zu implementieren!
                    </p>
                    <p>
                        <b>Wenn die Kunden nicht mehr ruhig sitzen können… </b> <br>
                        Im Sitzbereich des <code>BurgerLoops</code> herrscht reges Treiben. Kunden werden ungeduldig, Tische am Fenster werden frei – es setzt sich etwas in Bewegung.
                        Nun sind alle Tischnummern in unserem großen <code>$tableOrders</code>-<code>hash</code> durcheinander geraten und passen nicht mehr zu den <code>orders</code>..
                        Damit keiner eine falsche <code>order</code> bekommt musst du nun versuchen die <code>orders</code> wieder den richtigen Tischnummern zuzuordnen.

                    </p>
                    <p>
                        <b>
                            Die Kunden an den Tischen 7 und 15 kannten sich anscheinend und sind gemeinsam an den großen Tisch mit Nummer 18 gezogen. <br>
                            Das Pärchen mit der Tischnummer 3 hat sich an den Tisch mit Nummer 15 gesetzt, da dieser am Fenster liegt.
                        </b> <br>
                        Bring die <code>orders</code> und Tischnummern wieder in die richtige Ordnung!
                    </p>
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'Hash',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    '$hash = [',
                    '   $key => $value ,',
                    '   $key2 => $value2 // etc.',
                    '];'
                ],
                sourcecode: [
                    '// In der Küche kommen einige Bestellungen mit Tischnummern.',
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
                    '// "Chef, Tisch 8 hat Prio!"',
                    '',
                    'echo $tableOrders[8]',
                    '',
                    '// Also: [ "Hamburger", "Cheeseburger" ]',
                    '',
                    '// *DING* Alle neuen Kunden bedient. Es läuft!'
                ],
                  animation: [
	                    [0, 0, 0, 'Behalte einfach den Überblick'],
	                    [0, 1, 0, 'Aber wie?'],
	                    [2, 0, 0, 'Mit einem Hash 0 Problemo!'],
	                    [2, 0, 0, 'Die Bestellungen landen darin'],
	                    [3, 0, 0, 'Und bekommen Tischnummern zugewiesen'],
	                    [3, 1, 0, 'Welche Nummer?'],
	                    [3, 2, 0, 'Hier die 12!'],
	                    [3, 0, 0, 'Drin sind:'],
	                    [4, 0, 1, '1 x Cheeseburger'],
	                    [5, 0, 2, '...und 1 x Double-Cheeseburger'],
	                    [7, 1, 0, 'Was bekommt Tisch 8?'],
	                    [7, 1, 0, 'War da ein Milkshake dabei?'],
	                    [7, 0, 0, 'Schauen wir mal nach'],
	                    [8, 3, 3, '1 x Hamburger'],
	                    [9, 3, 1, '1 x Cheeseburger'],
	                    [10, 3, 0, '...'],
	                    [10, 3, 0, 'Oh no!'],
	                    [10, 3, 0, 'Wir brauchen hier keinen Milkshake!'],
	                    [10, 1, 1, 'Aber der Burger muss noch an den Tisch'],
	                    [13, 0, 1, 'Jetzt aber pronto!'],
	                    [15, 0, 0, 'Bestellung geht raus!'],
	                    
	                ],

                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                ],
                exercise: [
                    [ "$tableOrders", "=", "[" ],
                    [ "7", "=>", "[", "\"Hamburger\", \"Fries\", \"Coke\"", "]", "," ],
                    [ "15", "=>", "[", "\"Double-Cheeseburger\", \"Milkshake\"", "]", "," ],
                    [ "3", "=>", "[", "\"Cheeseburger\", \"Cheeseburger\", \"Fries\", \"Coke\", \"Milkshake\"", "]" ],
                    [ "];" ]
                ],
                people: [ "barkeeper", "chef" ]
            }
        }
    }
</script>
