import prisma from "@/db";
import { Room } from "../interfaces";
import { getSession } from "@/lib/auth";

export async function createRoom(formData: Room, userId: string) {
  try {
    const inserted = await prisma.room.create({
      data: {
        userId: userId,
        name: formData.name,
        description: formData.description,
        GitHubRepo: formData.GitHubRepo,
        tags: formData.tags,
      },
    });
    return inserted;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export async function getRoom(RoomId: string) {
  try {
    const searched = await prisma.room.findFirst({
      where: {
        RoomId: RoomId,
      },
    });
    return searched;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  try {
    const searched = await prisma.room.findMany({
      where: {
        userId: session?.user.id,
      },
    });
    return searched;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export async function updateRoom(formData: Room, RoomId: string) {
  const session = await getSession();

  const room = await getRoom(RoomId);
  const id = room?.RoomId as string;

  try {
    const updated = await prisma.room.update({
      where: {
        userId_RoomId: {
          userId: session?.user.id!,
          RoomId: id,
        },
      },
      data: formData,
    });
    return updated;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export async function getRooms(search: string) {
  try {
    const searched = await prisma.room.findMany({
      where: {
        name:search,
      },
      
    });
    return searched;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}
