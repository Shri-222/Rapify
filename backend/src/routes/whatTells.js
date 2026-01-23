
import express from 'express'
import axios from 'axios';
import verifySession from '../middleware/auth.js';
import { analyzeListening } from '../controllers/analysis.controller.js';
import ListeningSummary  from '../model/ListeningSummary.js';
import { buildListeningSummary } from '../services/listeningSummary.builder.js';
import refreshTokenValidate from '../middleware/refreshToken.js';
import validateTimeRange from '../middleware/validateTimeRange.js';
import { sanitizeSpotifyProfile } from '../services/spotifySanitizer.js';

const router = express.Router();
const SPOTIFY_BASE_API = process.env.SPOTIFY_BASE_API


router.post(
  "/analysis/prepare",
  verifySession,
  refreshTokenValidate,
  validateTimeRange,
  async (req, res) => {
    try {
      const { time_range = "medium_term" } = req.time_range;

      console.log("session USERID : ", req.session.sessionData.spotifyId, req.session.sessionData.access_token)

      if (!req.time_range || !time_range) {
        return res.status(400).json({ error: "time_range missing" });
      }

      // 1. Fetch Spotify data (reuse logic or call internally)
      const [artistsRes, tracksRes] = await Promise.all([
        axios.get(`${SPOTIFY_BASE_API}/me/top/artists`, {
          headers: {
            Authorization: `Bearer ${req.session.sessionData.access_token}`,
          },
          params: { time_range, limit: 50 },
        }),
        axios.get(`${SPOTIFY_BASE_API}/me/top/tracks`, {
          headers: {
            Authorization: `Bearer ${req.session.sessionData.access_token}`,
          },
          params: { time_range, limit: 50 },
        }),
      ]);

      // 2. Sanitize
      const sanitized = sanitizeSpotifyProfile({
        artists: artistsRes.data.items,
        tracks: tracksRes.data.items,
      });

      // 3. Build summary
      const summary = buildListeningSummary(sanitized);

      // 4. Save
      await ListeningSummary.create({
        userId: req.session.sessionData.spotifyId,
        data: summary,
      });

      return res.json({ success: true });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to prepare analysis" });
    }
  }
);


router.post(
  "/analysis/listening",
  verifySession,
  analyzeListening
);

export default router;