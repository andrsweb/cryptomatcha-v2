import { Navigate, Outlet } from 'react-router-dom'
import useStore from '../store/store'

const PrivateRoute = () => {
  const { address, status } = useStore((state) => ({
    address: state.address,
    status: state.status,
  }))

  if (status !== 'Connected' || !address) {
    return <Navigate to="/" />
  }

  return <Outlet /> 
}

export default PrivateRoute