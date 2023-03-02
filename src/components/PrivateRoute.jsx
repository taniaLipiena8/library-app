import { Navigate } from 'react-router-dom';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const auth = localStorage.getItem('user_id')
    
    if (!auth) {
        
        return <Navigate to="/login" />
    }

    
    return children;
}