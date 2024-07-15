"use server";

import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {Room} from "../../interfaces";
import { createRoom } from "@/data-access/Room";

export async function createRoomAction(roomData: Room) {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const userId = session.user.id;


  const room = await createRoom(roomData, userId);
  

  revalidatePath("/browse");

  return room;
}

