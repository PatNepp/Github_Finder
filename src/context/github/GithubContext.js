import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
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

    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`https://api.github.com/users/${login}`)

        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
        
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

    const clearUsers = () => {
        dispatch({type: 'CLEAR_USERS'})
    }

    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`)

        const data = await response.json()
        
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    //Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
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