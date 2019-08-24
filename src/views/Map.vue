<template>
    <div id="map" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise">
                <template slot="intro">
                    <h1><code>map</code> List</h1>
                    <p class="lead text-black-50">Wie das Array, nur mit eigenem Namen für jedes Feld.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b> „Tisch 6 wartet nun schon 10 Minuten – noch länger und sie fressen uns!“ </b>
                        Unser Bestellprozess geht weiter. Nachdem die <code>orders</code> in unseren <code>arrays</code> aufgenommen sind geht’s weiter in die Küche. 
                        Hier laufen alle aktuellen <code>orders</code> im Hash <code>tableOrders</code> zusammen. Um das Chaos nicht zu unterstützen und schnellstmöglichen Zugriff auf einzelne Bestellungen zu gewährleisten, wird jede <code>order</code> beim Einpflegen in den Hash mit einer Tischnummer versehen. What, das geht?! Klar! 
                    </p>
                    <p>
                    <b> „Chef, die Bestellung kommt rein!“ </b>
                    Unser Hash funktioniert im Endeffekt wie ein Array. Jedoch hat dieser keine bereits nummerierten Indizies, sondern diese können frei bestimmt werden. Schlüssel-Wert-Paare werden hier gebildet – Ahhhhhja, Moment. Bitte WAS?! 
                    Schlüssel und Wert. Daraus bestehen die Felder eines Hashes. So kann jedes Feld einen individuell und manuell generierten Schlüssel (Index) tragen, mittels dessen wir den Hash schneller nach einzelnen Inhalten in den Feldern durchsuchen können. Das spart Zeit. Anders als beim vorherigen <code>orders-array</code> müssen wir nicht alle Felder durchlaufen, sondern haben direkten Zugriff auf den Wert eines Feldes – vorausgesetzt wir kennen den Schlüssel. Hierbei spricht man von einer ungeordneten Liste. Die einzelnen Elemente der Liste können nicht mittels des numerischen Indizes angesprochen werden, sondern über den selbst generierten Schlüsselwert des Feldes. 
                    </p>
                    <p>
                    <b> „Bestellung für Tisch 8 geht raus!“</b>
                    Unser Hash <code>$tableOrders[]</code> beinhaltet kurz nach Öffnung der Ladentüren schon zwei <code>orders</code>. Die <code>customers</code> sitzen jeweils an den Tischen <code>12</code> und <code>8</code>. Anhand der Tischnummern fügen wir jetzt die vorherig aufgenommenen <code>orders-arrays</code> in unseren großen Hash ein. Nun kann der komplette Hash schnell nach den fehlenden Bestellungen durchsucht werden. 
                    Hat ein Tisch nun Prio kann schnell mittels der Tischnummer (unser Schlüssel) die Bestellung (der Wert unseres Feldes – d.h. alle Werte unseres vorherigen <code>arrays</code>) schnell und effizient bearbeitet werden. 
                    </p>
</template>

                <template slot="task">
                    <p>
                        <b>„Ist der Tisch am Fenster noch frei?“</b>
                        </p>
                   <p>
                   Unsere <code>customers</code> haben an sich freie Platzwahl – solange es freie Plätze gibt. 
                    Die Türen des Laden haben kaum geöffnet, da wurden schon die ersten drei Bestellungen abgegeben. Die <code>customers</code> setzen sich an drei verschiedene Tische: 
                        </p>
                   <p> <b>Tischnummer 7 hat die Bestellung: Hamburger, Fries und Coke <br>
                    Tischnummer 15 hat die Bestellung: Double-Cheeseburger und Milkshake <br>
                    Tischnummer 3 hat die Bestellung: 2 x Cheeseburger, Fries, Coke und Milkshake <br>
                  </b>
                  Versuche die Bestellungen richtig in den <code>$tableOrders[]</code> zu implementieren!
                        </p>
                   <p>
                        <b>Wenn die Kunden nicht mehr ruhig sitzen können… </b>
                        Im Sitzbereich des BurgerLoops herrscht reges Treiben. Kunden werden ungeduldig, Tische am Fenster werden frei – es setzt sich etwas in Bewegung. 
                        Nun sind alle Tischnummern in unserem großen <code>$tableOrders</code>-Hash durcheinander geraten und passen nicht mehr zu den <code>orders</code>.. 
                        Damit keiner eine falsche Bestellung bekommt musst du nun versuchen die <code>orders</code> wieder den richtigen Tischnummern zuzuordnen. 

                        </p>  
                   <p> <b>
                        Die Kunden an den Tischen 7 und 15 kannten sich anscheinend und sind gemeinsam an den großen Tisch mit Nummer 18 gezogen. <br>
                        Das Pärchen mit der Tischnummer 3 hat sich an den Tisch mit Nummer 15 gesetzt, da dieser am Fenster liegt. </b>
                        
                       Bring die Bestellungen und Tischnummern wieder in die richtige Ordnung! 
                    </p>       
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'Map',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    '$map = [',
                    '   $key => $value ,',
                    '   $key2 => $value2 // etc.',
                    '] ;'
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
                    '// "Julio, Tisch 8 hat Prio!"',
                    '',
                    'echo $tableOrders[8]',
                    '',
                    '// Also: [ "Hamburger", "Cheeseburger" ]',
                    '',
                    '// *DING* Alle neuen Kunden bedient. Es läuft!'
                ],
                animation: [
                    [0, 0, 0, 'TBD'],
                    [0, 0, 0, 'TBD'],
                    [0, 0, 0, 'TBD']
                ],
                burgerAnimation: [
                    [],
                    [],
                ],
                exercise: [
                    [ "Hamburger", "Fries", "Coke", "Cheeseburger", "Milkshake", "Double-Cheeseburger", "Milkshake", "Double-Cheeseburger", "$tableOrders=[", "];", "];", "];", "];", "];", ";", ";", ";", ";", "$tableOrders[", "],", "],", "],", "echo", ",", ",", ",", ",", ",", ",",  "Fries", "Coke", "Cheeseburger", 7, 15, 18, 3, 14]
                ]
            }
        }
    }
</script>
