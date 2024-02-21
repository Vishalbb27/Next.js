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

interface ButtonEnable {
  setButtonEdit: {
    buttonEnable?: boolean;
  };
}

async function editPost(
  id: string,
  slug: string,
  formState: EditPostFormState,
  formData: FormData
): Promise<EditPostFormState> {
  const result = createPostSchema.safeParse({
    name: formData.get("name"), // 'name' is the name property passed from the form data which is described in the input field
    description: formData.get("description"),
  });

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }
  let post: Post;
  try {
    post = await db.post.update({
      where: { id },
      data: {
        title: result.data.title,
        content: result.data.content,
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

// async function editButtonDisplay(postId:string):<ButtonEnable> {
//     const session = await auth();
//   if (!session || !session.user) {
//     return {
//       setB
//     };
//   }
// }

export { editPost };
