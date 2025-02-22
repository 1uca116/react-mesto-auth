export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`)
        }).catch((err) => console.log(err));
};

export const authorize = (email, password) =>{
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((response => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`)
        }))
        .then((data) => {
            if (data.token){
                localStorage.setItem('token', data.token);
                return data.token;
            }
        })
        .catch(err => console.log(err))
};

export const checkToken = (token) =>{
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка ${response.status}`)
    })
}