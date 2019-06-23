<template>
    <div id="array" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation">
                <template slot="intro">
                    <h1><code>array</code> Liste</h1>
                    <p class="lead text-black-50">Eine Liste, in der du Sachen hinzufügen und löschen kannst.</p>
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
        name: 'Array',
        components: {Layout},
        data() {
            return {
                sourcecodeGeneral: [
                    '$array = [',
                    '   $item1, $item2 // etc.',
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
                    [0, 0, 0, 'TBD'],
                    [0, 0, 0, 'TBD'],
                    [0, 0, 0, 'TBD']
                ],
                burgerAnimation: [
                    [],
                ]
            }
        }
    }
</script>