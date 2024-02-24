import { Link } from 'react-router-dom'

const Home = () => {
    // return (<div>Home Page</div>)
    return (
        <div>
            <Link to='/starred'>Click here to navigate to starred page</Link>
        </div>
    )
}

export default Home;