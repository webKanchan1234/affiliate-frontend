import api from "./apiService";

// ✅ Fetch all users
export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// ✅ Login (Save token & user)
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  console.log(response.data)
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    const user = await userProfile(); // Fetch user profile after login
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  }

  return response.data;
};

// ✅ Register User
export const registerUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  console.log(response.data)
  return response.data;
};

// ✅ Get User Profile (Avoids unnecessary API calls)
export const userProfile = async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) return JSON.parse(storedUser);

  const response = await api.get("/user/profile");
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};


// ✅ logout user
export const logoutUser = async () => {
  localStorage.removeItem("user");  // ❌ Remove user info
  localStorage.removeItem("token"); // ❌ Remove token
  return null; // Reset user state
};


// ✅ Get all Users 
export const allUsers = async () => {
  const response = await api.get("/user/users");
  return response.data;
};


export const deleteUser = async (id) => {
  const response = await api.delete(`/user/user/${id}`);
  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await api.put(`/user/update-profile`,data);
  // console.log(response.data)
  return response.data;
};

export const updateUserRole = async (id,data) => {
  const response = await api.put(`/user/update-role/${id}`,data);
  return response.data;
};

export const changePassword = async (data) => {
  console.log(data)
  const response = await api.put(`/user/change-password`,data);
  return response.data;
};
