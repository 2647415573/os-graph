import React from 'react';

interface Node {
  id: string;
  name: string;
  group: number;
}

interface NodeDetailProps {
  node: Node | null;
}

// 模拟获取节点详情数据的函数
const getNodeDetails = (nodeId: string) => {
  // 这里应该是从API获取数据，现在使用模拟数据
  const details: Record<string, string[]> = {
    "1": ["操作系统是计算机系统的核心与基础软件", "负责管理与控制计算机系统中的硬件与软件资源"],
    "2": ["进程管理是操作系统的核心功能之一", "负责进程的创建、调度、终止以及进程间通信与同步"],
    "3": ["内存管理负责内存空间的分配与回收", "实现虚拟内存以扩展物理内存的使用空间"],
    "4": ["文件系统管理计算机中的文件存储", "提供文件的创建、存储、读取等操作接口"],
    "5": ["设备管理控制计算机外设", "提供设备的统一操作接口"],
    "6": ["进程是程序的一次执行过程", "是系统资源分配的基本单位"],
    "7": ["线程是CPU调度的基本单位", "是轻量级的进程，共享所属进程的资源"],
    "8": ["调度算法决定哪个进程获得处理器资源", "常见的有先来先服务、短作业优先、时间片轮转等"],
    "9": ["虚拟内存使得程序认为自己拥有连续的可用内存", "实际上部分程序被保存在外存中"],
    "10": ["分页是将内存空间划分为大小相等的块", "提高内存利用率"],
    "11": ["分段是根据程序的逻辑结构划分内存", "每段大小可以不同"],
    "12": ["文件结构包括文件的物理结构和逻辑结构", "影响文件系统的性能和功能"],
    "13": ["目录结构组织文件系统中的文件", "常见的有单级目录、两级目录、树形目录等"],
    "14": ["I/O设备与计算机交换数据", "包括输入设备和输出设备"],
    "15": ["缓冲区管理解决设备与处理器速度不匹配问题", "提高I/O操作的效率"]
  };
  
  return details[nodeId] || ["暂无详细信息"];
};

const NodeDetail: React.FC<NodeDetailProps> = ({ node }) => {
  if (!node) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-400 text-center">请选择一个节点查看详细信息</p>
      </div>
    );
  }
  
  const details = getNodeDetails(node.id);
  
  // 根据节点分组确定不同的显示颜色
  const groupColors = [
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-purple-100 border-purple-300",
    "bg-yellow-100 border-yellow-300",
    "bg-red-100 border-red-300",
    "bg-indigo-100 border-indigo-300"
  ];
  
  const colorClass = groupColors[(node.group - 1) % groupColors.length];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-y-auto">
      <div className={`mb-6 ${colorClass} rounded-lg p-4 border`}>
        <h2 className="text-xl font-bold mb-1 text-gray-800">{node.name}</h2>
        <p className="text-sm text-gray-500">ID: {node.id} | 分组: {node.group}</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">详细信息</h3>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex">
              <span className="mr-2 text-primary-dark font-bold">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 pb-2">相关概念</h3>
          <div className="flex flex-wrap gap-2">
            {["概念A", "概念B", "概念C"].map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetail; 