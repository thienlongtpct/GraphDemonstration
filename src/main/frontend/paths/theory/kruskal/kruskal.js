let pseudoCode = CodeMirror.fromTextArea(document.getElementById('pseudoCode'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true
});
pseudoCode.setSize(null, 145);
pseudoCode.setValue('// G — исходный граф\n' +
    '// F — минимальный остов\n' +
    'function kruskalFindMST():\n' +
    '    F  <- V(G)\n' +
    '    for vu in E(G)\n' +
    '        if v и u в разных компонентах связности F\n' +
    '    return F');


