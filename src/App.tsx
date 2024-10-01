// Styles
import './scss/main.scss'
import 'react-toastify/dist/ReactToastify.css'
// Libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { wallets as keplr } from "@cosmos-kit/keplr"
import { wallets as leap } from "@cosmos-kit/leap" 
// Functions
import { sessionOptions } from './html/common/Header/functions'
import { walletConnectOptions } from './html/common/Header/functions'
// Templates
import MainLayout from './html/templates/MainLayout'
// Pages
import Home from './html/pages/Home/Home'
import NewsPage from './html/pages/News/NewsPage'
import NewsSingle from './html/templates/SingleNews/NewsSingle/NewsSingle'
import Apps from './html/pages/Apps/Apps'
import UserDashboard from './html/user/UserDashboard/userDashboard'
import StargazeError from './html/errors/StargazeError/StargazeError'
import Error404 from './html/errors/Error404/Error404'
// Admin-area
import Login from './html/admin-area/auth/Login/Login'
import AdminDashboard from './html/admin-area/AdminDashboard/AdminDashboard'
// Routes
import PrivateRoute from './routes/privateRoute'
import AdminRoute from './routes/AdminRoute'
// Providers
import { ChainProvider } from "@cosmos-kit/react"
import { ThemeProvider } from "@interchain-ui/react"
import useChainData from './hooks/useChainData'

const BlockchainProvider = ({ children }: { children: React.ReactNode }) => {
    const { chains, assets, error } = useChainData(['stargaze'])

    if (error) {
        return <StargazeError message={error} />
    }

    if (chains.length === 0 || assets.length === 0) {
        return null
    }

    return (
        <ChainProvider
            chains={chains}
            assetLists={assets}
            wallets={[...keplr, ...leap]}
            walletConnectOptions={walletConnectOptions}
            sessionOptions={sessionOptions}
        >
            {children}
        </ChainProvider>
    )
}

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <ToastContainer autoClose={1000} />
                <Routes>
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="*" element={<Error404 />} />
                    
                    <Route path="/" element={<BlockchainProvider><MainLayout /></BlockchainProvider>}>
                        <Route index element={<Home />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/news/:category/:slug" element={<NewsSingle />} />
                        <Route path="/apps" element={<Apps />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/user-dashboard" element={<UserDashboard />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App