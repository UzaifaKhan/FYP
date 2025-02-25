import { Link, useNavigate } from "react-router-dom";
import authService from "../../API/authService"; 

const Header = ({ title }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout(); // Clear token
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
            <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
                <div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded border border-red-600 mr-4">
                        Logout
                    </button>
                    <Link to='/login'>
                        <button className="bg-black text-white px-4 py-2 rounded border border-black">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
