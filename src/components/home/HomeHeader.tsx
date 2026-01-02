import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <header className="relative bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600">
            XYZ Lost & Found
          </h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="h-9 px-4 border-blue-600 text-blue-600 hover:bg-blue-50 text-sm sm:text-base"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="h-9 px-4 sm:h-10 sm:px-5 font-bold bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
