"use server";

import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Room } from "@/interfaces";
import { updateRoom } from "@/data-access/Room";
import { redirect } from "next/navigation";

export async function UpdateRoomAction(roomData: Room, RoomId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const userId = session.user.id;
  const room = await updateRoom(roomData, RoomId);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${RoomId}`);
  redirect("/your-rooms");

}
