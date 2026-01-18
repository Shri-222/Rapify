import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart3, User, Settings, LogOut } from "lucide-react";
import useAuth from "@/auth/useAuth";

export default function Dashboard() {

  const { user } = useAuth()
  console.log('user : ', user)

  return (
    <div className=" w-[90%] bg-gray-400 p-4 mx-auto">
      <div className="max-w-[98%] mx-auto">

          {/* top rap  */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{user.display_name[0]}</AvatarFallback>
            </Avatar>

            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* middle rapper  */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className={'w-40 h-40'}>
                  <AvatarFallback> {user.images} </AvatarFallback>
                </Avatar> 
                
                <CardContent className={'flex flex-col items-start'}>
                    <h2 className=" text-4xl uppercase mb-8">{user.display_name}</h2>
                    <p className=" text-[20px] mb-4"> Email : <span className="text-[16px]"> {user.email} </span></p>
                    <p className="text-[20px]">
                      Plan : <span className="text-[16px]"> {user.product} </span>
                    </p>
                </CardContent>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                View your Spotify statistics and activity
              </p>
              <Button className="mt-4 w-full">Open Analytics</Button>
            </CardContent>
          </Card>

        </div>

        <div className="mt-6">
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
  );
}
