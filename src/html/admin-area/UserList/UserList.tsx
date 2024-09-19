import { useState } from 'react'
import { UserListProps } from '../Types'
import './UserList.scss'
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const UserList = ({ users, loading, error, totalUsers }: UserListProps & { totalUsers: number }) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [sortBy, setSortBy] = useState<'name' | 'date'>('date')

    const sortedUsers = [...users].sort((a, b) => {
        if (sortBy === 'name') {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1
            if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1
            return 0
        } else {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        }
    })

    const handleSortByName = () => {
        setSortBy('name')
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const handleSortByDate = () => {
        setSortBy('date')
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    return (
        <div className="users-list-wrapper">
			<div className="tab-content-heading">
				<h4>Users List</h4>
				<span>Total users: {totalUsers}</span>
			</div>
            <div className="users-items-titles">
                <div className="user-item-title" onClick={handleSortByName}>
                    <span>
                        Name {sortBy === 'name' ? (sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />) : <FaArrowDown />}
                    </span>
                </div>
                <div className="user-item-title">
                    <span>Address</span>
                </div>
                <div className="user-item-title" onClick={handleSortByDate}>
                    <span>
                        Date of registration {sortBy === 'date' ? (sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />) : <FaArrowDown />}
                    </span>
                </div>
            </div>
            <div className="users-list">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="users-items">
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map(user => (
                                <div className="user-item" key={user.id}>
                                    <div className='user-name'>{user.name}</div>
                                    <p className='user-address'>{user.address}</p>
                                    <p className='user-date'>
                                        {new Date(user.created_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false,
                                        })}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserList
