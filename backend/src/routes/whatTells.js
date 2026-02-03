
import express from 'express'
import axios from 'axios';
import verifySession from '../middleware/auth.js';
import { analyzeListening } from '../controllers/analysis.controller.js';
import ListeningSummary  from '../model/ListeningSummary.js';
import { buildListeningSummary } from '../services/listeningSummary.builder.js';
import refreshTokenValidate from '../middleware/refreshToken.js';
import validateTimeRange from '../middleware/validateTimeRange.js';
import { sanitizeSpotifyProfile, sanitizeTopArtists, sanitizeTopTracks } from '../services/spotifySanitizer.js';

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

      if (!req.time_range || !time_range) {
        return res.status(400).json({ error: "time_range missing" });
      }

      // 1. Fetch Spotify Profile data 
        const meRes = await axios.get(`${SPOTIFY_BASE_API}/me`, {
          headers: {
            Authorization: `Bearer ${req.session.sessionData.access_token}`,
          },
        });

      // 1.2 Fetch Spotify data (reuse logic or call internally)
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
      const  SanitizedProfile = sanitizeSpotifyProfile(meRes.data);

      const SanitizedArtists = sanitizeTopArtists(artistsRes.data);

      const SanitizedTracks = sanitizeTopTracks(tracksRes.data);

      const sanitized = {
        profile : SanitizedProfile,
        artists: SanitizedArtists,
        tracks : SanitizedTracks,
      }

      // 3. Build summary
      const summary = buildListeningSummary({ sanitized });
      // console.log("summory we got from the Route : ", summary)

      const userId = req.session.sessionData.userMongoId;
      // 4. Save
      await ListeningSummary.findOneAndUpdate(
          { userId },
          {
            $set: {
              ...summary,
              generatedAt: new Date(),
            },
          },
          { new: true, upsert: true }
        );

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