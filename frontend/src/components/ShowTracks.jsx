import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"



const ShowTracks = ( { artists, Click } ) => {

  return (
        <div>
            <Card>
                <CardHeader>
                <CardTitle>Top Artists</CardTitle>
                </CardHeader>

                <CardContent className={'relative'}>
                    <div className="grid md:grid-cols-2 gap-4">
                        {artists.slice(0, 7).map((artist) => (
                        <div key={artist.id} className="flex flex-row gap-5 items-center">
                            <Avatar className="w-12 h-12">
                            <AvatarImage src={artist.images?.[0]?.url} />
                            <AvatarFallback>
                                {artist.name?.charAt(0)}
                            </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="mt-2 text-lg">{artist.name}</p>
                            </div>
                            
                        </div>
                        ))}
                    </div>

                    <Button className={'mt-5 absolute right-28 bottom-1'} onClick={ () => Click(true)}>
                        View More
                    </Button>
                </CardContent>
            </Card>
        </div>
  )
}

export default ShowTracks