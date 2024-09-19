// Libs
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Styles
import './AdminDashboard.scss'
// Components
import TabsButtons from '../Tabs/TabsButtons/TabsButtons'
import DashboardTab from '../Tabs/DiscordTab/DashboardTab'
import UsersTab from '../Tabs/UsersTab/UsersTab'
import PostTab from '../Tabs/PostForm/PostsTab'
import DiscordTab from '../Tabs/DiscordTab/DiscordTab'
// Images
import logo from '../../../assets/svg/logos/header-logo.svg'
// Types
import { User } from '../types'

const USERS_PER_PAGE = 20

const AdminDashboard = () => {
	const [loginName, setLoginName] = useState<string>('')
	const [users, setUsers] = useState<User[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [totalUsers, setTotalUsers] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [activeTab, setActiveTab] = useState<string>('dashboard')

	useEffect(() => {
		const storedLogin = localStorage.getItem('adminName')
		if (storedLogin) {
			setLoginName(storedLogin)
		}
	}, [])

	useEffect(() => {
		if (activeTab === 'users') {
			fetchUsers()
		}
	}, [currentPage, activeTab])

	const fetchUsers = async () => {
		setLoading(true)
		setError(null)
		try {
			const response = await fetch(`https://ffb671a86d02.vps.myjino.ru/api/users?page=${currentPage}&limit=${USERS_PER_PAGE}`)
			if (!response.ok) {
				throw new Error('Failed to fetch users')
			}
			const data = await response.json()

			const sortedUsers = data.users.sort((a: User, b: User) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
			setUsers(sortedUsers)
			setTotalPages(data.totalPages)
			setTotalUsers(data.totalUsers)
		} catch (err) {
			setError((err as Error).message)
		} finally {
			setLoading(false)
		}
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleTabClick = (tab: string) => {
		setActiveTab(tab)
		setCurrentPage(1)
	}

	return (
		<div className="dashboard">
			<div className="dashboard-container">
				<aside className="sidebar">
					<Link className='sidebar-logo' to="/">
						<img src={logo} alt="Logo" />
					</Link>
					<TabsButtons activeTab={activeTab} onTabClick={handleTabClick} />
				</aside>
				<div className='dashboard-inner'>
					{activeTab === 'dashboard' && (
						<DashboardTab loginName={loginName} />
					)}
					{activeTab === 'users' && (
						<UsersTab
							users={users}
							loading={loading}
							error={error}
							totalUsers={totalUsers}
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
					{activeTab === 'posts' && (
						<PostTab />
					)}
					{activeTab === 'discord-info' && (
						<DiscordTab />
					)}
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
