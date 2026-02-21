import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { SpinnerButton } from "@/components/SpinnerButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Activity, Clock, ChartNoAxesColumn, Sparkles } from "lucide-react";
import Bars from "@/components/ui/bars";

const Login = () => {
  const { user, isLoading } = useContext(AuthContext);

  const handleConnect = () => {
    window.location.href = `${import.meta.env.VITE_TEST_URL}/auth/login`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <SpinnerButton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0c110f] text-white flex flex-col">

        {/* NavaBar  */}
        <header className="border-b border-zinc-800">
          <div className="container mx-auto flex justify-between items-center px-6 py-5">
            <div className="flex items-center gap-2">
              <ChartNoAxesColumn size={24} strokeWidth={3} className="text-[#1DB954]" />
              <span className="font-semibold text-lg">Rapify</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-transparent hover:font-bold">
                Log in
              </Button>

              <Button
                variant="default"
                onClick={handleConnect}
                className="bg-[#1DB954] text-black hover:text-white font-bold rounded-full px-6"
              >
                Connect
              </Button>
            </div>
          </div>
        </header>

        {/* HERO Section */}
        <section className="container mx-auto flex flex-col items-center text-center px-6 py-24 relative radial-green-glow">

          {/* Glow background */}
          <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full top-20 -z-10" />

          <Badge className="bg-green-500/20 text-[#1DB954] border-green-500/30 mb-6 tracking-widest px-3 py-1">
            POWERED BY Shri
          </Badge>

          <h2 className="text-9xl md:text-8xl font-extrabold leading-tight max-w-4xl">
            Discover What Your Music{" "}
            <span className="text-[#1DB954]">Says About You</span>
          </h2>

          <p className="text-[#A0AEC0] mt-6 max-w-2xl text-lg">
            Our AI analyzes your Spotify data to reveal the patterns,
            moods, and personality traits hidden in your listening history.
          </p>

          <div className="flex gap-4 mt-10">
            <Button
              onClick={handleConnect}
              className="bg-[#1DB954] text-black font-bold hover:bg-[#27ae60] px-8 py-6 rounded-full text-base"
            >
              Connect with Spotify →
            </Button>

            <Button
              variant="outline"
              className="px-8 py-6 rounded-full bg-transparent text-base text-white border-zinc-700 hover:bg-transparent hover:text-white"
            >
              View Sample
            </Button>
          </div>
          <Bars />
        </section>

        {/* Middle Section  */}
        <section className="w-[92%] container mx-auto px-6 py-20">

          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Deep Insights Into Your Sound
            </h2>
            <div className="flex items-center">
              <p className="text-zinc-300 max-w-xl">
                Go beyond the playlist and understand the DNA of your musical taste with our proprietary neural networks.
              </p>
              <div className="h-0.5 flex-1 bg-white/10 hidden md:block mb-4"></div>
            </div>
            
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <Card className="bg-[#1e1e1e99]/90 border-zinc-800">
              <CardContent className="p-6 relative z-20">
                <Star className="text-green-500 mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">
                  Top Artists Analysis
                </h3>
                <p className="text-zinc-200 text-sm">
                  Deeper than just rankings, we explore the genres and influences that shape your top picks.
                </p>
                <ChartNoAxesColumn size={150} strokeWidth={4} absoluteStrokeWidth:true className="text-zinc-500/95 absolute right-3 -bottom-3 -z-10 "/>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e99]/90 border-zinc-800">
              <CardContent className="p-6 relative z-20">
                <Activity className="text-green-500 mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">
                  Mood & Personality
                </h3>
                <p className="text-zinc-200 text-sm">
                  See how your tracks define your vibe through energy, acoustics, and emotional sentiment.
                </p>
                <Sparkles size={150} strokeWidth={2} absoluteStrokeWidth:true className="text-zinc-500/95 absolute right-3 -bottom-3 -z-10 "/>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e99]/90 border-zinc-800">
              <CardContent className="p-6 relative z-20">
                <Clock className="text-green-500 mb-4" />
                <h3 className=" text-white font-semibold text-lg mb-2">
                  Listening Behavior
                </h3>
                <p className="text-zinc-200 text-sm">
                  Get detailed stats on peak listening times and session consistency throughout the year.
                </p>
                <ChartNoAxesColumn size={150} strokeWidth={4} absoluteStrokeWidth:true className="text-zinc-500/95 absolute right-3 -bottom-3 -z-10 "/>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Main Highlight Section  */}
        <section className=" flex justify-center items-center w-full bg-[#1e1e1e99]/90 container mx-auto px-6 py-24">
          <div className="bg-[#1db954]/7 w-[80%] border border-green-900/40 rounded-2xl py-20 text-center">
            <h3 className="text-5xl font-bold mb-4">
              Ready to see your musical profile?
            </h3>
            <p className="text-zinc-400 text-xl mb-8 max-w-xl mx-auto">
              Join over 50,000 listeners who have uncovered their sonic identity with Rapify.
            </p>
            <Button
              onClick={handleConnect}
              className="bg-green-500 hover:bg-green-600 text-black px-8 py-6 rounded-full"
            >
              Connect with Spotify
            </Button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-auto border-t border-zinc-800">
          <div className="container mx-auto px-6 py-8 text-sm text-zinc-500 flex justify-between">
            <span>© 2026 Rapify</span>
            <span>Powered by Shri</span>
          </div>
        </footer>

      </div>
    );
  }

  return <Navigate to="/dashboard" />;
};

export default Login;
