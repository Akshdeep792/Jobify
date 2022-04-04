import { Outlet, Link } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"

const SharedLayout = () => {
    return <Wrapper>
        <nav>
            <Link to="all-jobs">AllJobs</Link>
            <Link to="add-job">Addjob</Link>
        </nav>
        <Outlet />
    </Wrapper>
}

export default SharedLayout