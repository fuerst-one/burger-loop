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
                        <strong>TBD Beschreibung</strong>
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
                    [ 0, 1, 2, 3, 4, 5 ]
                ]
            }
        }
    }
</script>