//src/services/googleAuth.service.js

import axios from "axios";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

// Client not needed for simple access token userinfo fetch
// const client = new OAuth2Client(env.googleClientId);

export const verifyGoogleToken = async (token) => {
  try {
    // Verify and get user info using the Access Token
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      googleId: data.sub,
      email: data.email,
      name: data.name,
      avatar: data.picture,
    };
  } catch (error) {
    console.error("Google Auth Error:", error.response?.data || error.message);
    throw new ApiError(401, "Google authentication failed");
  }
};
