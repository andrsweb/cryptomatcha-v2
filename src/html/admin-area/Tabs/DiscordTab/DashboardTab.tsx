import { DashboardTabProps } from "../../types"

const DashboardTab = ({ loginName }: DashboardTabProps) => (
    <div>
        <h1>Welcome, {loginName}!</h1>
    </div>
)

export default DashboardTab