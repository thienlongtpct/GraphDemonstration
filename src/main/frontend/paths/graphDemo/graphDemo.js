//Sigma graph initializer
let s = new sigma({
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

let dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
s.settings('labelThreshold', 0);

let graph = {
    nodes: [
        {id: "v1", label: "1", x: 0, y: 0, size: 2, color: '#0652DD'},
        {id: "v2", label: "2", x: 1, y: 1, size: 2, color: '#0652DD'},
        {id: "v3", label: "3", x: 3, y: 1, size: 2, color: '#0652DD'},
        {id: "v6", label: "4", x: 4, y: 0, size: 2, color: '#0652DD'},
        {id: "v4", label: "5", x: 2, y: 0, size: 2, color: '#0652DD'},
        {id: "v5", label: "6", x: 1, y: -1, size: 2, color: '#0652DD'},
        {id: "v7", label: "7", x: 3, y: -1, size: 2, color: '#0652DD'}
    ],
    edges: [
        {id: "e1", source: "v1", target: "v2", color: '#000000', type: 'line', size: 3, label: '5'},
        {id: "e2", source: "v1", target: "v3", color: '#000000', type: 'line', size: 3, label: '8'},
        {id: "e3", source: "v1", target: "v4", color: '#000000', type: 'line', size: 3, label: '7', count: 0},
        {id: "e4", source: "v1", target: "v4", color: '#000000', type: 'curve', size: 3, label: '9', count: 5},
        {id: "e5", source: "v1", target: "v5", color: '#000000', type: 'line', size: 3, label: '10'},
        {id: "e6", source: "v2", target: "v3", color: '#000000', type: 'line', size: 3, label: '1'},
        {id: "e7", source: "v2", target: "v4", color: '#000000', type: 'line', size: 3, label: '3'},
        {id: "e8", source: "v3", target: "v6", color: '#000000', type: 'line', size: 3, label: '9', count: 0},
        {id: "e9", source: "v3", target: "v6", color: '#000000', type: 'curve', size: 3, label: '6', count: 5},
        {id: "e10", source: "v4", target: "v6", color: '#000000', type: 'line', size: 3, label: '4'},
        {id: "e11", source: "v4", target: "v5", color: '#000000', type: 'line', size: 3, label: '2'},
        {id: "e12", source: "v4", target: "v7", color: '#000000', type: 'line', size: 3, label: '7'},
        {id: "e13", source: "v5", target: "v7", color: '#000000', type: 'line', size: 3, label: '3'},
        {id: "e14", source: "v7", target: "v3", color: '#000000', type: 'line', size: 3, label: '4'},
        {id: "e15", source: "v7", target: "v6", color: '#000000', type: 'line', size: 3, label: '5'}
    ]
};
s.graph.read(graph);
s.refresh();

//CodeMirror initializer
let inputN = CodeMirror.fromTextArea(document.getElementById('inputN'), {
    lineNumbers: true,
    lineWrapping: true,
    readOnly: true,
    mode: 'text'
});

inputN.setValue('7');
inputN.setSize(null, 30);

let inputEdge = CodeMirror.fromTextArea(document.getElementById('inputEdge'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    mode: 'text'
});
inputEdge.setSize(null, 307);
inputEdge.setValue(
    '1 2 5\n' +
    '1 3 8\n' +
    '1 5 7\n' +
    '1 5 9\n' +
    '1 6 10\n' +
    '2 3 1\n' +
    '2 5 3\n' +
    '3 4 9\n' +
    '3 4 6\n' +
    '5 4 4\n' +
    '5 6 2\n' +
    '5 7 7\n' +
    '6 7 3\n' +
    '7 3 4\n' +
    '7 4 5\n');

//initializer
let runningAlgorithms = 0;

let directedGraphButton = document.getElementById('directedButton');
let undirectedGraphButton = document.getElementById('undirectedButton');

let nextButton = document.getElementById('nextButton');
let stopButton = document.getElementById('stopButton');
let prevButton = document.getElementById('prevButton');

let directed = 0;
undirectedGraphButton.style.backgroundColor = 'rgb(13, 24, 37)';

$(directedGraphButton).hover(
    function () {
        if (directedGraphButton.style.backgroundColor.toString() !== 'rgb(13, 24, 37)')
            directedGraphButton.style.backgroundColor = 'rgb(23, 36, 50)';
    },
    function () {
        if (directedGraphButton.style.backgroundColor.toString() === 'rgb(23, 36, 50)')
            directedGraphButton.style.backgroundColor = 'rgb(32, 46, 62)';
    });

$(undirectedGraphButton).hover(
    function () {
        if (undirectedGraphButton.style.backgroundColor.toString() !== 'rgb(13, 24, 37)')
            undirectedGraphButton.style.backgroundColor = 'rgb(23, 36, 50)';
    },
    function () {
        if (undirectedGraphButton.style.backgroundColor.toString() === 'rgb(23, 36, 50)')
            undirectedGraphButton.style.backgroundColor = 'rgb(32, 46, 62)';
    });

undirectedGraphButton.onclick = function () {
    if (runningAlgorithms === 1) {
        alert('Алгоритм сейчас работает.');
        return false;
    }

    s.graph.edges().forEach(function (edge) {
        if (edge['type'] === 'arrow') edge['type'] = 'line';
        else if (edge['type'] === 'curvedArrow') edge['type'] = 'curve';
    });
    s.refresh();

    directed = 0;
    undirectedGraphButton.style.backgroundColor = 'rgb(13, 24, 37)';
    directedGraphButton.style.backgroundColor = 'rgb(32, 46, 62)';

    return false;
}

directedGraphButton.onclick = function () {
    if (runningAlgorithms === 1) {
        alert('Алгоритм сейчас работает.');
        return false;
    }

    s.graph.edges().forEach(function (edge) {
        if (edge['type'] === 'line') edge['type'] = 'arrow';
        else if (edge['type'] === 'curve') edge['type'] = 'curvedArrow';
    });
    s.refresh();

    directed = 1;
    undirectedGraphButton.style.backgroundColor = 'rgb(32, 46, 62)';
    directedGraphButton.style.backgroundColor = 'rgb(13, 24, 37)';

    return false;
}

let invalidWeight = 0;
let negativeWeight = 0;
document.getElementById('drawButton').onclick = function () {
    if (runningAlgorithms === 1) {
        alert('Алгоритм сейчас работает.');
        return false;
    }
    let edgeList = inputEdge.getValue().split('\n');
    let buildGraphUrl = new URL('http://localhost:8080/buildGraph');

    buildGraphUrl.searchParams.set('edgeList', edgeList);
    buildGraphUrl.searchParams.set('directed', directed);

    $.get(buildGraphUrl, function (response) {
        s.graph.clear();
        s.refresh();
        graph = response['graph'];
        s.graph.read(graph);
        s.refresh();
        inputN.setValue(response['n'].toString());
        if (response['invalidLines'].length > 1) alert("Строки с неверным вводом: " + response['invalidLines'].toString());
        else if (response['invalidLines'].length === 1) alert("Строка с неверным вводом: " + response['invalidLines'].toString());
        invalidWeight = response['invalidWeight'];
        negativeWeight = response['negativeWeight'];
    });
    return false;
}

document.getElementById('deleteButton').onclick = function () {
    if (runningAlgorithms === 1) {
        alert('Алгоритм сейчас работает.');
        return false;
    }
    s.graph.clear();
    s.refresh();
    inputN.setValue('0');
    inputEdge.setValue('');
    return false;
}

//Start algorithm
let step, cur_step = 0;

function getUrl(link) {
    let url = new URL(link);
    url.searchParams.set('source', document.getElementById('source').value);

    let edgeList = inputEdge.getValue().split('\n');
    url.searchParams.set('edgeList', edgeList);
    url.searchParams.set('directed', directed);

    // window.location = url;
    $.get(url, function (response) {
        step = response;
    });
}

let selectedAlgorithm = document.getElementById('selectedAlgorithm');
document.getElementById('startAlgorithm').onclick = function () {
    if (runningAlgorithms === 1) {
        alert('Алгоритм сейчас работает.');
        return false;
    }

    if (selectedAlgorithm.value === '') {
        alert('Пожалуйста, выберите алгоритм.');
        document.getElementById('source').value = '';
        return true;
    }
    if (selectedAlgorithm.value !== 'BFS' && selectedAlgorithm.value !== 'DFS' && invalidWeight === 1) {
        alert("Метки ребер не является числом, вы не можете использовать алгоритм Прима, Краскала, Дейкстры и Форда-Беллмана.");
        document.getElementById('source').value = '';
        return true;
    }
    if (selectedAlgorithm.value === 'dijsktra' && negativeWeight === 1) {
        alert("Алгоритм Дейкстры не может работать с отрицательным весом.");
        document.getElementById('source').value = '';
        return true;
    }
    if (selectedAlgorithm.value !== 'kruskal') {
        let haveVertex = 0;
        s.graph.nodes().forEach(function (vertex) {
            if (vertex['label'] === document.getElementById('source').value) haveVertex = 1;
        })

        if (haveVertex === 0) {
            alert("Этой вершины нет в графе.");
            document.getElementById('source').value = '';
            return true;
        }
    }

    runningAlgorithms = 1;
    $('#selectedAlgorithm').prop('disabled', true);
    document.getElementById('source').readOnly = true;

    if (selectedAlgorithm.value === 'BFS')
        getUrl('http://localhost:8080/bfs');
    else if (selectedAlgorithm.value === 'DFS')
        getUrl('http://localhost:8080/dfs');
    else if (selectedAlgorithm.value === 'prim')
        getUrl('http://localhost:8080/prim');
    else if (selectedAlgorithm.value === 'kruskal') {
        document.getElementById('source').value = '';
        document.getElementById('source').placeholder = 'Не нужна';
        getUrl('http://localhost:8080/kruskal');
    } else if (selectedAlgorithm.value === 'dijsktra')
        getUrl('http://localhost:8080/dijsktra');
    else if (selectedAlgorithm.value === 'bellman-ford')
        getUrl('http://localhost:8080/bellmanford');


    //reset demonstration
    setTimeout(function () {
        stopButton.disabled = false;
        nextButton.disabled = step.length <= 0;
        prevButton.disabled = true;

        cur_step = 0;
        if (document.getElementById('selectedAlgorithm').value === 'BFS' ||
            document.getElementById('selectedAlgorithm').value === 'DFS')
            nextGraphSearch();
        if (document.getElementById('selectedAlgorithm').value === 'prim')
            nextPrim();
        if (document.getElementById('selectedAlgorithm').value === 'kruskal')
            nextKruskal();
        if (document.getElementById('selectedAlgorithm').value === 'dijsktra')
            nextDijsktra();
        if (document.getElementById('selectedAlgorithm').value == 'bellman-ford')
            nextBellmanFord();

        s.refresh();
    }, 500);

    return false;
}

//Change label due to shortest path algorithms
function labelWithValue(name, value) {
    return '(' + name + ', ' + value + ')';
}

function nameOnly(label) {
    let name = '';
    for (let i = 1; i < label.length; i = i + 1) {
        if (label[i] === ',') return name;
        name = name + label[i];
    }
}

function updateValue(oldLabel, value) {
    let label = '';
    for (let i = 0; i < oldLabel.length; i = i + 1) {
        label = label + oldLabel[i];
        if (oldLabel[i] === ',') {
            label = label + ' ' + value + ')';
            return label;
        }
    }
}

//Next, stop, previous button interactive
stopButton.onclick = function () {
    runningAlgorithms = 0;
    $('#selectedAlgorithm').prop('disabled', false);
    document.getElementById('source').readOnly = false;
    stopButton.disabled = true;
    nextButton.disabled = true;
    prevButton.disabled = true;
    document.getElementById('source').placeholder = 'Исходная вершина';
    s.graph.nodes().forEach(function (vertex) {
        vertex['color'] = '#0652DD';
        if (selectedAlgorithm.value === 'dijsktra' || selectedAlgorithm.value === 'bellman-ford') vertex['label'] = nameOnly(vertex['label']);
    })
    s.graph.edges().forEach(function (edge) {
        edge['color'] = '#000000';
    })
    s.refresh();
}

function nextGraphSearch() {
    s.graph.nodes().forEach(function (vertex) {
        if (vertex['color'] === '#2ecc71') vertex['color'] = '#e74c3c';
        for (let i = 1; i < step[cur_step].length; ++i) {
            if (step[cur_step][i] === vertex['label'] && vertex['color'] !== '#e74c3c') vertex['color'] = '#fdd023';
        }
        if (step[cur_step][0] === vertex['label']) vertex['color'] = '#2ecc71';
    })
}

function nextPrim() {
    s.graph.nodes().forEach(function (vertex) {
        if (step[cur_step][0] === vertex['label']) vertex['color'] = '#e74c3c';
    })
    s.graph.edges().forEach(function (edge) {
        if (step[cur_step][1] === edge['id']) edge['color'] = '#2ecc71';
    })
}

function nextKruskal() {
    s.graph.edges().forEach(function (edge) {
        if (step[cur_step] === edge['id']) {
            edge['color'] = '#2ecc71';
            s.graph.nodes().forEach(function (vertex) {
                if (edge['source'] === vertex['id']) vertex['color'] = '#e74c3c';
                if (edge['target'] === vertex['id']) vertex['color'] = '#e74c3c';
            })
        }
    })
}

function nextDijsktra() {
    if (cur_step === 0) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[0][0] === vertex['label']) vertex['color'] = '#e74c3c';
        })
    } else {
        s.graph.edges().forEach(function (edge) {
            if (step[cur_step][0] === edge['id']) {
                edge['color'] = '#2ecc71';
                s.graph.nodes().forEach(function (vertex) {
                    if (edge['source'] === vertex['id']) vertex['color'] = '#e74c3c';
                    if (edge['target'] === vertex['id']) vertex['color'] = '#e74c3c';
                })
            }
        })
    }
    for (let i = 1; i < step[cur_step].length; i = i + 2) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][i] === vertex['id']) {
                if (cur_step === 0) vertex['label'] = labelWithValue(vertex['label'], step[cur_step][i + 1]);
                else vertex['label'] = updateValue(vertex['label'], step[cur_step][i + 1]);
            }
        })
    }
}

function nextBellmanFord() {
    s.graph.edges().forEach(function (edge) {
        edge['color'] = '#000000';
    })
    s.graph.nodes().forEach(function (vertex) {
        vertex['color'] = '#0652DD';
    })
    if (cur_step === 0) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][0] === vertex['label']) vertex['color'] = '#fdd023';
        })
    } else {
        s.graph.edges().forEach(function (edge) {
            if (step[cur_step][0] === edge['id']) {
                edge['color'] = '#2ecc71';
            }
        })
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][1] === vertex['id']) vertex['color'] = '#e74c3c';
            if (step[cur_step][2] === vertex['id']) vertex['color'] = '#fdd023';
        })
    }
    for (let i = (cur_step === 0 ? 1 : 3); i < step[cur_step].length; i = i + 2) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][i] === vertex['id']) {
                if (cur_step === 0) vertex['label'] = labelWithValue(vertex['label'], step[cur_step][i + 1]);
                else vertex['label'] = updateValue(vertex['label'], step[cur_step][i + 1]);
            }
        })
    }
}

nextButton.onclick = function () {
    cur_step = cur_step + 1;
    if (document.getElementById('selectedAlgorithm').value === 'BFS' ||
        document.getElementById('selectedAlgorithm').value === 'DFS') nextGraphSearch();
    if (document.getElementById('selectedAlgorithm').value === 'prim') nextPrim();
    if (document.getElementById('selectedAlgorithm').value === 'kruskal') nextKruskal();
    if (document.getElementById('selectedAlgorithm').value === 'dijsktra') nextDijsktra();
    if (document.getElementById('selectedAlgorithm').value === 'bellman-ford') nextBellmanFord();

    prevButton.disabled = false;
    if (cur_step === step.length - 1) nextButton.disabled = 'hidden';
    s.refresh();
}

function prevGraphSearch() {
    cur_step = cur_step - 1;
    s.graph.nodes().forEach(function (vertex) {
        if (vertex['color'] !== '#e74c3c') vertex['color'] = '#0652DD';
        if (step[cur_step][0] === vertex['label']) vertex['color'] = '#2ecc71';
        for (let i = 1; i < step[cur_step].length; ++i) {
            if (step[cur_step][i] === vertex['label'] && vertex['color'] !== '#e74c3c' && vertex['color'] !== '#2ecc71')
                vertex['color'] = '#fdd023';
        }
    })
}

function prevPrim() {
    s.graph.nodes().forEach(function (vertex) {
        if (step[cur_step][0] === vertex['label']) vertex['color'] = '#0652DD';
    })
    s.graph.edges().forEach(function (edge) {
        if (step[cur_step][1] === edge['id']) edge['color'] = '#000000';
    })
    cur_step = cur_step - 1;
}

function prevKruskal() {
    s.graph.edges().forEach(function (edge) {
        if (step[cur_step] === edge['id']) {
            edge['color'] = '#000000';
        }
    })
    s.graph.nodes().forEach(function (vertex) {
        let check = 0;
        s.graph.edges().forEach(function (edge) {
            if (edge['source'] === vertex['id'] || edge['target'] === vertex['id']) {
                if (edge['color'] === '#2ecc71') check = 1;
            }
        })
        if (check === 0) vertex['color'] = '#0652DD';
    })
    cur_step = cur_step - 1;
}

function prevDijsktra() {
    if (cur_step === 1) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[0][0] === vertex['label']) vertex['color'] = '#e74c3c';
            else vertex['color'] = '#0652DD';
        })
        s.graph.edges().forEach(function (edge) {
            edge['color'] = '#000000';
        })
    } else {
        s.graph.edges().forEach(function (edge) {
            if (step[cur_step][0] === edge['id']) {
                edge['color'] = '#000000';
            }
        })

        s.graph.nodes().forEach(function (vertex) {
            vertex['color'] = '#0652DD';
            s.graph.edges().forEach(function (edge) {
                if (edge['color'] === '#2ecc71') {
                    if (edge['source'] === vertex['id']) vertex['color'] = '#e74c3c';
                    if (edge['target'] === vertex['id']) vertex['color'] = '#e74c3c';
                }
            })
        })
    }
    cur_step = cur_step - 1;
    for (let i = 1; i < step[cur_step].length; i = i + 2) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][i] === vertex['id']) {
                vertex['label'] = updateValue(vertex['label'], step[cur_step][i + 1]);
            }
        })
    }
}

function prevBellmanFord() {
    s.graph.edges().forEach(function (edge) {
        edge['color'] = '#000000';
    })
    s.graph.nodes().forEach(function (vertex) {
        vertex['color'] = '#0652DD';
    })
    --cur_step;
    if (cur_step === 0) {
        console.log('Hi');
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][0] === nameOnly(vertex['label'])) vertex['color'] = '#fdd023';
        })
    } else {
        s.graph.edges().forEach(function (edge) {
            if (step[cur_step][0] === edge['id']) {
                edge['color'] = '#2ecc71';
            }
        })
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][1] === vertex['id']) vertex['color'] = '#e74c3c';
            if (step[cur_step][2] === vertex['id']) vertex['color'] = '#fdd023';
        })
    }

    for (let i = (cur_step === 0) ? 1 : 3; i < step[cur_step].length; i = i + 2) {
        s.graph.nodes().forEach(function (vertex) {
            if (step[cur_step][i] === vertex['id']) {
                vertex['label'] = updateValue(vertex['label'], step[cur_step][i + 1]);
            }
        })
    }
}

prevButton.onclick = function () {
    if (document.getElementById('selectedAlgorithm').value === 'BFS' ||
        document.getElementById('selectedAlgorithm').value === 'DFS') prevGraphSearch();
    if (document.getElementById('selectedAlgorithm').value === 'prim') prevPrim();
    if (document.getElementById('selectedAlgorithm').value === 'kruskal') prevKruskal();
    if (document.getElementById('selectedAlgorithm').value === 'dijsktra') prevDijsktra();
    if (document.getElementById('selectedAlgorithm').value === 'bellman-ford') prevBellmanFord();

    nextButton.disabled = false;
    if (cur_step === 0) prevButton.disabled = true;
    s.refresh();
}

let introductionButton = document.getElementById('introduction');
let instructionButton = document.getElementById('instruction');
let explainButton = document.getElementById('explain');

introductionButton.style.backgroundColor = 'rgb(13, 24, 37)';

$(introductionButton).hover(
    function () {
        if (introductionButton.style.backgroundColor.toString() !== 'rgb(13, 24, 37)')
            introductionButton.style.backgroundColor = 'rgb(23, 36, 50)';
    },
    function () {
        if (introductionButton.style.backgroundColor.toString() === 'rgb(23, 36, 50)')
            introductionButton.style.backgroundColor = 'rgb(32, 46, 62)';
    });

$(instructionButton).hover(
    function () {
        if (instructionButton.style.backgroundColor.toString() !== 'rgb(13, 24, 37)')
            instructionButton.style.backgroundColor = 'rgb(23, 36, 50)';
    },
    function () {
        if (instructionButton.style.backgroundColor.toString() === 'rgb(23, 36, 50)')
            instructionButton.style.backgroundColor = 'rgb(32, 46, 62)';
    });

$(explainButton).hover(
    function () {
        if (explainButton.style.backgroundColor.toString() !== 'rgb(13, 24, 37)')
            explainButton.style.backgroundColor = 'rgb(23, 36, 50)';
    },
    function () {
        if (explainButton.style.backgroundColor.toString() === 'rgb(23, 36, 50)')
            explainButton.style.backgroundColor = 'rgb(32, 46, 62)';
    });

let introductionContent = document.getElementById('introductionContent');
let instructionContent = document.getElementById('instructionContent');
let explainContent = document.getElementById('explainContent');

function contentShow(content) {
    content.style.display = 'initial';
    content.style.overflow = 'auto';
    content.style.paddingRight = '15px';
    content.style.height = '300px';
}

introductionButton.onclick = function () {
    contentShow(introductionContent);
    instructionContent.style.display = 'none';
    explainContent.style.display = 'none';
    introductionButton.style.backgroundColor = 'rgb(13, 24, 37)';
    instructionButton.style.backgroundColor = 'rgb(32, 46, 62)';
    explainButton.style.backgroundColor = 'rgb(32, 46, 62)';
}

instructionButton.onclick = function () {
    introductionContent.style.display = 'none';
    contentShow(instructionContent);
    explainContent.style.display = 'none';
    introductionButton.style.backgroundColor = 'rgb(32, 46, 62)';
    instructionButton.style.backgroundColor = 'rgb(13, 24, 37)';
    explainButton.style.backgroundColor = 'rgb(32, 46, 62)';
}

explainButton.onclick = function () {
    introductionContent.style.display = 'none';
    instructionContent.style.display = 'none';
    contentShow(explainContent);
    introductionButton.style.backgroundColor = 'rgb(32, 46, 62)';
    instructionButton.style.backgroundColor = 'rgb(32, 46, 62)';
    explainButton.style.backgroundColor = 'rgb(13, 24, 37)';
}

document.getElementById('savePNG').onclick = function () {
    let getPNG = s.renderers[0].snapshot();
    s.renderers[0].snapshot({download: true});
}

document.getElementById('saveJPG').onclick = function () {
    let getJPG = s.renderers[0].snapshot();
    s.renderers[0].snapshot({
        format: 'jpg',
        background: 'white',
        download: true
    });
}