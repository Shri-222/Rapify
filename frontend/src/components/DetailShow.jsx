import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"



const DetailShow = ({ songs, nextData, Click, callPage }) => {
  const [offset, setOffset] = useState(0);

  console.log("songs :", songs)

  const next = offset + 20;
  const prev = offset - 20;

  if (offset < 0) return null;

  return (
    <Card className="h-[95vh] flex flex-col">
      
      {/* HEADER (optional) */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Top Tracks</h2>
      </div>

      {/* SCROLLABLE CONTENT */}
      <CardContent className="flex-1 overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {songs.map((song) => (
            <div key={song.id} className="flex gap-5 items-center">
              <Avatar className="w-12 h-12">
                <AvatarImage src={song?.album?.images?.[0]?.url} />
                <AvatarImage src={song?.images?.[0]?.url} />
                <AvatarFallback>
                  {song.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <p className="text-lg">{song?.name}</p>
            </div>
          ))}
        </div>
      </CardContent>

      {/* FOOTER (always visible) */}
      <div className="p-4 border-t flex justify-between items-center">
        {offset !== 0 ? (
          <Button
            onClick={() => {
              setOffset(prev);
              callPage(prev);
            }}
          >
            Previous
          </Button>
        ) : <div />}

        <Button variant="destructive" onClick={() => Click(false)}>
          Close
        </Button>

        {nextData !== null ? (
          <Button
            onClick={() => {
              setOffset(next);
              callPage(next);
            }}
          >
            Next
          </Button>
        ) : <div />}
      </div>
    </Card>
  );
};


export default DetailShow