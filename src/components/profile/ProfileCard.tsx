import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { User } from "@/types/user";

export function ProfileCard({ user }: { user: User }) {
  return (
    <div className="shadow-md bg-white rounded-xl">
      <div className="p-6 flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32 border-2 border-gray-300">
          {user.imageUrl ? (
            <AvatarImage src={user.imageUrl} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-gray-200 text-black text-3xl font-light">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="text-center space-y-2 w-full">
          <h2 className="text-xl font-bold text-black">{user.name}</h2>
          <p className="text-sm text-black/70">{user.email}</p>

          <Badge
            variant="outline"
            className="border-gray-300 bg-gray-100 text-black font-medium"
          >
            <Shield className="h-3 w-3 mr-1" strokeWidth={1.5} />
            {user.role}
          </Badge>
        </div>

        <Separator className="bg-gray-300" />
      </div>
    </div>
  );
}
