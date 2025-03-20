const config = {
  API_KEY: process.env.EXPO_PUBLIC_API_KEY ?? "",
  AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? "",
  PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID ?? "",
  STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET ?? "",
  MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID ?? "",
  APP_ID: process.env.EXPO_PUBLIC_APP_ID ?? "",
  MEASUREMENT_ID: process.env.EXPO_PUBLIC_MEASUREMENT_ID ?? "",
};

export default config;