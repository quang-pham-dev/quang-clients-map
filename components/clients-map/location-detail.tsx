import Link from "next/link";
import { X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cluster } from "@/interfaces/cluster";
interface LocationDetailProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedCluster: Cluster | null;
}

export default function LocationDetail({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedCluster
}: LocationDetailProps) {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader className="border-b border-gray-200 flex items-center justify-center">
          <DrawerTitle className="text-2xl font-bold">
            {selectedCluster?.country}
          </DrawerTitle>
          <DrawerClose asChild className="absolute right-4 top-4">
            <Button variant="ghost" size="icon">
              <X className="h-8 w-8" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <ScrollArea className="h-[30vh] p-4">
          <div className="space-y-2">
            {selectedCluster?.cities.map((city, index) => (
              <Link
                href={`https://${city.label}`}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg text-gray-600 hover:text-gray-900 hover:underline"
              >
                {city.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
