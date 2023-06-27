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