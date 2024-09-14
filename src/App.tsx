// Styles
import './scss/main.scss'
import 'react-toastify/dist/ReactToastify.css'
// Libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Templates
import MainLayout from './html/templates/MainLayout'
// Pages
import Home from './html/pages/Home/Home'
import Articles from './html/pages/Articles/Articles'
import SingleNews from './html/templates/SingleNews'
import Apps from './html/pages/Apps/Apps'
import UserDashboard from './html/user/UserDashboard/userDashboard'
// Admin-area
import Login from './html/admin-area/auth/Login/Login'
import Dashboard from './html/admin-area/Dashboard/Dashboard'
// Routes
import PrivateRoute from './routes/privateRoute'
import AdminRoute from './routes/AdminRoute'
import { ToastContainer } from 'react-toastify'


const App = () => {
	return (
		<Router>
			<ToastContainer autoClose={1000}/>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					{/* <Route path='/news' element={<Articles />} /> */}
					{/* <Route path='/news/:category/:slug' element={<SingleNews />} /> */}
					{/* <Route path="/apps" element={<Apps />} /> */}
					{/* <Route element={<PrivateRoute />}> */}
						{/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
					{/* </Route> */}
				</Route>
				<Route path="/admin/login" element={<Login />} />
				<Route
					path="/admin/dashboard"
					element={
						<AdminRoute>
							<Dashboard />
						</AdminRoute>
					}
				/>
			</Routes>
		</Router>
	)
}

export default App