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

export const increaseLikes = async (id, userId) => {
    try {
        const response = await fetch(`${BASE}/posts/${id}`, {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ userId })
        });
        
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getUserProfile = async (username, token) => {
    try {
        const response = await fetch(`${BASE}/users/profile/${username}`, {

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
    }});
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const deletePost = async ({ postId, token }) => {
  try {
    const response = await fetch(`${BASE}/users/profile/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const result = await response.json();

    if (result.error) {
        throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (postId, token, description) => {
    try {
        const response = await fetch(`${BASE}/users/profile/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ description })
        });
        
        const result = await response.json();
        if(result.error) {
            throw new Error(result.message);
        }

    } catch (error) {
        console.error(error);
    }
};

export const getUserMessages = async (username, token) => {
    try {
        const response = await fetch(`${BASE}/users/messages/${username}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const sendMessage = async (username, token, description, senderId, subject) => {
    try {
        const response = await fetch(`${BASE}/users/messages/${username}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ description, senderId, subject })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const deleteMessage = async (username, token, id) => {
  try {
    const response = await fetch(`${BASE}/users/messages/${username}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id })
    });

  

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const searchPosts = async (keyword) => {
    try {
        const response = await fetch(`${BASE}/posts/search/${keyword}`, {
            method: "GET",
      headers: {
        "Content-type": "application/json",
      },
        });
        const result = await response.json();
        
        return result;
      
    } catch (error) {
        console.error(error);
    }
};

export const getPostsLikedByUser = async (userId) => {

    try {
        const response = await fetch(`${BASE}/posts_likes/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error;
        throw error;
    }
}
