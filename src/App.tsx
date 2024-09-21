// Styles
import './scss/main.scss'
import 'react-toastify/dist/ReactToastify.css'
// Libs
import { useState, useEffect } from 'react'
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
import { ChainProvider } from "@cosmos-kit/react"
import { ThemeProvider } from "@interchain-ui/react"
import { ChainRegistryClient } from "@chain-registry/client"
import { wallets as keplr } from "@cosmos-kit/keplr"
import { wallets as leap } from "@cosmos-kit/leap"
import { sessionOptions } from './html/common/Header/functions'
import { walletConnectOptions } from './html/common/Header/functions'

const App = () => {
	const client = new ChainRegistryClient({
		chainNames: ['stargaze'],
	})

	const [chains, setChains] = useState<any[]>([])
	const [assets, setAssets] = useState<any[]>([])

	useEffect(() => {
		(async () => {
			await client.fetchUrls()
			const chainData = client.getChain('stargaze')
			const assetListData = client.getChainAssetList('stargaze')

			setChains([chainData])
			setAssets([assetListData])
		})()
	}, [client])

	if (chains.length === 0 || assets.length === 0) {
		return <div>Loading...</div>
	}

	return (
		<ChainProvider
			chains={chains}
			assetLists={assets}
			wallets={[...keplr, ...leap]}
			walletConnectOptions={walletConnectOptions}
			sessionOptions={sessionOptions}
		>
			<ThemeProvider
				themeDefs={[
					{
						name: 'custom',
						vars: {
							colors: {
								primary500: '#1a73e8',
							},
							space: {
								sm: '8px',
								lg: '24px',
							},
						},
					},
				]}
				customTheme="custom"
			>
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
			</ThemeProvider>
		</ChainProvider>
	)
}

export default App
