//src/services/googleAuth.service.js

import { OAuth2Client } from 'google-auth-library';
import env from '../config/env.js';
import ApiError from '../utils/apiError.js';

const client = new OAuth2Client(env.googleClientId);

export const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new ApiError(401, 'Invalid Google token payload');
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
    };
  } catch (error) {
    throw new ApiError(401, 'Google authentication failed');
  }
};
