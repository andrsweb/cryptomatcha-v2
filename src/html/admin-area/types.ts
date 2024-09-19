export interface User {
    id: number
    address: string
    name: string
    created_at: string
}

export interface UserListProps {
    users: User[]
    loading: boolean
    error: string | null
	totalUsers: number
}

export interface UsersTabProps {
    users: User[]
    loading: boolean
    error: string | null
    totalUsers: number
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => void
}

export interface TabsProps {
    activeTab: string
    onTabClick: (tab: string) => void
}

export interface DashboardTabProps {
    loginName: string
}

export interface PostFormProps {
    postId?: number;
    existingPost?: {
        category: string;
        title: string;
        publication_date: string;
        text: string;
        image_path: string;
    };
    onSuccess: () => void;
}

export interface PostListProps {
    postsUpdated: boolean
}
