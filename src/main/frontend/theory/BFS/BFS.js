let pseudoCode = CodeMirror.fromTextArea(document.getElementById('pseudoCode'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true
});
pseudoCode.setSize(null, 240);
pseudoCode.setValue('int BFS(G: (V, E), source: int, destination: int):\n' +
    '    d = int[|V|]\n' +
    '    fill(d, ∞)' +
    '    d[source] = 0\n' +
    '    Q = ∅\n' +
    '    Q.push(source)\n' +
    '    while Q ≠ ∅\n' +
    '        u = Q.pop()\n' +
    '        for v: (u, v) in E\n' +
    '            if d[v] == ∞\n' +
    '                d[v] = d[u] + 1\n' +
    '                Q.push(v)\n' +
    '    return d[destination]');