let pseudoCode = CodeMirror.fromTextArea(document.getElementById('pseudoCode'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true,
});
pseudoCode.setSize(null, 265);
pseudoCode.setValue('function primFindMST():\n' +
    '    for v in V(G)\n' +
    '        key[v] = ∞\n' +
    '        p[v] = null\n' +
    '    r = произвольная вершина графа G\n' +
    '    Q.push(V(G))\n' +
    '    while not Q.isEmpty()\n' +
    '        v = Q.extractMin()\n' +
    '        for vu in E(G)\n' +
    '            if u in Q and key[u] > w(v, u)\n' +
    '                p[u] = v\n' +
    '                key[u] = w(u, v)\n' +
    '                Q.decreaseKey(u, key[u])');

