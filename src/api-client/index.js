const BASE = 'http://localhost:8080/api';

//deployment
// const BASE = 'api';

export const getAllPosts = async () => {
    try {
        const response = await fetch(`${BASE}/posts`);
        const result = response.json();
       
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE}/users`);
        const result = response.json()
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const createPost = async (description) => {
    try {
        const user = localStorage.getItem('currentUser');
        
        const response = await fetch(`${BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({
          description,
          user
        })
        })
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const increaseLikes = async (id) => {
    try {
        const response = await fetch(`${BASE}/posts/${id}`, {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        })
        const result = await response.json();
        // console.log(result.likes)
        return result;
    } catch (error) {
        console.error(error);
    }
}
