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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TagsList from "@/components/tagslist";
import { splitTags } from "@/lib/utils";
import { deleteRoomAction } from "../your-rooms/actions";

export default function Roomcard({ room }: { room: OriginalRoom }) {
  return (
    <Card>
      <CardHeader className="relative">
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
      </CardFooter>
    </Card>
  );
}
