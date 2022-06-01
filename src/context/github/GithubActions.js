export const searchUsers = async (text) => { 

    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`https://api.github.com/search/users?${params}`)

    const {items} = await response.json()

    return items
}

export const getUser = async (login) => {
    
    const response = await fetch(`https://api.github.com/users/${login}`)

    if(response.status === 404) {
        window.location = '/notfound'
    } else {
        const data = await response.json()
    
        return data
    }
}

export const getUserRepos = async (login) => {
  
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`)

    const data = await response.json()
    
    return data
}