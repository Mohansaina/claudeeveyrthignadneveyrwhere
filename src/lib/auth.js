import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Sign up a new user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<import("firebase/auth").UserCredential>}
 */
export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

/**
 * Log in an existing user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<import("firebase/auth").UserCredential>}
 */
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};
