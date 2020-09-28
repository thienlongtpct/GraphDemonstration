package com.javadevjournal.demoproject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@SpringBootApplication
@RestController
@CrossOrigin
public class MainProcessing {
    public static void main(String[] args) {
        SpringApplication.run(MainProcessing.class, args);
    }
    //Define new class
    static class Vertex {
        String id;
        String label;
        String color;
        Double x;
        Double y;
        Integer size;
        public HashMap<String, Object> toHashMap() {
            HashMap<String, Object> nodeToHashmap = new HashMap<>();
            nodeToHashmap.put("id", id);
            nodeToHashmap.put("label", label);
            nodeToHashmap.put("color", color);
            nodeToHashmap.put("x", x);
            nodeToHashmap.put("y", y);
            nodeToHashmap.put("size", size);
            return nodeToHashmap;
        }
    }

    static class Edge {
        String id;
        String source;
        String target;
        String label;
        String type;
        String color;
        Integer count;
        Integer size;
        Integer weight;
        public HashMap<String, Object> toHashMap() {
            HashMap<String, Object> edgeToHashmap = new HashMap<>();
            edgeToHashmap.put("id", id);
            edgeToHashmap.put("source", source);
            edgeToHashmap.put("target", target);
            edgeToHashmap.put("label", label);
            edgeToHashmap.put("type", type);
            edgeToHashmap.put("color", color);
            edgeToHashmap.put("count", count);
            edgeToHashmap.put("size", size);
            return edgeToHashmap;
        }
    }

    //Processing
    List <Edge> allEdge = new ArrayList<>();
    List <Vertex> allNode = new ArrayList<>();

    Map <String, List <Edge>> adjacencyList = new HashMap<>();
    Map <String, Integer> label_index = new HashMap<>();
    Map <String, String> id_label = new HashMap<>();

    public void addEdge(String source, Edge edge) {
        List <Edge> listEdge = new ArrayList<>();
        if (adjacencyList.get(source) != null) listEdge = adjacencyList.get(source);

        listEdge.add(edge);
        if (!id_label.get(edge.source).equals(source)) {
            String tmp = edge.source;
            edge.source = edge.target;
            edge.target = tmp;
        }
        allEdge.add(edge);
        adjacencyList.put(source, listEdge);
    }

    public HashMap<String, Object> getGraph(String[] edgeList, int directed) {
        allEdge.clear();
        allNode.clear();

        id_label.clear();
        label_index.clear();

        adjacencyList.clear();
        HashMap<String, Object> response = new HashMap<>();

        HashMap<String, ArrayList<HashMap<String, Object>>> graph = new HashMap<>();
        List<Integer> invalidLines = new ArrayList<>();
        int invalidWeight = 0, negativeWeight = 0;
        int n = 0;

        Set<String> nodes_set = new HashSet<>();
        ArrayList<HashMap<String, Object>> nodes = new ArrayList<>();
        ArrayList<HashMap<String, Object>> edges = new ArrayList<>();

        for (String s : edgeList) {
            String[] item = s.trim().split("\\s+");
            for (int j = 0; j < Math.min(2, item.length); ++j) {
                if (item[j].length() == 0) continue;
                if (!nodes_set.contains(item[j])) {
                    nodes_set.add(item[j]);
                    label_index.put(item[j], ++n);
                }
            }
        }

        for (String str : nodes_set) {
            Vertex vertex = new Vertex();
            vertex.id = "v" + (label_index.get(str));
            vertex.label = str;
            vertex.x = Math.random();
            vertex.y = Math.random();
            vertex.size = 2;
            vertex.color = "#0652DD";
            id_label.put(vertex.id, vertex.label);
            nodes.add(vertex.toHashMap());
            allNode.add(vertex);
        }

        int m = 0;
        Map <List<String>, Integer> setEdge = new HashMap<>();
        for (int i = 0; i < edgeList.length; ++i) {
            String[] item = edgeList[i].trim().split("\\s+");
            if (item.length < 2) continue;
            if (item.length > 3) invalidLines.add(i+1);
            Edge edge = new Edge();
            edge.id = "e" + (++m);
            edge.source = "v" + label_index.get(item[0]);
            edge.target = "v" + label_index.get(item[1]);
            if (item.length >= 3) {
                edge.label = item[2];
                try {
                    edge.weight = Integer.parseInt(item[2]);
                    if (edge.weight < 0) negativeWeight = 1;
                }
                catch(NumberFormatException e) {
                    edge.weight = 0;
                    invalidWeight = 1;
                }
            }
            else edge.weight = 0;

            List<String> currentEdge = new ArrayList<>();
            if (directed == 0 && item[0].compareTo(item[1]) > 0) {
                currentEdge.add(item[1]);
                currentEdge.add(item[0]);
            }
            else {
                currentEdge.add(item[0]);
                currentEdge.add(item[1]);
            }

            if (directed == 0) {
                if (setEdge.get(currentEdge) == null) {
                    edge.type = "line";
                    setEdge.put(currentEdge, 0);
                }
                else {
                    edge.type = "curve";
                    edge.count = setEdge.get(currentEdge)+15;
                    setEdge.put(currentEdge, setEdge.get(currentEdge)+15);
                }
            }
            else {
                if (setEdge.get(currentEdge) == null) {
                    edge.type = "arrow";
                    setEdge.put(currentEdge, 0);
                }
                else {
                    edge.type = "curvedArrow";
                    edge.count = setEdge.get(currentEdge)+15;
                    setEdge.put(currentEdge, setEdge.get(currentEdge)+15);
                }
            }
            edge.size = 3;
            edge.color = "#000000";

            addEdge(item[0], edge);
            if (directed == 0) addEdge(item[1], edge);
            edges.add(edge.toHashMap());
        }

        graph.put("nodes", nodes);
        graph.put("edges", edges);

        response.put("n", n);
        response.put("graph", graph);
        response.put("invalidWeight", invalidWeight);
        response.put("invalidLines", invalidLines);
        response.put("negativeWeight", negativeWeight);
        response.put("hi", setEdge);

        return response;
    }

    @GetMapping("/buildGraph")
    public HashMap<String, Object> buildGraph(@RequestParam(value = "edgeList") String[] edgeList,
                                              @RequestParam(value = "directed") int directed) {
        return getGraph(edgeList, directed);
    }

    @GetMapping("/bfs")
    public List<List<String>> bfs(@RequestParam(value = "source") String source,
                                          @RequestParam(value = "edgeList") String[] edgeList,
                                          @RequestParam(value = "directed") int directed) {
        getGraph(edgeList, directed);
        List<List<String>> response = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        List<String> q = new ArrayList<>();

        q.add(source);
        visited.add(source);

        List<String> inQueue = new ArrayList<>();
        while (q.size() > 0) {
            String u = q.get(0);
            q.remove(0);
            if (adjacencyList.get(u) != null) {
                for (Edge edge : adjacencyList.get(u)) {
                    String v = (u.equals(id_label.get(edge.target)) ? id_label.get(edge.source) : id_label.get(edge.target));
                    if (!visited.contains(v)) {
                        visited.add(v);
                        inQueue.add(v);
                        q.add(v);
                    }
                }
            }
            List<String> currentQueue = new ArrayList<>(inQueue);
            currentQueue.add(0, u);
            response.add(currentQueue);
        }
        return response;
    }

    List<List<String>> responseDFS = new ArrayList<>();
    Set<String> visited = new HashSet<>();
    List<String> inStack = new ArrayList<>();

    public void recursiveDFS(String u) {
        visited.add(u);
        inStack.add(0, u);
        List<String> currentStack = new ArrayList<>(inStack);
        if (adjacencyList.get(u) != null) {
            for (Edge edge: adjacencyList.get(u)) {
                String v = (u.equals(id_label.get(edge.target)) ? id_label.get(edge.source) : id_label.get(edge.target));
                if (!visited.contains(v)) {
                    recursiveDFS(v);
                }
            }
        }
        inStack.remove(0);
        responseDFS.add(currentStack);
    }

    @GetMapping("/dfs")
    public List<List<String>> dfs(@RequestParam(value = "source") String source,
                                  @RequestParam(value = "edgeList") String[] edgeList,
                                  @RequestParam(value = "directed") int directed) {
        getGraph(edgeList, directed);
        visited.clear();
        responseDFS.clear();
        inStack.clear();
        recursiveDFS(source);
        Collections.reverse(responseDFS);
        return responseDFS;
    }

    @GetMapping("/prim")
    public List<List<String>> prim(@RequestParam(value = "source") String source,
                                  @RequestParam(value = "edgeList") String[] edgeList,
                                  @RequestParam(value = "directed") int directed) {
        getGraph(edgeList, directed);
        List <List<String>> response = new ArrayList<>();

        Set <String> visited = new HashSet<>();
        visited.add(source);

        List<String> init = new ArrayList<>();
        init.add(source); init.add("");

        response.add(init);
        boolean stop = false;

        while (!stop) {
            String bestNode = "";
            Edge minEdge = new Edge();
            minEdge.weight = Integer.MAX_VALUE;
            for (String vertex: visited) {
                if (adjacencyList.get(vertex) == null) continue;
                for (Edge edge: adjacencyList.get(vertex)) {
                    if (visited.contains(id_label.get(edge.target)) &&
                            visited.contains(id_label.get(edge.source))) continue;
                    String newNode = vertex.equals(id_label.get(edge.target)) ? id_label.get(edge.source): id_label.get(edge.target);
                    if (minEdge.weight > edge.weight) {
                        minEdge = edge;
                        bestNode = newNode;
                    }
                }
            }
            if (bestNode.equals("")) stop = true;
            else {
                List <String> pairAnswer = new ArrayList<>();
                pairAnswer.add(bestNode);
                pairAnswer.add(minEdge.id);
                visited.add(bestNode);
                response.add(pairAnswer);
            }
        }

        return response;
    }

    @GetMapping("/kruskal")
    public List<String> kruskal(@RequestParam(value = "edgeList") String[] edgeList,
                                @RequestParam(value = "directed") int directed) {
        getGraph(edgeList, directed);
        List <String> response = new ArrayList<>();

        Comparator<Edge> cmpEdge = Comparator.comparingInt(e -> e.weight);
        Collections.sort(allEdge, cmpEdge);

        class UFDS {
            Map <String, String> set = new HashMap<>();

            UFDS(List <Vertex> allNode) {
                for (Vertex vertex: allNode)
                    set.put(vertex.id, vertex.id);
            }

            public String findSet(String u) {
                return set.get(u).equals(u) ? u : findSet(set.get(u));
            }

            public boolean isSameSet(String u, String v) {
                set.put(u, findSet(u));
                set.put(v, findSet(v));
                return set.get(u).equals(set.get(v));
            }

            public void unionSet(String u, String v) {
                set.put(u, findSet(u));
                set.put(v, findSet(v));
                set.put(findSet(u), findSet(v));
            }
        }
        UFDS components = new UFDS(allNode);

        for (Edge edge: allEdge) {
            if (!components.isSameSet(edge.source, edge.target)) {
                components.unionSet(edge.source, edge.target);
                response.add(edge.id);
            }
        }
        return response;
    }

    @GetMapping("/dijsktra")
    public List<List<String>> dijkstra(@RequestParam(value = "source") String source,
                                 @RequestParam(value = "edgeList") String[] edgeList,
                                 @RequestParam(value = "directed") int directed) {

        getGraph(edgeList, directed);
        List<List<String>> answer = new ArrayList<>();

        Map<String, Integer> distance = new HashMap<>();
        Map<String, Edge> trace = new HashMap<>();

        for (Vertex vertex: allNode) distance.put(vertex.label, Integer.MAX_VALUE);
        distance.put(source, 0);
        trace.put(source, null);

        while (!distance.isEmpty()) {
            Map.Entry<String, Integer> bestNode = Collections.min(distance.entrySet(), Comparator.comparing(Map.Entry::getValue));
            if (bestNode.getValue() == Integer.MAX_VALUE) break;

            String current_vertex = bestNode.getKey();
            List<String> vertex_value = new ArrayList<>();

            if (trace.get(current_vertex) == null) vertex_value.add(current_vertex);
            else vertex_value.add(trace.get(current_vertex).id);

            for (Vertex vertex: allNode) {
                if (distance.get(vertex.label) == null) continue;
                vertex_value.add(vertex.id);
                vertex_value.add(distance.get(vertex.label) == Integer.MAX_VALUE ? "oo" : distance.get(vertex.label).toString());
            }

            answer.add(vertex_value);
            distance.remove(bestNode.getKey());

            if (adjacencyList.get(bestNode.getKey()) == null) continue;
            for (Edge edge: adjacencyList.get(bestNode.getKey())) {
                String newNode = bestNode.getKey().equals(id_label.get(edge.target)) ? id_label.get(edge.source): id_label.get(edge.target);
                if (distance.get(newNode) == null) continue;
                if (distance.get(newNode)-edge.weight > bestNode.getValue()) {
                    trace.put(newNode, edge);
                    distance.put(newNode, bestNode.getValue()+edge.weight);
                }
            }
        }
        return answer;
    }

    @GetMapping("/bellmanford")
    public List<List<String>> bellmanford(@RequestParam(value = "source") String source,
                                 @RequestParam(value = "edgeList") String[] edgeList,
                                 @RequestParam(value = "directed") int directed) {

        getGraph(edgeList, directed);
        List<List<String>> answer = new ArrayList<>();

        Map<String, Integer> distance = new HashMap<>();

        for (Vertex vertex: allNode) distance.put(vertex.label, Integer.MAX_VALUE);
        distance.put(source, 0);

        List<String> init = new ArrayList<>();
        init.add(source);
        for (Vertex vertex: allNode) {
            init.add(vertex.id);
            init.add(distance.get(vertex.label) == Integer.MAX_VALUE ? "oo" : distance.get(vertex.label).toString());
        }
        answer.add(init);

        for (int i = 0; i < allNode.size()-1; ++i) {
            for (Edge edge: allEdge) {
                if (distance.get(id_label.get(edge.source)) == Integer.MAX_VALUE) continue;
                if (distance.get(id_label.get(edge.target)) > distance.get(id_label.get(edge.source))+edge.weight) {
                    distance.put(id_label.get(edge.target), distance.get(id_label.get(edge.source))+edge.weight);
                    List<String> updated = new ArrayList<>();
                    updated.add(edge.id);
                    updated.add(edge.source);
                    updated.add(edge.target);
                    for (Vertex vertex: allNode) {
                        updated.add(vertex.id);
                        updated.add(distance.get(vertex.label) == Integer.MAX_VALUE ? "oo" : distance.get(vertex.label).toString());
                    }
                    answer.add(updated);
                }
            }
        }

        return answer;
    }
}
