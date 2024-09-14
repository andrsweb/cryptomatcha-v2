import { Navigate, Outlet } from 'react-router-dom'
import { useWalletStore } from '../store/walletStore'

const PrivateRoute = () => {
	const { address } = useWalletStore(state => state)

	if (!address) {
		return <Navigate to="/" />
	}

	return <Outlet />
}

export default PrivateRoute
