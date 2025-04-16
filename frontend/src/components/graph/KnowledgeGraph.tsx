import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Node, Link, GraphData } from '../../types';

// 模拟数据
const sampleData: GraphData = {
  nodes: [
    { id: "1", name: "操作系统", group: 1 },
    { id: "2", name: "进程管理", group: 2 },
    { id: "3", name: "内存管理", group: 3 },
    { id: "4", name: "文件系统", group: 4 },
    { id: "5", name: "设备管理", group: 5 },
    { id: "6", name: "进程", group: 2 },
    { id: "7", name: "线程", group: 2 },
    { id: "8", name: "调度算法", group: 2 },
    { id: "9", name: "虚拟内存", group: 3 },
    { id: "10", name: "分页", group: 3 },
    { id: "11", name: "分段", group: 3 },
    { id: "12", name: "文件结构", group: 4 },
    { id: "13", name: "目录结构", group: 4 },
    { id: "14", name: "I/O设备", group: 5 },
    { id: "15", name: "缓冲区管理", group: 5 }
  ],
  links: [
    { source: "1", target: "2", value: 1, relationship: "包含" },
    { source: "1", target: "3", value: 1, relationship: "包含" },
    { source: "1", target: "4", value: 1, relationship: "包含" },
    { source: "1", target: "5", value: 1, relationship: "包含" },
    { source: "2", target: "6", value: 1, relationship: "管理" },
    { source: "2", target: "7", value: 1, relationship: "管理" },
    { source: "2", target: "8", value: 1, relationship: "使用" },
    { source: "3", target: "9", value: 1, relationship: "实现" },
    { source: "3", target: "10", value: 1, relationship: "实现" },
    { source: "3", target: "11", value: 1, relationship: "实现" },
    { source: "4", target: "12", value: 1, relationship: "包含" },
    { source: "4", target: "13", value: 1, relationship: "包含" },
    { source: "5", target: "14", value: 1, relationship: "控制" },
    { source: "5", target: "15", value: 1, relationship: "包含" }
  ]
};

interface KnowledgeGraphProps {
  onNodeSelect: (node: Node) => void;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onNodeSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // 清除之前的图
    svg.selectAll("*").remove();
    
    // 创建力导向图
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60));
    
    // 定义节点颜色
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    // 创建连线
    const link = svg.append("g")
      .selectAll("line")
      .data(sampleData.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));
    
    // 创建连线文本标签
    const linkText = svg.append("g")
      .selectAll("text")
      .data(sampleData.links)
      .enter()
      .append("text")
      .text((d) => d.relationship)
      .attr("font-size", 10)
      .attr("fill", "#666")
      .attr("text-anchor", "middle");
    
    // 创建节点组
    const node = svg.append("g")
      .selectAll("g")
      .data(sampleData.nodes)
      .enter()
      .append("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        onNodeSelect(d);
      });
    
    // 添加节点圆形
    node.append("circle")
      .attr("r", 20)
      .attr("fill", (d) => color(d.group.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
    
    // 添加节点文本
    node.append("text")
      .attr("dx", 0)
      .attr("dy", 30)
      .attr("text-anchor", "middle")
      .text((d) => d.name)
      .attr("font-size", 10)
      .attr("fill", "#333");
    
    // 启动模拟
    simulation
      .nodes(sampleData.nodes)
      .on("tick", ticked);
    
    simulation.force<d3.ForceLink<Node, Link>>("link")!
      .links(sampleData.links);
    
    // 实时更新位置
    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      
      linkText
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);
      
      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    }
    
    // 拖拽函数
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // 调整图形缩放
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        svg.selectAll("g").attr("transform", event.transform.toString());
      });
    
    svg.call(zoom);
    
  }, [onNodeSelect]);
  
  return (
    <div className="w-full h-full overflow-hidden bg-background rounded-lg border border-gray-200">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default KnowledgeGraph; 