import { getRoom } from "@/data-access/Room";
import { unstable_noStore } from "next/cache";
import EditRoomForm from "./edit-room-form";

interface Params {
  RoomId: string;
}

export default async function Page({ params }: { params: Params }) {
  unstable_noStore();
  const { RoomId } = params;
  const room = await getRoom(RoomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>

      <EditRoomForm room={room} />
    </div>
  );
}
