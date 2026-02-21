import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/auth/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import apiClient from "@/api/apiClient";

import StatCard from "@/components/StatCard";

export default function Dashboard() {

  // ------------ keep existing logic & state untouched ------------
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [ type, setType ] = useState('normal')

  const [ newArtists, setNewArtists ] = useState([])
  const [ newTracks, setNewTracks ] = useState([]);
  const [ next, setNext ] = useState(undefined)

  const [ viewTracks, setViewTracks] = useState(false)
  const [ viewArtists, setViewArtists] = useState(false)
  const { user, artists, tracks } = useAuth()

  useEffect(() => {
    if (artists) {
      setNewArtists(artists.items)
    }

    if (tracks) {
      setNewTracks(tracks.items)
    }
  }, [tracks, artists]);

  const callTracksPagination = async( offset ) => {
    try {
      const res = await apiClient.get('/spotify/top-tracks', {
        params: { limit : 20, offset : offset }
      })
      setNewTracks(res.data.items)
      setNext(res.data.next)
    } catch (error) {
      console.log('error : ', error)
    }
  };

  const callArtistsPagination = async( offset ) => {
    try {
      const res = await apiClient.get('/spotify/top-artists', {
        params: { limit : 20, offset : offset }
      })
      setNewArtists(res.data.items)
      setNext(res.data.next)
    } catch (error) {
      console.log('error : ', error)
    }
  }

  const handleAnalyze = async () => {
    setShowAnalysis(true);
    try {
      setLoading(true);
      setError(null);

      //Prepare data
      await apiClient.post("/tellMe/analysis/prepare");

      //Get analysis
      const res = await apiClient.post("/tellMe/analysis/listening", {
        type,
      });

      setAnalysis(res.data.analysis);
      setOpen(true); 

    } catch (err) {
      setError("Failed to analyze your listening habits");
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#07100e] text-white flex">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-72 flex-col justify-between border-r border-zinc-900 bg-gradient-to-b from-[#07110f] to-[#091412] p-6">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-black font-bold">A</div>
            <div className="text-2xl font-extrabold tracking-tight text-green-400">AURA.AI</div>
          </div>

          <nav className="space-y-6 text-sm">
            <div className="text-green-400 font-semibold">Dashboard</div>
            <div className="text-zinc-400 hover:text-white cursor-pointer">Discover</div>
            <div className="text-zinc-400 hover:text-white cursor-pointer">Trends</div>
            <div className="text-zinc-400 hover:text-white cursor-pointer">Deep Dive</div>
            <div className="text-zinc-400 hover:text-white cursor-pointer">Settings</div>
          </nav>
        </div>

        <div className="bg-[#062017] border border-green-900/30 rounded-2xl p-4 text-sm">
          <div className="text-zinc-300 text-xs mb-1">CURRENT PLAN</div>
          <div className="text-green-300 font-medium">{user?.product}</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 md:p-10 space-y-8 overflow-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Music Intelligence</h1>
            <p className="text-zinc-400 mt-1">Your listening story, decoded through your plays.</p>
          </div>

          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-br from-green-500 to-green-600 text-black rounded-full px-5 py-2 shadow-lg">
              Share My Insights
            </Button>
            <div className="w-10 h-10 rounded-full bg-[#0b1613] flex items-center justify-center border border-zinc-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* PROFILE ROW + ANALYZE */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Profile card */}
            <Card className="col-span-2 lg:col-span-2 bg-gradient-to-br from-[#0b1713] to-[#0b1211] border border-zinc-800 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-28 h-28 ring-4 ring-green-600/20 shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                      <AvatarImage src={user.images?.[0]?.url} />
                      <AvatarFallback>{user.display_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-green-600 text-black text-xs px-2 py-1 rounded-full font-semibold">EXPLORER</div>
                  </div>
                  
                  <div className="ml-2">
                    <div className="text-4xl font-bold text-white capitalize">{user.display_name}</div>
                    <div className="text-zinc-400 text-sm">{user.email}</div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-[#071814] border border-zinc-800 rounded-xl p-3">
                        <div className="text-xs text-zinc-400">Total Listen Time</div>
                        <div className="text-lg font-bold text-green-300">42,840 <span className="text-xs text-zinc-400">min</span></div>
                      </div>
                      <div className="bg-[#071814] border border-zinc-800 rounded-xl p-3">
                        <div className="text-xs text-zinc-400">Top Genre</div>
                        <div className="text-lg font-bold text-green-300">Indie</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TOP ARTISTS strip at bottom */}
            <div className="col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Top Artists</h3>
                <div className="text-sm text-zinc-400">View all</div>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-2">
                {newArtists.slice(0, 6).map((artist, idx) => (
                  <div key={artist.id || idx} className="min-w-[120px] bg-[#071514] border border-zinc-800 rounded-2xl p-4 flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="w-20 h-20 ring-2 ring-green-600/20">
                        <AvatarImage src={artist.images?.[0]?.url} />
                        <AvatarFallback>{artist.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -left-2 bg-green-600 text-black text-xs px-2 py-1 rounded-full font-semibold">#{idx+1}</div>
                    </div>
                    <div className="mt-3 text-sm text-center">{artist.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">{artist.followers?.total ? formatNumber(artist.followers.total) + " plays" : "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        
          {/* Big Narrative card (center) */}
          <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-[#071412] to-[#071110] border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="text-sm text-green-300 font-semibold mb-2">NARRATIVE PROFILE</div>
                <h2 className="text-3xl font-extrabold">What Your Music <span className="text-green-400">Says About You</span></h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StatCard
                    title="Dominant Mood"
                    subtitle="Melancholic Indie"
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 11 5-2 9-6 9-11 0-5-4-9-9-9z" stroke="#3DDC84" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  />

                  <StatCard
                    title="Personality Traits"
                    subtitle="Introspective, Analytical"
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2v10l4 2" stroke="#3DDC84" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  />

                  <StatCard
                    title="Emotional Patterns"
                    subtitle="Evening peak for focus"
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12h3l3 8 4-16 3 8h3" stroke="#3DDC84" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  />

                  <StatCard
                    title="Listening Habits"
                    subtitle="Deep diver into albums"
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="#3DDC84" strokeWidth="1.2"/>
                        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="#2F9E5C" strokeWidth="1.2"/>
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Circular visual on right */}
              <div className="w-44 h-44 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#052016] to-[#083025] ring-2 ring-green-700/20 flex items-center justify-center">
                  <div className="text-green-300 text-2xl font-bold">★</div>
                </div>
              </div>
            </div>
          </Card>

        {/* Lower content: Top Tracks + Right column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Top Tracks (wide) */}
          <Card className="col-span-1 lg:col-span-2 bg-[#081312] border border-zinc-800 rounded-3xl overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-bold">Top Tracks</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="p-6 divide-y divide-zinc-800">
                {newTracks.slice(0, 8).map((track, idx) => (
                  <div key={track.id || idx} className="flex items-center gap-4 py-4">
                    <div className="text-zinc-500 w-8 text-sm">{String(idx + 1).padStart(2, '0')}</div>

                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
                      {track.album?.images?.[0] ? (
                        <img src={track.album.images[0].url} alt={track.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-zinc-400">{track.name?.charAt(0)}</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold truncate">{track.name}</div>
                          <div className="text-xs text-zinc-400 truncate">{(track.artists || []).map(a => a.name).join(", ")} • {track.album?.name}</div>
                        </div>

                        <div className="text-zinc-400 text-xs ml-4">{formatDuration(track.duration_ms)}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* fallback when no tracks */}
                {newTracks.length === 0 && (
                  <div className="py-8 text-center text-zinc-400">No tracks available yet.</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right column: Genre + Mood mapping */}
          <div className="space-y-6">
            <Card className="bg-[#071312] border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-zinc-300">Genre Distribution</div>
                  <div className="text-2xl font-bold text-green-300 mt-1">Indie • 70%</div>
                </div>

                {/* simple donut svg */}
                <div>
                  <svg width="80" height="80" viewBox="0 0 36 36" className="transform rotate-[-90deg]">
                    <circle cx="18" cy="18" r="15" fill="transparent" stroke="#0b1a15" strokeWidth="6"></circle>
                    <circle cx="18" cy="18" r="15" fill="transparent" stroke="#2ECC71" strokeWidth="6" strokeDasharray="70 30" strokeLinecap="round"></circle>
                    <text x="18" y="20" textAnchor="middle" fontSize="6" fill="#9ef7c2" transform="rotate(90 18 18)">70%</text>
                  </svg>
                </div>
              </div>

              <div className="mt-4 text-sm text-zinc-400">
                <div className="flex items-center justify-between"><div>Indie Rock</div><div className="text-zinc-300">70%</div></div>
                <div className="flex items-center justify-between mt-2"><div>Art Pop</div><div className="text-zinc-300">20%</div></div>
                <div className="flex items-center justify-between mt-2"><div>Electronic</div><div className="text-zinc-300">10%</div></div>
              </div>
            </Card>

            <Card className="bg-[#071312] border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-zinc-300">Mood Mapping (24h)</div>
                <div className="text-xs text-zinc-400">peaks at 20:00</div>
              </div>

              {/* simple bar chart */}
              <div className="flex items-end gap-2 h-28">
                {[0,1,2,3,4,5,6,7].map((v, i) => {
                  const heights = [6,8,10,12,16,20,14,9];
                  return (
                    <div key={i} className="flex-1">
                      <div className="w-full h-full flex items-end">
                        <div className={`mx-auto rounded-t-md`} style={{
                          height: `${heights[i]}%`,
                          background: i === 5 ? 'linear-gradient(180deg,#2dd976,#249a4b)' : '#0f3b2c'
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-xs text-zinc-500 mt-3 flex justify-between">
                <div>00:00</div>
                <div>08:00</div>
                <div>16:00</div>
                <div>23:59</div>
              </div>
            </Card>
          </div>
        </div>

      </main>
    </div>
  );
}

// small utility helpers used only for display (no logic changes)
function formatDuration(ms) {
  if (!ms && ms !== 0) return "--:--";
  const total = Math.round(ms / 1000);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(1,'0')}:${String(secs).padStart(2,'0')}`;
}

function formatNumber(n) {
  if (!n && n !== 0) return '';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}
