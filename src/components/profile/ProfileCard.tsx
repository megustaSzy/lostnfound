import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, CheckCircle, Camera } from "lucide-react";
import { User } from "@/types/user";

interface Props {
  user: User;
  onAvatarChange?: (file: File) => void;
}

export function ProfileCard({ user, onAvatarChange }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="shadow-md bg-white rounded-xl">
      <div className="p-6 flex flex-col items-center space-y-4">
        {/* Avatar clickable */}
        <label className="relative cursor-pointer group">
          <Avatar className="h-32 w-32 border-2 border-gray-300">
            {user.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-gray-200 text-black text-3xl font-light">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          {/* overlay */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <Camera className="h-6 w-6 text-white" />
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>

        {/* Info */}
        <div className="text-center space-y-2 w-full">
          <h2 className="text-xl font-bold text-black">{user.name}</h2>
          <p className="text-sm text-black/70">{user.email}</p>

          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="bg-green-100 border-green-300">
              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
              Active
            </Badge>

            <Badge variant="outline" className="bg-gray-100 border-gray-300">
              2025
            </Badge>
          </div>

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
