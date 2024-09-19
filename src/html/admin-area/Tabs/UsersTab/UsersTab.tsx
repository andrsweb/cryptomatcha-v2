import UserList from '../../UserList/UserList'
import Pagination from '../../../components/Pagination/Pagination'
import { UsersTabProps } from '../../types'

const UsersTab = ({
	users,
	loading,
	error,
	currentPage,
	totalPages,
	totalUsers,
	onPageChange
}: UsersTabProps) => (
	<div className='tab-content'>
		<UserList users={users} loading={loading} error={error} totalUsers={totalUsers} />
		<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
	</div>
)

export default UsersTab
