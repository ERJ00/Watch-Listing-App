# Watch Listing App  

## User Interface

<div style="margin-top: 20px;">
  <video width="320" height="240" controls>
    <source src="UI/video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="UI/image1.png" alt="Image 1" width="150" />
  <img src="UI/image2.png" alt="Image 2" width="150" />
  <img src="UI/image3.png" alt="Image 3" width="150" />
  <img src="UI/image4.png" alt="Image 4" width="150" />
  <img src="UI/image5.png" alt="Image 5" width="150" />
  <img src="UI/image6.png" alt="Image 6" width="150" />
  <img src="UI/image7.png" alt="Image 7" width="150" />
  <img src="UI/image8.png" alt="Image 8" width="150" />
  <img src="UI/image9.png" alt="Image 9" width="150" />
</div>

---

The **Watch Listing App** is my first app, developed to practice and enhance my skills in web app development. This app is a simple and efficient tool for organizing movies and series. Users can manually create a personalized list with details like **title**, **season**, **episode**, and **status** (finished or unfinished). The app prioritizes offline functionality, storing data locally after login, while leveraging Firebase for user account management and cloud-based data syncing.  

## Features  

### Core Functionalities  
- **User Accounts**:  
  - Sign up and log in with Firebase authentication.  
  - Securely store and sync your watchlist across sessions.  

- **Offline-First Design**:  
  - Add, edit, remove, and search for items while offline.  
  - Local storage ensures that core features work seamlessly without an internet connection.  

- **Data Syncing**:  
  - Sync your watchlist with Firebase to save or retrieve data when connected to the internet.  

- **Manual Data Input**:  
  - Users input all information (title, season, episode, status) manually.  
  - Keeps the app lightweight and independent of third-party APIs.  

### Current Functionality  
- Add new items to your watchlist.  
- Edit details for existing entries.  
- Remove items from the list.  
- Search for items by title.  
- Save data to Firebase and load it back when logging in.  

## Technology Stack  

- **React Native with Expo**: Frontend framework for building cross-platform mobile apps.  
- **Firebase**: Backend for user authentication and cloud database services.  
- **Local Storage**: To support offline-first capabilities.  

## How It Works  

1. **Login/Signup**:  
   Users must log in or create an account using Firebase. Internet connectivity is required for this step.  

2. **Local Data Storage**:  
   Once logged in, the app retrieves the user's data from Firebase and saves it locally on the device. After this, users can add, edit, remove, and search for items offline.  

3. **Data Syncing**:  
   When saving or loading data, the app connects to Firebase to update the user's watchlist in the cloud.  

## Limitations  

- All entries are manually inputted by the user; the app does not integrate with APIs for automatic data fetching.  
- Internet connectivity is required for account management and syncing data with Firebase.  

## Future Plans  

This project is in its early stages and currently focuses on essential features. Future updates may include:  
- Improved UI/UX design.  
- Integration with APIs for automatic movie/series data fetching.  
- Advanced filtering and sorting options.  
- Notifications for upcoming episodes or new seasons.  
