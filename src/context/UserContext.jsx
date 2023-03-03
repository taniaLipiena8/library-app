import React, {createContext} from 'react';

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const user_id = localStorage.getItem('user_id')
    const username = localStorage.getItem('username')

    return (
        <UserContext.Provider value={{user_id, username}}>
            {props.children}
        </UserContext.Provider>
    );
}
 
export default UserContextProvider;