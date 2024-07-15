// types.ts
import { Prisma, PrismaClient} from "@prisma/client";

export type Room = PrismaClient['room'];
export type User = PrismaClient['user'];
