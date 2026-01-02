import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <header className="relative bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600">
            Lost & Found
          </h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-5">
            <Link href="/login">
              <Button
                variant="outline"
                className="h-8 min-w-[96px] px-5 text-sm sm:text-base
                           border-blue-600 text-blue-600 hover:bg-blue-50
                           font-semibold"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                className="h-8 min-w-[96px] px-5 text-sm sm:text-base
                           font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
