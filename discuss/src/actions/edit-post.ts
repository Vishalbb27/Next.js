"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import paths from "@/paths";
import { auth } from "@/auth";
import { Post } from "@prisma/client";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface EditPostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

async function editPost(
  id: string,
  slug: string,
  title: string,
  content: string,
  formState: EditPostFormState,
  formData: FormData
): Promise<EditPostFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.update({
      where: { id },
      data: {
        title: title,
        content: content,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post"],
        },
      };
    }
  }

  revalidatePath(paths.postShow(slug, id));
  redirect("/");
}

export { editPost };
