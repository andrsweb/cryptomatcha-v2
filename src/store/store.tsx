import { create } from 'zustand'

interface StoreState {
	address: string | null
	status: 'Connected' | 'Disconnected'
	setAddress: (address: string | null) => void
	setStatus: (status: 'Connected' | 'Disconnected') => void
}

const useStore = create<StoreState>((set) => ({
	address: sessionStorage.getItem('address') || null,
	status: (sessionStorage.getItem('status') as 'Connected' | 'Disconnected') || 'Disconnected',
	setAddress: (address) => {
		set({ address })
		sessionStorage.setItem('address', address || '')
	},
	setStatus: (status) => {
		set({ status })
		sessionStorage.setItem('status', status)
	}
}))

export default useStore
