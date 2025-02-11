// Src/Controllers/UserController.js
const {
    getUsersServices,
    addUserServices,
    getUserByIdServices,
    updateUserService,
    deleteUserService,
    getUserByUsername
} = require("../Services/UserServices");
const User = require('../Model/UserModel');

const argon2 = require("argon2"); 


const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};

const getUsers = async (req, res) => {
    try {
        const data = await getUsersServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Users retrieved successfully" : "No users found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving users", { error: error.message });
    }
};

const addUser = async (req, res) => {
    try {
      const { name, password, role } = req.body;
      const imagePath = req.file ? req.file.path : null;  // Save image path if available
  
      const newUser = new User({
        name,
        password: bcrypt.hashSync(password, 10),
        role,
        image: imagePath
      });
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

const getUserById = async (req, res) => {
    try {
        const data = await getUserByIdServices(req.params.id);
        return handleResponse(res, data ? 200 : 404, data ? "User retrieved successfully" : "User not found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving user", { error: error.message });
    }
};

const updateUser  = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            ...req.body,
            image: req.file ? req.file.buffer : null // L'image est extraite du fichier téléchargé
        };
        const updatedUser = await updateUserService(id, data);
        return handleResponse(res, updatedUser ? 200 : 404, updatedUser ? "User updated successfully" : "User not found", updatedUser);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating user", { error: error.message });
    }
};

const deleteUser  = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdServices(id);
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        await deleteUserService(id);
        return handleResponse(res, 200, "User deleted successfully");
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting user", { error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ where: { name } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        // Check password using argon2
        const isMatch = await argon2.verify(user.password, password); // argon2 verifies hashed password
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Return user data (add JWT if needed)
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
};
