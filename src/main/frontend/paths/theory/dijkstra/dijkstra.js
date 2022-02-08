let pseudoCode = CodeMirror.fromTextArea(document.getElementById('pseudoCode'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true,
});
pseudoCode.setSize(null, 320);
pseudoCode.setValue(
    'func dijkstra(s):\n' +
    '    for v in V\n' +
    '       d[v] = ∞\n' +
    '       used[v] = false\n' +
    '    d[s] = 0\n' +
    '    for i in V\n' +
    '        v = null\n' +
    '        for j in V                              // найдём вершину с минимальным расстоянием\n' +
    '            if !used[j] and (v == null or d[j] < d[v])\n' +
    '                v = j\n' +
    '        if d[v] == ∞\n' +
    '            break\n' +
    '        used[v] = true\n' +
    '        for e : исходящие из v рёбра            // произведём релаксацию по всем рёбрам, исходящим из v\n' +
    '            if d[v] + e.len < d[e.to]\n' +
    '                d[e.to] = d[v] + e.len');