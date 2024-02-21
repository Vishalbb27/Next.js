"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";
import path from "path";

export async function deletePost(id: string) {
  console.log(id);
  await db.post.delete({
    where: { id },
  });

  revalidatePath(paths.home());
  redirect(paths.home());
}
