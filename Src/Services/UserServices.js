// Src/Services/UserServices.js
const User = require("../Model/UserModel");
const argon2 = require("argon2");

const getUsersServices = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const addUserServices = async (body) => {
    try {
        const exists = await User.findOne({ where: { name: body.name } });
        if (exists) {
            throw new Error("L'utilisateur existe déjà.");
        }
        body.password = await argon2.hash(body.password);
        return await User.create(body);
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

const getUserByIdServices = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const updateUserService = async (id, body) => {
    try {
        if (body.password) {
            body.password = await argon2.hash(body.password);
        }

        const [updated] = await User.update(body, {
            where: { id },
        });
        return updated ? await User.findByPk(id) : null;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

const deleteUserService = async (id) => {
    try {
        const deleted = await User.destroy({
            where: { id }
        });
        return deleted ? true : false;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ where: { name: username } });
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

module.exports = {
    getUsersServices,
    addUserServices,
    getUserByIdServices,
    updateUserService,
    deleteUserService,
    getUserByUsername
};
