import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { SpinnerButton } from "@/components/SpinnerButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Activity, Clock } from "lucide-react";

const Login = () => {
  const { user, isLoading } = useContext(AuthContext);

  const handleConnect = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
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
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white flex flex-col">

        {/* NavaBar  */}
        <header className="border-b border-zinc-800">
          <div className="container mx-auto flex justify-between items-center px-6 py-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full" />
              <span className="font-semibold text-lg">Rapify</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                Log in
              </Button>

              <Button
                onClick={handleConnect}
                className="bg-green-500 hover:bg-green-600 text-black rounded-full px-6"
              >
                Connect
              </Button>
            </div>
          </div>
        </header>

        {/* HERO Section */}
        <section className="container mx-auto flex flex-col items-center text-center px-6 py-24 relative">

          {/* Glow background */}
          <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full top-20 -z-10" />

          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-6 tracking-widest">
            POWERED BY Shri
          </Badge>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">
            Discover What Your Music{" "}
            <span className="text-green-500">Says About You</span>
          </h1>

          <p className="text-zinc-400 mt-6 max-w-2xl text-lg">
            Our AI analyzes your Spotify data to reveal the patterns,
            moods, and personality traits hidden in your listening history.
          </p>

          <div className="flex gap-4 mt-10">
            <Button
              onClick={handleConnect}
              className="bg-green-500 hover:bg-green-600 text-black px-8 py-6 rounded-full text-base"
            >
              Connect with Spotify →
            </Button>

            <Button
              variant="outline"
              className="px-8 py-6 rounded-full text-base border-zinc-700 hover:bg-zinc-900"
            >
              View Sample
            </Button>
          </div>
        </section>

        {/* Middle Section  */}
        <section className="container mx-auto px-6 py-20">

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Deep Insights Into Your Sound
            </h2>
            <p className="text-zinc-400 max-w-xl">
              Go beyond the playlist and understand the DNA of your musical taste with our proprietary neural networks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <Card className="bg-zinc-900/60 border-zinc-800">
              <CardContent className="p-6">
                <Star className="text-green-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Top Artists Analysis
                </h3>
                <p className="text-zinc-400 text-sm">
                  Deeper than just rankings, we explore the genres and influences that shape your top picks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/60 border-zinc-800">
              <CardContent className="p-6">
                <Activity className="text-green-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Mood & Personality
                </h3>
                <p className="text-zinc-400 text-sm">
                  See how your tracks define your vibe through energy, acoustics, and emotional sentiment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/60 border-zinc-800">
              <CardContent className="p-6">
                <Clock className="text-green-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Listening Behavior
                </h3>
                <p className="text-zinc-400 text-sm">
                  Get detailed stats on peak listening times and session consistency throughout the year.
                </p>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Main Highlight Section  */}
        <section className="container mx-auto px-6 pb-20">
          <div className="bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-900 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to see your musical profile?
            </h3>
            <p className="text-zinc-400 mb-8">
              Join thousands of listeners uncovering their sonic identity.
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
