import { Input } from "@/components/ui/input";

// import { Button } from '@/components/ui/button'
import { Search } from "lucide-react";
import Button from "../button/Button";

export function SecondaryNavbar() {
  return (
    <div className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          <div className="flex-1 min-w-0">
            <div className="relative rounded-md shadow-sm">
              <Input
                type="text"
                placeholder="Search for mentors..."
                className="pl-10 pr-4 py-2 w-full"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="ml-4">
            <Button variant="Blue" text="Search"/>
          </div>
        </div>
      </div>
    </div>
  );
}
