import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <header className="relative bg-white border-b border-gray-200 shadow-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            XYZ Lost & Found
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-10 w-full sm:w-auto px-5 font-medium"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="h-10 w-full sm:w-auto px-5 font-bold">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
