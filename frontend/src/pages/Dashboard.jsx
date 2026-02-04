import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/auth/useAuth";
import TopBar from "@/components/TopBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ShowTracks from "@/components/ShowTracks";
import DetailShow from "@/components/DetailShow";
import apiClient from "@/api/apiClient";
import { SpinnerButton } from "@/components/SpinnerButton";
import MDEditor from "@uiw/react-md-editor";


export default function Dashboard() {

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
      setNewArtists(artists.data.items)
    }

    if (tracks) {
      setNewTracks(tracks.data.items)
    }
  }, [tracks, artists]);

    const callTracksPagination = async( offset ) => {
      try {
        
        const res = await apiClient.get('/spotify/top-tracks', {
                                                                  params: {
                                                                    limit : 20,
                                                                    offset : offset
                                                                  }
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
                                                                  params: {
                                                                    limit : 20,
                                                                    offset : offset
                                                                  }
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


  return (
    <div className="w-[98%] mx-auto relative">

        {
          loading && (
            <div onClick={() => setOpen(false)} className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40" >
                <SpinnerButton/>
              </div>
          )
        }

        {
          showAnalysis && analysis && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            >
              <div
                onClick={() => {
                  setShowAnalysis(false);
                  setAnalysis("");
                }}
                className="
                  w-full max-w-4xl
                  max-h-[90vh]
                  bg-white
                  rounded-2xl
                  px-6 py-6
                  overflow-y-auto
                  no-scrollbar
                "
              >
                <MDEditor.Markdown
                  source={analysis}
                  className="prose prose-lg max-w-none"
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
            </div>
          )
        }

        {
          type === 'critical' && open && (
            <div onClick={() => setOpen(false)} className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40" >
              <div className="w-full max-w-xl px-4 h-40 rounded-4xl bg-white flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl font-bold mb-2">
                  Do you really want to do This?...
                </p>
                <div className="flex gap-4">
                  <Button variant="destructive" 
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            await handleAnalyze();
                            setLoading(false);
                            setOpen(false);
                          }}
                  >
                    Continue
                  </Button>

                  <Button variant="secondary" onClick={() => setOpen(false)} className={'text-white'}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )
        }

        {
          viewTracks && (
            <div onClick={() => setOpen(false)} className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-full max-w-4xl px-4">
                <DetailShow songs={newTracks} titles={'Top-Tracks'} Click={setViewTracks} callPage={callTracksPagination} nextData={next}/>
              </div>
            </div>
          )
        }

        {
          viewArtists && (
            <div onClick={() => setOpen(false)} className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-full max-w-4xl px-4">
                <DetailShow songs={newArtists} titles={'Top-Artists'} Click={setViewArtists} callPage={callArtistsPagination} nextData={next}/>
              </div>
            </div>
          )
        }


      <TopBar title='Dashboard' image={user.images}/>
  
    <div className=" w-full bg-gray-400 p-4 mx-auto">
      <div className="max-w-[98%] mx-auto">
        
        {/* middle rapper  */}
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className={'w-40 h-40'}>
                    <AvatarImage src={user.images?.[0]?.url} />
                    <AvatarFallback>{user.display_name?.charAt(0)}</AvatarFallback>
                </Avatar> 
                
                <CardContent className={'flex flex-col items-start'}>
                    <h2 className=" text-4xl uppercase mb-8">{user.display_name}</h2>
                    <p className=" text-[18px] mb-4"> 
                      Email : <span className="text-[15px]"> {user.email} </span>
                    </p>
                    <p className="text-[18px]">
                      Plan : <span className="text-[16px]"> {user.product} </span>
                    </p>
                </CardContent>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                Want to Know what Songs tell about YOU 
              </CardTitle>
            </CardHeader>
            <CardContent>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={'text-white'}>Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                    <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="critical">Critical</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="mt-6 w-full " disabled={loading} 
                      onClick={() => {
                          type === 'critical' ? (
                              setAnalysis(""),
                              setOpen(true),
                              setShowAnalysis(false)
                            )
                             : 
                            (loading ? 
                                    <SpinnerButton/> 
                                    : 
                                    (
                                      setAnalysis(""),
                                      handleAnalyze()
                                    )
                            )
                      }
              }>
                Tell Me
              </Button>
            </CardContent>
          </Card>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <ShowTracks artists={ newArtists } Click={setViewArtists}/>

          <div>
            <Card>
                <CardHeader>
                <CardTitle>Top Tracks</CardTitle>
                </CardHeader>

                <CardContent className={'relative'}>
                    <div className="grid md:grid-cols-2 gap-4">
                        {newTracks.slice(0, 7).map((track) => (
                        <div key={track.id} className="flex flex-row gap-5 items-center">
                            <Avatar className="w-12 h-12">
                            <AvatarImage src={track?.album?.images?.[0]?.url} />
                            <AvatarFallback>
                                {track.name?.charAt(0)}
                            </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="mt-2 text-lg w-24 overflow-hidden text-ellipsis whitespace-nowrap">{track?.name}</p>
                            </div>
                            
                        </div>
                        ))}
                    </div>

                    <Button className={'mt-5 absolute right-28 bottom-1'} onClick={ () => setViewTracks(true) }>
                        View More
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
      </div>
  );
}
