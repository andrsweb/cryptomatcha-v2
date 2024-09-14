import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.scss'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState<string | null>(null)
	const navigate = useNavigate()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)
		setSuccess(null)
		setLoading(true)

		try {
			const response = await fetch('https://ffb671a86d02.vps.myjino.ru/api/admin/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login: username, password }),
			})

			if (!response.ok) {
				throw new Error('Invalid login credentials')
			}

			const data = await response.json()
			const token = data.token

			localStorage.setItem('adminToken', token)
			localStorage.setItem('adminName', username)

			setSuccess('Login successful')
			setTimeout(() => {
				navigate('/admin/dashboard')
			}, 1000)
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<main>
			<section className='login'>
				<div className="container">
					<div className="login-wrapper">
						<form onSubmit={handleSubmit}>
							<legend>Login</legend>
							<fieldset>
								<div className='input-wrapper'>
									<label htmlFor="username">Username</label>
									<input
										type="text"
										id="username"
										value={username}
										placeholder='Enter username'
										onChange={e => setUsername(e.target.value)}
										required
										disabled={loading}
									/>
								</div>
								<div className='input-wrapper'>
									<label htmlFor="password">Password</label>
									<input
										type="password"
										id="password"
										placeholder='Type password'
										value={password}
										onChange={e => setPassword(e.target.value)}
										required
										disabled={loading}
									/>
								</div>
							</fieldset>
							<div className="button-wrapper">
								{error && <p className="error-message">{error}</p>}
								{success && <p className="success-message">{success}</p>}
								<button type="submit" disabled={loading}>
									{loading ? <span className="loader"></span> : 'Submit'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Login