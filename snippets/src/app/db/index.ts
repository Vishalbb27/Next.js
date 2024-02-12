import { PrismaClient } from "@prisma/client";
import exp from "constants";

export const db = new PrismaClient();
