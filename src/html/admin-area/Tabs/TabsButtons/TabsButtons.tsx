import { TabsProps } from "../../types"
import { MdDashboard } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { FaRegNewspaper } from "react-icons/fa"
import { SiDiscord } from "react-icons/si"

const TabsButtons = ({ activeTab, onTabClick }: TabsProps) => (
    <div className="sidebar-tabs">
        <button
            className={`sidebar-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabClick('dashboard')}
        >
            <MdDashboard />
            Dashboard 
        </button>
        <button
            className={`sidebar-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => onTabClick('users')}
        >
            <FiUsers />
            Users
        </button>
        <button
            className={`sidebar-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => onTabClick('posts')}
        >
            <FaRegNewspaper />
            Posts
        </button>
        <button
            className={`sidebar-tab ${activeTab === 'discord-info' ? 'active' : ''}`}
            onClick={() => onTabClick('discord-info')}
        >
            <SiDiscord />
            Discord Info
        </button>
    </div>
)

export default TabsButtons
