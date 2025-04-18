import { useState } from "react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Filter, Search } from "lucide-react";
import AddAnimalModal from "./add-animal-modal";
import { AnimalRecord } from "@/lib/types";

export default function Navbar({
  onAddAnimal,
}: {
  onAddAnimal: (data: AnimalRecord) => void;
}) {
  const [filterOptions, setFilterOptions] = useState({
    active: false,
    completed: false,
    pending: false,
  });

  return (
    <div className="w-full my-9">
      <div className="w-full max-w-5xl mx-auto flex h-26 items-center justify-around">
        <h1 className="text-4xl font-bold mr-auto">Desktop App</h1>

        {/* Searchbar */}
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search records..."
              className="w-full pl-8"
            />
          </div>

          {/* Filter dropdown menu  */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter records</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 p-2 border border-gray-200 rounded-xl mt-2 bg-white cursor-pointer"
            >
              <DropdownMenuCheckboxItem
                className="px-3 py-2 rounded-lg hover:bg-gray-100 border-0 outline-0"
                checked={filterOptions.active}
                onCheckedChange={(checked) =>
                  setFilterOptions({ ...filterOptions, active: checked })
                }
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="px-3 py-2 rounded-lg hover:bg-gray-100 border-0 outline-0"
                checked={filterOptions.completed}
                onCheckedChange={(checked) =>
                  setFilterOptions({ ...filterOptions, completed: checked })
                }
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="px-3 py-2 rounded-lg hover:bg-gray-100 border-0 outline-0"
                checked={filterOptions.pending}
                onCheckedChange={(checked) =>
                  setFilterOptions({ ...filterOptions, pending: checked })
                }
              >
                Pending
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add New Record Modal */}
          <AddAnimalModal onAddAnimal={onAddAnimal} />
        </div>
      </div>
    </div>
  );
}
