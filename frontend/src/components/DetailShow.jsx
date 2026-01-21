import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"



const DetailShow = ({ data, titles, Click, callPage}) => {

    console.log('data : ', data)
    
    const [ offset, setOffset ] = useState(0) 

  return (
    <div>
         <Card>
                {/* <CardHeader>
                <CardTitle>{titles}</CardTitle>
                </CardHeader> */}

                <CardContent className={'relative'}>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data?.data?.items?.map((track) => (
                        <div key={track.id} className="flex flex-row gap-5 items-center">
                            <Avatar className="w-12 h-12">
                            <AvatarImage src={track?.album?.images?.[0]?.url} />
                            <AvatarFallback>
                                {track.name?.charAt(0)}
                            </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="mt-2 text-lg">{track?.name}</p>
                            </div>
                            
                        </div>
                        ))}
                    </div>

                    <div className="">
                        {
                            offset !== 0 && (
                                <Button className={'mt-8 '} onClick={() => {
                                    setOffset(offset-20);
                                    callPage(offset)
                                }}> 
                                    Privies 
                                </Button>
                            )
                        }

                        <Button className={'mt-8 mx-20 '} onClick={() => Click(false)} >
                            Close
                        </Button>

                        <Button className={'mt-8'} onClick={() => {
                             setOffset(offset+20);
                             callPage(offset)
                        }}>
                            Next
                        </Button>
                    </div>

                </CardContent>
            </Card>
    </div>
  )
}

export default DetailShow