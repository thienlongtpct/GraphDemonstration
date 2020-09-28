let sIntro = new sigma({
    renderer: {
        container: document.getElementById('introGraph'),
        type: 'canvas'
    },
    settings: {
        minEdgeSize: 0.1,
        maxEdgeSize: 2,
        minNodeSize: 1,
        maxNodeSize: 8,
    }
});
let introGraph = {
    nodes: [
        { id:  "v1", label: 'Graph Demonstrater', x: 0.585330720691686800, y: 2.7080569614172614, size: 4, color: '#e50914' },
        { id:  "v2", label: 'HTML'              , x: 0.6295141742288610, y: 2.5220368777354127, size: 2, color: '#e50914' },
        { id:  "v3", label: 'CSS'               , x: 0.2520813829333960, y: 2.8918692975048477, size: 2, color: '#e50914' },
        { id:  "v4", label: 'Bootstrap'         , x: 0.3888978284515440, y: 3.0216091200434240, size: 1, color: '#e50914' },
        { id:  "v5", label: 'Font Awesome'      , x: -0.077292479536733, y: 3.0345181268101760, size: 1, color: '#e50914' },
        { id:  "v6", label: 'JavaScript'        , x: 0.0793183270530790, y: 2.5356904321788503, size: 2, color: '#e50914' },
        { id:  "v7", label: 'Code Mirror'       , x: -0.2587648643284783, y: 2.8018465997138557, size: 1, color: '#e50914' },
        { id:  "v8", label: 'Sigma JS'          , x: -0.1557479817384406, y: 2.3849828747530740, size: 1, color: '#e50914' },
        { id:  "v9", label: 'JQuery'            , x: 0.1149335097549233, y: 2.3149291293576810, size: 1, color: '#e50914' },
        { id: "v10", label: 'Java'              , x: 0.919397573600045300, y: 2.8747236280839283, size: 2, color: '#e50914' },
        { id: "v11", label: 'Spring Framework'  , x: 1.3037010897884810, y: 2.5280569614172617, size: 1, color: '#e50914' },
        { id: "v12", label: 'Standard libraries', x: 1.3012625280453590, y: 3.0280569614172617, size: 1, color: '#e50914' },
        { id: "v13", label: 'Bootstrap Select'  , x: 0.0873944516983315, y: 2.7492204681995194, size: 1, color: '#e50914' },
        { id: "v14", label: 'MathJax'           , x: 0.9873944516983315, y: 2.3220368777354127, size: 1, color: '#e50914' },
    ],
    edges: [
        { id: "e1", source: "v2", target: "v1", color: '#221f1f', type: 'arrow', size: 3, label: ''},
        { id: "e2", source: "v3", target: "v1", color: '#221f1f', type: 'arrow', size: 3, label: ''},
        { id: "e3", source: "v6", target: "v1", color: '#221f1f', type: 'arrow', size: 3, label: ''},
        { id: "e4", source: "v10", target: "v1", color: '#221f1f', type: 'arrow', size: 3, label: ''},
        { id: "e5", source: "v4", target: "v3", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e6", source: "v5", target: "v3", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e7", source: "v7", target: "v6", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e8", source: "v8", target: "v6", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e9", source: "v9", target: "v6", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e10", source: "v11", target: "v10", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e11", source: "v12", target: "v10", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e12", source: "v13", target: "v3", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
        { id: "e13", source: "v14", target: "v2", color: '#221f1f', type: 'arrow', size: 3,  label: ''},
    ]
};
let introDragListener = sigma.plugins.dragNodes(sIntro, sIntro.renderers[0]);
sIntro.settings('labelThreshold', 0);
sIntro.graph.read(introGraph);
sIntro.refresh();

let sSample = new sigma({
    renderer: {
        container: document.getElementById('graph'),
        type: 'canvas'
    },
    settings: {
        minEdgeSize: 0.1,
        maxEdgeSize: 2,
        minNodeSize: 1,
        maxNodeSize: 8,
        sideMargin: .2
    }
});
let sampleDragListener = sigma.plugins.dragNodes(sSample, sSample.renderers[0]);
let sampleGraph = {
    nodes: [
        { id: "v1", label: "1", x: 0, y: 0, size: 2, color: '#0652DD' },
        { id: "v2", label: "3", x: 1, y: -1, size: 2, color: '#0652DD' },
        { id: "v3", label: "5", x: 1, y: 0, size: 2, color: '#0652DD' },
        { id: "v4", label: "6", x: 1, y: 1, size: 2, color: '#0652DD' },
        { id: "v5", label: "2", x: 2, y: 0, size: 2, color: '#0652DD' },
        { id: "v6", label: "7", x: 3, y: 0, size: 2, color: '#0652DD' },
        { id: "v7", label: "4", x: 4, y: 0, size: 2, color: '#0652DD' }
    ],
    edges: [
        { id: "e1", source: "v1", target: "v2", color: '#000000', type: 'line', size: 3, label: '2', count: 0},
        { id: "e2", source: "v1", target: "v3", color: '#000000', type: 'line', size: 3, label: '1'},
        { id: "e3", source: "v1", target: "v4", color: '#000000', type: 'line', size: 3},
        { id: "e4", source: "v5", target: "v3", color: '#000000', type: 'line', size: 3},
        { id: "e5", source: "v5", target: "v4", color: '#000000', type: 'line', size: 3,  label: '2'},
        { id: "e6", source: "v2", target: "v7", color: '#000000', type: 'line', size: 3},
        { id: "e7", source: "v2", target: "v3", color: '#000000', type: 'line', size: 3},
        { id: "e8", source: "v3", target: "v4", color: '#000000', type: 'line', size: 3},
        { id: "e9", source: "v1", target: "v2", color: '#000000', type: 'curve', size: 3, label: '5', count: 5}
    ]
};
sSample.graph.read(sampleGraph);
sSample.refresh();

let inputSample = CodeMirror.fromTextArea(document.getElementById('inputSample'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    mode: "javascript"
});
inputSample.setValue('let s = new sigma({\n' +
    '    renderer: {\n' +
    '        container: document.getElementById(\'graph\'),\n' +
    '        type: \'canvas\'\n' +
    '    },\n' +
    '    settings: {\n' +
    '        minEdgeSize: 0.1,\n' +
    '        maxEdgeSize: 2,\n' +
    '        minNodeSize: 1,\n' +
    '        maxNodeSize: 8,\n' +
    '    }\n' +
    '});\n' +
    'let dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);\n' +
    'let graph = {\n' +
    '    nodes: [\n' +
    '        {id: "v1", label: "1", x: 0, y: 0, \n' +
    '        size: 2, color: \'#0652DD\' },\n' +
    '        {id: "v2", label: "3", x: 1, y: -1, \n' +
    '        size: 2, color: \'#0652DD\' },\n' +
    '        {id: "v3", label: "5", x: 1, y: 0, \n' +
    '        size: 2, color: \'#0652DD\' },\n' +
    '        {id: "v4", label: "6", x: 1, y: 1, \n' +
    '        size: 2, color: \'#0652DD\' },\n' +
    '        {id: "v5", label: "2", x: 2, y: 0, \n' +
    '        size: 2, color: \'#0652DD\' },\n' +
    '        {id: "v6", label: "7", x: 3, y: 0, \n' +
    '        size: 2, color: \'#0652DD\' },\n' +
    '        {id: "v7", label: "4", x: 4, y: 0, \n' +
    '        size: 2, color: \'#0652DD\' }\n' +
    '    ],\n' +
    '    edges: [\n' +
    '        {id: "e1", source: "v1", target: "v2",\n' +
    '        type: \'line\', size: 3, label: \'2\', count: 0},\n' +
    '        {id: "e2", source: "v1", target: "v3",\n' +
    '        type: \'line\', size: 3, label: \'1\'},\n' +
    '        {id: "e3", source: "v1", target: "v4",\n' +
    '        type: \'line\', size: 3},\n' +
    '        {id: "e4", source: "v5", target: "v3",\n' +
    '        type: \'line\', size: 3},\n' +
    '        {id: "e5", source: "v5", target: "v4",\n' +
    '        type: \'line\', size: 3,  label: \'2\'},\n' +
    '        {id: "e6", source: "v2", target: "v7",\n' +
    '        type: \'line\', size: 3},\n' +
    '        {id: "e7", source: "v2", target: "v3",\n' +
    '        type: \'line\', size: 3},\n' +
    '        {id: "e8", source: "v3", target: "v4",\n' +
    '        type: \'line\', size: 3},\n' +
    '        {id: "e9", source: "v1", target: "v2",\n' +
    '        type: \'curve\', size: 3, label: \'5\', count: 5}\n' +
    '    ]\n' +
    '};\n' +
    's.graph.read(graph);\n' +
    's.refresh();');
