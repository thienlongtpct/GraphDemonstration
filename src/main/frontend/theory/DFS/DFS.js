let dfsGraph = CodeMirror.fromTextArea(document.getElementById('dfsGraph'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true
});
dfsGraph.setSize(null, 240);
dfsGraph.setValue('function doDfs(G[n]: Graph): // функция принимает граф G с количеством вершин n и выполняет обход в глубину\n' +
    '   visited = array[n, false] // создаём массив посещённых вершины длины n, заполненный false изначально\n' +
    '          \n' +
    '   function dfs(u: int):   \n' +
    '      visited[u] = true\n' +
    '      for v: (u, v) in G        \n' +
    '         if not visited[v]               \n' +
    '            dfs(v)\n' +
    '\n' +
    '   for i = 1 to n             \n' +
    '      if not visited[i]                    \n' +
    '         dfs(i)');

let colorGraph = CodeMirror.fromTextArea(document.getElementById('colorGraph'), {
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleActiveSelected: true,
    readOnly: true
});
colorGraph.setSize(null, 275);
colorGraph.setValue('function doDfs(G[n]: Graph): // функция принимает граф G с количеством вершин n и выполняет обход в глубину\n' +
    '   color = array[n, white]\n' +
    '                   \n' +
    '   function dfs(u: int):\n' +
    '      color[u] = gray           \n' +
    '      for v: (u, v) in G                   \n' +
    '         if color[v] == white\n' +
    '            dfs(v)\n' +
    '      color[u] = black   \n' +
    '                   \t   \n' +
    '   for i = 1 to n             \n' +
    '      if color[i] == white                \n' +
    '         dfs(i)');