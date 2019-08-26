<template>
    <div id="array" class="content-wrapper">
        <div class="container">

            <Layout :sourcecode-general="sourcecodeGeneral.join('\n')" :sourcecode="sourcecode.join('\n')" :animation="animation" :burger-animation="burgerAnimation" :exercise="exercise" :people="people">
                <template slot="intro">
                    <h1>Impressum</h1>
                    <p class="lead text-black-50">Mit freundlicher Unterstützung durch</p>
                </template>

                <template slot="desc">
                    <div class="text-small">
                        <h3>Auftraggeber</h3>
                        <h4>
                            Virtuelle Hochschule Bayern
                        </h4>
                        <p>
                            Luitpoldstr. 5 <br>
                            96052 Bamberg
                        </p>

                        <h3>Leitung</h3>
                        <h4>Prof. Dr. Rolf Schillinger</h4>
                        <p>
                            <a href="mailto:rolf.schillinger@fhws.de">rolf.schillinger@fhws.de</a><br>
                            Fakultät Informatik und Wirtschaftsinformatik <br><br>
                            Hochschule für angewandte Wissenschaften Würzburg - Schweinfurt <br>
                            Münzstraße 12 <br>
                            97070 Würzburg
                        </p>
                        <h3>Studenten</h3>
                        <h4 class="mb-1">Alexander Fürst</h4>
                        <p class="mb-1">
                            <a href="mailto:alexander.fuerst@student.fhws.de">alexander.fuerst@student.fhws.de</a><br>
                            Studiengang E-Commerce
                        </p>
                        <ul>
                            <li>Konzeption</li>
                            <li>Interface Design</li>
                            <li>Technische Umsetzung</li>
                        </ul>
                        <h4 class="mb-1">Christiane Pluta</h4>
                        <p class="mb-1">
                            <a href="mailto:christiane.pluta@student.fhws.de">christiane.pluta@student.fhws.de</a><br>
                            Studiengang E-Commerce
                        </p>
                        <ul>
                            <li>Illustration</li>
                            <li>Konzeption</li>
                            <li>Texte</li>
                        </ul>
                    </div>
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
                    '$team = [',
                    '   "Rolf Schillinger",',
                    '   "Alexander Fürst",',
                    '   "Christiane Pluta"',
                    '];',
                ],
                sourcecode: [
                    '// TBD',
                ],
                animation: [
                    [0, 0, 0, 'TBD'],
                    [0, 0, 0, 'TBD'],
                    [0, 0, 1, 'TBD']
                ],
                burgerAnimation: [
                    [],
                    [ 'bottomBun', 'patty', 'salad', 'tomatoes', 'cheese1', 'cheese2', 'cheese3', 'sauce', 'topBun' ],
                ],
                exercise: [
                    [ 0, 1, 2, 3 ]
                ],
                people: [ "barkeeper", "guest", "chef" ]
            }
        }
    }
</script>