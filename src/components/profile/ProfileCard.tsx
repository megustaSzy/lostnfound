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
    <div className="shadow-sm bg-white rounded-xl border">
      <div className="p-6 flex flex-col items-center space-y-4">
        <label className="relative cursor-pointer group">
          <Avatar className="h-32 w-32 border-2 border-blue-200">
            {user.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-blue-100 text-blue-700 text-3xl font-light">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="absolute inset-0 rounded-full bg-blue-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <Camera className="h-6 w-6 text-white" />
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>

        <h2 className="text-xl font-bold text-slate-900 text-center">
          {user.name}
        </h2>

        <p className="text-sm text-slate-600 text-center">{user.email}</p>

        <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>

        <Badge
          variant="outline"
          className="border-blue-300 bg-blue-50 text-blue-700"
        >
          2025
        </Badge>

        <Badge
          variant="outline"
          className="border-slate-300 bg-slate-50 text-slate-700 font-medium"
        >
          <Shield className="h-3 w-3 mr-1" strokeWidth={1.5} />
          {user.role}
        </Badge>

        <Separator className="bg-slate-200 w-full" />
      </div>
    </div>
  );
}
