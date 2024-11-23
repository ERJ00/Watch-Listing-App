//@ts-nocheck
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

// Define the path for the data file
const DATA_FILE_PATH = `${FileSystem.documentDirectory}data.json`;
const USER_SESSION_FILE_PATH = `${FileSystem.documentDirectory}userSession.json`;

// Utility functions for managing storage
const storageUtils = {
  // Save all items to storage
  saveData: async (items) => {
    try {
      const data = JSON.stringify(items);
      await FileSystem.writeAsStringAsync(DATA_FILE_PATH, data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  },

  // Check if a title already exists
  isTitleDuplicate: async (title) => {
    try {
      const currentData = await storageUtils.getAllItems();
      return currentData.some(
        (item) => item.title.toLowerCase() === title.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking for duplicate title:", error);
      return false;
    }
  },

  // Add a new item to storage
  addItem: async (newItem) => {
    try {
      const currentData = await storageUtils.getAllItems();

      // Add a unique ID to the new item
      const itemWithId = { ...newItem, id: uuid.v4() };

      // Add the new item to the list
      const updatedItems = [...currentData, itemWithId].sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      await storageUtils.saveData(updatedItems);
      return updatedItems;
    } catch (error) {
      console.error("Error adding item:", error);
      return null;
    }
  },

  // Delete items by IDs
  deleteItems: async (idsToDelete) => {
    try {
      const currentData = await storageUtils.getAllItems();

      // Filter out items whose ID matches any in idsToDelete
      const updatedItems = currentData.filter(
        (item) => !idsToDelete.includes(item.id)
      );

      await storageUtils.saveData(updatedItems);
      return updatedItems;
    } catch (error) {
      console.error("Error deleting items:", error);
      return null;
    }
  },

  // Update an item by ID
  updateItem: async (updatedItem) => {
    try {
      const currentData = await storageUtils.getAllItems();

      const updatedData = currentData.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      );

      const sortedData = updatedData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      await storageUtils.saveData(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Error updating item:", error);
      return null;
    }
  },

  // Fetch all items
  getAllItems: async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(DATA_FILE_PATH);
      if (!fileExists.exists) {
        return [];
      }

      const data = await FileSystem.readAsStringAsync(DATA_FILE_PATH);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  },

  // Reset all data
  resetData: async () => {
    try {
      await FileSystem.deleteAsync(DATA_FILE_PATH, { idempotent: true });
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  },

  // New method to get item statistics
  getItemStatistics: async () => {
    try {
      const items = await storageUtils.getAllItems();
      const total = items.length;
      const finished = items.filter((item) => item.status === true).length;
      const unfinished = total - finished;

      return {
        total,
        finished,
        unfinished,
      };
    } catch (error) {
      console.error("Error getting item statistics:", error);
      return {
        total: 0,
        finished: 0,
        unfinished: 0,
      };
    }
  },

  // Save user session locally
  saveUserSession: async (user) => {
    try {
      const data = JSON.stringify(user);
      await FileSystem.writeAsStringAsync(USER_SESSION_FILE_PATH, data);
    } catch (error) {
      console.error("Error saving user session:", error);
    }
  },

  // Get user session
  getUserSession: async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(USER_SESSION_FILE_PATH);
      if (!fileExists.exists) {
        return null;
      }

      const session = await FileSystem.readAsStringAsync(
        USER_SESSION_FILE_PATH
      );
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error("Error fetching user session:", error);
      return null;
    }
  },

  // Clear user session
  clearUserSession: async () => {
    try {
      await FileSystem.deleteAsync(USER_SESSION_FILE_PATH, {
        idempotent: true,
      });
    } catch (error) {
      console.error("Error clearing user session:", error);
    }
  },
};

export default storageUtils;
