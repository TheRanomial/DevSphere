import prisma from "@/db";

export async function deleteUser(userId: string) {
  try {
    const deleted = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}
