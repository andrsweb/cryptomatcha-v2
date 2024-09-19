import { useState } from 'react'
import DiscordList from './DiscordList'
import DiscordAdd from './DiscordAdd'
import { ToastContainer } from 'react-toastify'

const DiscordTab = () => {
	const [shouldRefresh, setShouldRefresh] = useState(false)

	const handleAddSuccess = () => {
		setShouldRefresh(prev => !prev)
	}

	return (
		<div>
			<ToastContainer />
			<DiscordList shouldRefresh={shouldRefresh} />
			<DiscordAdd onAddSuccess={handleAddSuccess} />
		</div>
	)
}

export default DiscordTab