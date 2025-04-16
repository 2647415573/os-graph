import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 实际应用中可能需要清除登录状态等操作
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-lg h-full w-64 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-primary">系统导航</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          <li>
            <button 
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                activePage === 'knowledgeGraph' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActivePage('knowledgeGraph')}
            >
              <FontAwesomeIcon icon={faProjectDiagram} className="w-5 h-5 mr-3" />
              <span className="font-medium">知识图谱</span>
            </button>
          </li>
          
          <li>
            <button 
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                activePage === 'search' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActivePage('search')}
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5 mr-3" />
              <span className="font-medium">知识查询</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          className="flex items-center w-full px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-3" />
          <span className="font-medium">退出系统</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 