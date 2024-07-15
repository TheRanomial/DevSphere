import TagsList from "@/components/tagslist";
import { getRoom } from "@/data-access/Room";
import { splitTags } from "@/lib/utils";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { unstable_noStore } from "next/cache";
import { DevFinderVideo } from "./videoPlayer";


interface Params {
  RoomId: string;
}

export default async function Page({ params }: { params: Params }) {
  unstable_noStore();
  const { RoomId } = params;

  const room = await getRoom(RoomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
          <DevFinderVideo room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>

          {room.GitHubRepo && (
            <Link
              href={room.GitHubRepo}
              className="flex items-center gap-2 text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  );
}
