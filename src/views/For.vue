<template>
    <div id="for-loop" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise" :people="people">
                <template slot="intro">
                    <h1><code>for</code> Loop</h1>
                    <p class="lead text-black-50">Wie eine While-Schleife, die du <strong class="text-body">ohne Hilfsvariablen</strong> erzeugen kannst.</p>
                </template>

                <template slot="desc">
                    <p>
                        <b>Kümmern wir uns um unsere nächsten Kunden, eine große Bestellung.</b> <br>
                        Was wenn wir für unsere Bestellungen nicht jedes Mal eine Variable für die Anzahl erstellen
                        wollen? Wir brauchen einen Helfer, der uns diese Arbeit erleichtert.
                    </p>
                    <p>
                        Wie die <code>while</code>-Schleife, kann eine <code>for</code>-Schleife einen Code-Block
                        beliebig oft wiederholen. Praktisch ist aber, dass die <code>for</code>-Schleife ohne extra
                        Variablen auskommt. <b>Wir erstellen alles was wir brauchen im Kopf der Schleife selbst.</b>
                        Wir brauchen also 3 Durchläufe um 3 Cheeseburger zu braten.

                    </p>
                    <p>
                        <b>Wie genau machen wir das?</b> <br>
                        Die <code>for</code>-Schleife erhält 3 Parameter, getrennt durch Semikolons. Der erste Parameter
                        ist die <b>Initialisierung der Laufvariable.</b> Hier legen wir den Startwert fest, also
                        <code>$burgerCount = 0</code>.<br>
                        Der 2. Parameter ist die <b>Fortsetzungs-Bedingung</b>, die wir schon von den vorherigen
                        Schleifen kennen. <br>
                        Der dritte Parameter, macht das, was wir vorher manuell machen mussten, also zum Beispiel, die
                        Laufvariable um 1 erhöhen (<code>$burgerCount++</code>). <b>Diese Anweisung wird nach jedem
                        Durchlauf ausgeführt.</b>
                    </p>
                    <p>
                        Wenn wir die Schleife so anlegen, können wir in einer Zeile gleich drei Burger braten und unsere
                        Aufgabe ist erfüllt!
                    </p>
                </template>

                <template slot="task">
                    <p>
                        Es wird immer komplizierter. Nachdem du nun fleißig beim Belegen der <code>burger</code>  in der Küche geholfen hast, sollst du nun die <code>orders</code>  managen. Dazu muss eine <code>for</code>-Schleife implementiert werden, mittels der die Küche erkennen kann, wie viele <code>burger</code>  noch raus gehen müssen. Wir wollen weder <code>burger</code>  verschwenden, noch einen hungrigen Kunden mit knurrendem Magen zurück lassen.
                    </p>
                    <p>
                        <b>
                            „Einmal Double-, <br>
                            zwei Mal Cheese-, <br>
                            drei Mal Hamburger <br>
                            ..oder waren es doch 5?!“
                        </b>
                    </p>
                    <p>
                        Um immer den Überblick zu behalten, versuche mit der <code>for</code>-Schleife und unter Einbezug des <code>$burgerIndex</code>  die <code>orders</code>  zu koordinieren. Vergiss dabei nicht die drei Parameter am Schleifen-Beginn festzulegen. Haben wir am Ende genau die richtige Anzahl an <code>burger</code> stimmt alles – also einen kühlen Kopf bewahren, die erste <code>order</code>  kommt rein:
                    <br>
                        <b>
                            „Einen Hamburger, <br>
                            einen Cheeseburger, <br>
                            und den Red-Hot-Chili-Burger!“
                        </b>
                    </p>
                    <p>
                        Versuche zunächst den <code>order-array</code> anzulegen und danach eine <code>for</code>-Schleife zur Burger-Koordination zu implementieren!
                        Erstelle hierzu für jeden Durchgang den <code>$burger</code> des Arrays <code>$order</code> an der jeweiligen <code>$orderIndex</code>-Stelle und brate die Burger mit <code>make()</code>.
                    </p>
                </template>
            </Layout>
        </div>
    </div>
</template>

<script>
    import Layout from "../components/Layout";
    export default {
        name: 'For',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    'for ($count = 0; $condition; $count++) {',
                    '   // Code',
                    '}'
                ],
                sourcecode: [
                    '// Die Bestellung ist in der Küche angekommen!',
                    '',
                    '$order = [',
                    '    "Cheeseburger",',
                    '    "Double-Cheeseburger",',
                    '    "Hamburger",',
                    '];',
                    '',
                    '// Wir gehen Step by Step die Liste ab und braten unsere Burger:',
                    'for ($orderIndex = 0; $orderIndex < count($order); $orderIndex++) {',
                    '    $burger = $order[$orderIndex];',
                    '    make($burger);',
                    '}',
                    '',
                    '// Guten Appetit!'
                ],
                  animation: [
                    
                    [0, 0, 0, 'Da hat jemand Hunger. 3 Burger!'],
                    [2, 0, 0, 'Lass uns gleich den Array mit der Bestellung füllen.'],
                    [3, 2, 1, 'Einen Cheeseburger, bitte...'],
                    [4, 2, 2, '...dann noch einen Double-Cheeseburger.'],
                    [5, 2, 3, 'UUUUND einen Hamburger'],
                    [6, 2, 3, 'Perfekt! Das haben wir!'],
                    [8, 0, 0, 'Machen wir uns ans braten!'],
                    [8, 0, 0, 'Bei uns werden alle Burger in Burger-Loops zubereitet'],
                    [8, 0, 0, 'Diese erleichtern den Prozess!'],
                    [8, 0, 0, 'Auch diesen repetitiven Task können wir vereinfachen.'],
                    [9, 0, 0, 'Applaus für die "For"-Schleife!'],
                    [9, 1, 0, 'Was passiert hier im Detail?'],
                    [9, 0, 0, 'Beim ersten Aufruf der Schleife wird zuerst...'],
                    [9, 0, 0, '...die Laufvariable "$orderIndex" mit dem Wert 0 erstellt.'],
                    [9, 0, 0, '...denn nur so kann der $order-Array durchlaufen werden...'],
                    [9, 0, 0, '...und jede Bestellung wird nacheinander zubereitet.'],
                    [9, 1, 0, 'Wie stoppt man dann die Prozedur?'],
                    [9, 2, 0, 'Mittels des 2. Parameters, der Laufbedingung.'],
                    [9, 0, 0, 'Unsere Bestellungen im Feld $orders steigern den count().'],
                    [9, 0, 0, 'Damit alle Bestellungen zubereitet werden...'],
                    [9, 0, 0, '...sollte die Schleife so lange laufen...'],
                    [9, 0, 0, '...bis alle Bestellungen weg sind, ...'],
                    [9, 2, 0, '...und es keinen zu adressierenden Index mehr gibt.'],
                    [9, 0, 0, 'Der $orderIndex wird nach jedem Durchgang um eins erhöht.'],
                    [9, 2, 0, 'Dies wird im 3. Parameter festgelegt.'],
                    [10, 0, 1, 'Für jeden $burger wird der zu bratende Burger im Array gefunden...'],
                    [11, 2, 1, '...und kann nach altem Hausrezept zubereitet werden!'],
                    [14, 2, 1, 'Dann lassen wir es uns mal schmecken!'],
                    [6, 0, 1, 'Lerne jetzt "Foreach"-Schleifen kennen!'],

                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'sauce', 'topBun' ],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'sauce', 'topBun' ],
                ],
                exercise: [
                    [ "$order", "=", "[", ],
                    [ "\"Hamburger\", \"Cheeseburger\", \"Red-Hot-Chili-Burger\"" ],
                    [ "]", ";" ],
                    [ "for", "(", "$orderIndex", "=", "0", ";", "$orderIndex", "<", "count(", "$order", ")", ";", "$orderIndex++", ")", "{", ],
                    [ "$burger", "=", "$order", "[", "$orderIndex", "]", ";", ],
                    [ "make(", "$burger", ")", ";" ],
                    [ "}" ]
                ],
                people: [ "barkeeper" ]
            }
        }
    }
</script>
