// Styles
import './scss/main.scss'
import 'react-toastify/dist/ReactToastify.css'
// Libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Templates
import MainLayout from './html/templates/MainLayout'
// Pages
import Home from './html/pages/Home/Home'
import NewsPage from './html/pages/News/NewsPage'
import NewsSingle from './html/templates/SingleNews/NewsSingle/NewsSingle'
import Apps from './html/pages/Apps/Apps'
import UserDashboard from './html/user/UserDashboard/userDashboard'
// Admin-area
import Login from './html/admin-area/auth/Login/Login'
import AdminDashboard from './html/admin-area/AdminDashboard/AdminDashboard'
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
					<Route path='/news' element={<NewsPage />} />
					<Route path='/news/:category/:slug' element={<NewsSingle />} />
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
							<AdminDashboard />
						</AdminRoute>
					}
				/>
			</Routes>
		</Router>
	)
}

export default App