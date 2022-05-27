import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Get Search Results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`https://api.github.com/search/users?${params}`)

        const {items} = await response.json()
        
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    const clearUsers = () => {
        dispatch({type: 'CLEAR_USERS'})
    }

    //Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }} >
        {children}
    </GithubContext.Provider>
}

export default GithubContext

// const fetchUsers = async () => {
//     const response = await fetch(`https://api.github.com/users`)

//     const data = await response.json()
    
//     setUsers(data)
//     setLoading(false)
// }