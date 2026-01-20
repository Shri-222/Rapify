
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "./ui/button"
import { LogOut } from 'lucide-react'
import { AvatarImage } from "./ui/avatar"

const TopBar = ({title, image}) => {
  return (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>

          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={image}/>
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <Button variant="outline" size="lg">
              <LogOut className="w-4 h-4 mr-2 text-white" /> <span className="text-white">Logout</span>
            </Button>
          </div>
        </div>
  )
}

export default TopBar