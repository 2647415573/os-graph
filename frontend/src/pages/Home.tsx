import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import SearchBar from '../components/search/SearchBar';
import KnowledgeGraph from '../components/graph/KnowledgeGraph';
import NodeDetail from '../components/graph/NodeDetail';
import { Node } from '../types';

const Home: React.FC = () => {
  const [activePage, setActivePage] = useState('knowledgeGraph');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const handleSearch = (query: string) => {
    console.log('搜索节点:', query);
    // 实际应用中应该根据搜索结果更新选中的节点或高亮图谱中的节点
  };
  
  const handleNodeSelect = (node: Node) => {
    console.log('选中节点:', node);
    setSelectedNode(node);
  };
  
  return (
    <div className="flex h-screen bg-background-light">
      {/* 侧边栏 */}
      <div className="flex-shrink-0">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>
      
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部标题栏 */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-800">《操作系统》课程知识图谱系统</h1>
              <div className="w-1/2">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </header>
        
        {/* 内容区域 */}
        <main className="flex-1 overflow-hidden flex p-4">
          {/* 左侧主区域 - 知识图谱 */}
          <div className="flex-1 mr-4">
            <div className="h-full">
              <KnowledgeGraph onNodeSelect={handleNodeSelect} />
            </div>
          </div>
          
          {/* 右侧边栏 - 节点详情 */}
          <div className="w-96 flex-shrink-0">
            <NodeDetail node={selectedNode} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home; 