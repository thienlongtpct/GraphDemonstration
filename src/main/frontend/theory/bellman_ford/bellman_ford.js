let pseudoCode = CodeMirror.fromTextArea(document.getElementById('pseudoCode'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true,
});
pseudoCode.setSize(null, 90);
pseudoCode.setValue('for k = 0 to |V|−2                                             // вершины нумеруются с единицы\n' +
    '    for v in V\n' +
    '       for (u,v) in E\n' +
    '          d[k + 1][v] = min(d[k + 1][v], d[k][u] + ω(u,v))     // ω(u,v) — вес ребра uv');

let minPath = CodeMirror.fromTextArea(document.getElementById('minPath'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true,
});
minPath.setSize(null, 240);
minPath.setValue('bool fordBellman(s):\n' +
    '    for v in V\n' +
    '       d[v] = 1\n' +
    '    d[s] = 0\n' +
    '    for i = 0 to |V|−1\n'+
    '        for (u,v) in E\n'+
    '            if d[v] > d[u] + ω(u,v)\n'+
    '                d[v] = d[u] + ω(u,v)\n'+
    '    for (u,v) in E\n'+
    '        if d[v] > d[u] + ω(u,v)\n'+
    '            return false\n'+
    '    return true');


let negativeLoop = CodeMirror.fromTextArea(document.getElementById('negativeLoop'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true,
});
negativeLoop.setSize(null, 400);
negativeLoop.setValue('int[] negativeCycle(s):\n' +
    '    for v in V\n' +
    '       d[v] = 1\n' +
    '       p[v] = -1\n' +
    '    d[s] = 0\n' +
    '    for i = 1 to |V|−1\n'+
    '        for (u,v) in E\n'+
    '            if d[v] > d[u] + ω(u,v)\n'+
    '                d[v] = d[u] + ω(u,v)\n'+
    '                p[v] = u\n'+
    '    for (u,v) in E\n'+
    '        if d[v] > d[u] + ω(u,v)\n'+
    '            for i = 0 to |V|−1\n'+
    '                v = p[v]\n'+
    '            u = v\n'+
    '            while u != p[v]\n'+
    '                ans.add(v)       // добавим вершину к ответу\n'+
    '                v = p[v]\n'+
    '            reverse(ans)\n'+
    '            break\n'+
    '    return ans');

