import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const storedAccounts = localStorage.getItem('cosmos-kit@2:core//accounts')
	const parsedAccounts = storedAccounts ? JSON.parse(storedAccounts) : []
	const address = parsedAccounts.length > 0 ? parsedAccounts[0].address : ''

  if (!address) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
