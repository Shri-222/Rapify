import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart3, User, Settings, LogOut } from "lucide-react";
import useAuth from "@/auth/useAuth";
import TopBar from "@/components/topBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {

  const { user } = useAuth()
  const [ type, setType ] = useState('normal') 

  return (
    <div className="w-[98%] mx-auto">
      <TopBar title='Dashboard' image={user.images}/>
  
    <div className=" w-full bg-gray-400 p-4 mx-auto">
      <div className="max-w-[98%] mx-auto">
        
        {/* middle rapper  */}
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className={'w-40 h-40'}>
                  <AvatarFallback> {user.images} </AvatarFallback>
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

              <Button className="mt-6 w-full ">Tell Me</Button>
            </CardContent>
          </Card>

        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="p-2 bg-gray-100 rounded">Logged in successfully</li>
                <li className="p-2 bg-gray-100 rounded">Fetched Spotify data</li>
                <li className="p-2 bg-gray-100 rounded">Updated profile</li>
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
      </div>
  );
}
