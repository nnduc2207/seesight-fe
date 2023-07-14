export const login = async ({ email, password }) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/login`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        }
    )

    const result = await response.json()

    if (result.error) {
        throw result.error
    }

    return result
}
export const register = async ({ email, password, name }) => {
    if(!email) throw `Email is empty`;
    if(!password) throw `Password is empty`;
    if(!name) throw `Name is empty`;
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/register`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                name,
            }),
        }
    )

    const result = await response.json()

    if (result.error) {
        throw result.error
    }

    return true
}

export const getUser = async (token) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/authenticate`,
        {
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`,
            }),
            method: "POST",
        }
    )

    const result = await response.json()

    if (result.error) {
        throw result.error
    }

    return result.user
}