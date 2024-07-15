"use client";
import { OriginalRoom } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TagsList from "@/components/tagslist";
import { Button } from "@/components/ui/button";
import { deleteRoomAction } from "./actions";
import Link from "next/link";
import { splitTags } from "@/lib/utils";

export default function UserRoomCard({ room }: { room: OriginalRoom }) {
  return (
    <Card>
      <CardHeader className="relative">
        <Button className="absolute top-2 w-10 mt-4 right-2" size="icon">
          <Link href={`/edit-room/${room.RoomId}`}>
            <PencilIcon />
          </Link>
        </Button>

        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="mb-3">
          <TagsList tags={splitTags(room.tags)} />
        </div>
        {room.GitHubRepo && (
          <Link
            href={room.GitHubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button asChild className="bg-green-400">
          <Link href={`/rooms/${room.RoomId}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.RoomId);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
