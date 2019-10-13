<template>
    <div id="array" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise" :people="people">
                <template slot="intro">
                    <h1><code>array</code> Liste</h1>
                    <p class="lead text-black-50">Eine Liste, in der du Items hinzufügen und löschen kannst.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Lass uns ein paar Burger bestellen!</b> <br>
                        Im <code>BurgerLoop</code> geht eine <code>order</code> nach der anderen zu den hungrigen <code>customers</code>. Um das Magenknurren so schnell wie möglich zu stoppen sollten wir eine effiziente Bestellliste führen. So können wir <code>orders</code> überprüfen, ändern und bei Änderungen bearbeiten.
                    </p>

                    <p>
                        <b>„Waren es jetzt drei Cheeseburger oder doch der Milkshake?“</b> <br>
                        Damit Fragen wie diese beantwortet werden können, brauchen wir einen direkten Zugriff auf die einzelnen Elemente einer <code>order</code>.
                        Mittel <code>arrays</code> lassen sich Werte eines Typs in Reihung einzelner Felder unterbringen. Hier sind nun die Werte in bestimmten Felder gespeichert, welche durch einen Indizes adressiert sind. Der Indizes in einem <code>array</code> beginnt immer bei <code>0</code> und endet mit der Anzahl der implementierten Felder. Die geordnete Liste, welche das <code>array</code>  abbildet, lässt sich anhand der Indizes durchsuchen und so können mittels Zugriffsoperatoren die Werte in den Feldern dahinter ausgelesen werden.
                        Die Länge eines <code>arrays</code>  kann nach seiner Erstellung nicht mehr verändert werden. Also erst denken, dann coden.
                    </p>
                    <p>
                        Nachdem uns also nun klar ist, dass ein <code>array</code> ein Datentyp zur Speicherung anderer Datentypen ist und mittels der Indizes Felder im <code>array</code> durchlaufen und ausgelesen werden können, sollte noch erwähnt werden, dass sich <code>arrays</code> beliebig schachteln lassen.
                    </p>

                    <p>
                        <b>„Waren es jetzt drei Cheeseburger oder doch der Milkshake?“</b> <br>
                        In unserem Beispiel beinhaltet die erste <code>order</code> einen <code>Cheeseburger</code>, einen <code>Double-Cheeseburger</code> und einen <code>Hamburger</code>. Wenn unser <code>customer</code> nun wissen möchte, was er denn als zweites bestellt hat, durchlaufen wir das <code>array</code> und lesen den Inhalt des zweiten Feldes aus – Indizies beginnen bei <code>0</code>, deshalb ist das gesuchte Feld beim Index <code>1</code>. Wir geben den Wert mit <code>order[1]</code> aus. Hier unser <code>Double-Cheeseburger</code>. Danke und guten Appetit!
                    </p>
                    <p>
                        Lass die <code>customers</code> nicht warten und versuch dich bei der Implementierung des <code>order-arrays!</code>
                    </p>
                </template>

                <template slot="task">
                    <p>
                        Du musst vorne an der Theke einspringen, die <code>orders</code> fliegen nur so rein. Damit keine <code>order</code> verloren geht solltest du jede der <code>orders</code> in ein <code>array</code> einpflegen.
                    </p>
                    <p>
                        Der erste deiner <code>customer</code> kommt. Seine <code>order</code> lautet:
                    </p>
                    
                    <p> <b>„Hallo! Ich hätte heute gerne einen <code>Double-Cheeseburger</code> mit einer großen Portion <code>fries</code> und einer kalten <code>coke</code>. <br>
                        Ach weisst du was, ich habe wirklich großen Hunger, ich nehme noch einen <code>Hamburger</code> dazu. <br>
                        Obwohl ich eigentlich auf meine Linie achten sollte.. <br>
                        Naja dann lass die <code>fries</code> weg aber gibt mir zur <code>coke</code> noch einen <code>milkshake</code> dazu. Das wäre dann alles!“ </b>
                    </p>
                    <p>
                        Welch‘ ein Chaos, wenn wir die <code>order</code> nur auf einen Zettel geschrieben hätten. Versuche die <code>order</code> deshalb in den <code>array</code> einzupflegen. Nutze dazu die vorgefertigten Codebausteine, du kannst anhand des Balkens deinen Fortschritt erkennen! <br>
                        Lass uns das <code>Array[] orders</code> aufnehmen!
                    </p>
                    <p> <b>
                        „Entschuldigung, welchen Burger hatte ich als erstes bestellt?“ </b> <br>
                        Gib dem Kunden die Antwort auf seine Frage indem du den Inhalt des ersten Feldes im <code>array</code> ausgeben lässt!
                    </p>
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'Array',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    '$array = [',
                    '   $item1 , $item2 // etc.',
                    '];'
                ],
                sourcecode: [
                    '// Hier wird eine Bestellung aufgenommen:',
                    '',
                    '$order = [',
                    '    "Cheeseburger",',
                    '    "Double-Cheeseburger",',
                    '    "Hamburger",',
                    '];',
                    '',
                    '// Sorry, was war nochmal das Zweite?',
                    '// Array Indizes beginnen bei 0, also: 0, 1',
                    '',
                    'echo $order[1];',
                    '',
                    '// Antwort: "Double-Cheeseburger"',
                    '',
                    '',
                    '// "Also, das war\'s für mich. Was wollt ihr?"',
                    '// - Props gehen raus für den Joke!',
                ],
                animation: [
                    [0, 0, 0, 'Und los! Nimm schnell die Bestellung auf!'],
                    [0, 1, 0, 'Die Bestellung beinhaltet:'],
                    [3, 0, 1, '1 x Cheeseburger'],
                    [4, 0, 2, '1 x Double-Cheeseburger'],
                    [5, 0, 3, '...und noch \'n Hamburger'],
                    [5, 0, 3, 'Lecker!'],
                    [5, 1, 0, 'Um die Bestellung jetzt an die Küche zu geben...'],
                    [2, 0, 0, '...verwendest du einfach den Array'],
                    [2, 0, 0, 'Dabei werden alle Items eingepflegt...'],
                    [2, 0, 0, '...und durch Indizes adressiert'],
                    [3, 2, 1, 'Cheeseburger beginnt mit Index 0'],
                    [4, 2, 2, 'Hier dann Index 1'],
                    [5, 2, 3, '...und so weiter'],
                    [5, 2, 3, 'Perferkt!'],
                    [5, 2, 3, 'Jetzt ist alles drin.'],
                    [8, 0, 0, 'Oh!'],
                    [8, 3, 0, 'Da hat es jemand wohl vercheckt.'],
                    [9, 0, 0, 'Für uns aber kein Problem!'],
                    [9, 0, 0, 'Mittels Index einfach das Feld bestimmen und - '],
                    [11, 0, 0, 'Einfach auslesen!'],
                    [13, 2, 3, 'Kein Ding für \'n King!'],
                    [16, 0, 0, 'Darf es noch etwas sein?'],
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                ],
                exercise: [
                    [ "$order", "=", "[", ],
                    [ "\"Double-Cheeseburger\", \"Coke\", \"Hamburger\", \"Milkshake\"", ],
                    [ "];", ],
                    [ "echo", "$order", "[", "1", "]", ";" ]
                ],
                people: [ "barkeeper" ]
            }
        }
    }
</script>
