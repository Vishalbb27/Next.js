import { db } from "@/db";
import { notFound } from "next/navigation";
import { Button } from "@nextui-org/react";
import { auth } from "@/auth";
import PostEditForm from "./post-edit-form";
import * as actions from "@/actions";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const post = await db.post.findFirst({
    where: { id: postId },
  });

  const session = await auth();

  const displayEdit = await db.post.findFirst({
    where: {
      user: session?.user,
    },
  });

  if (!post) {
    notFound();
  }

  const deleteSnippetAction = actions.deletePost.bind(null, postId);
  return (
    <div className="">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <div className="flex justify-between p-4  border rounded">
        <div className="mt-2">
          <p className="align-middle">{post.content}</p>
        </div>

        {session?.user && displayEdit && (
          <div className="justify-between flex-col">
            <PostEditForm postId={postId} slug={post.title} />
            <form action={deleteSnippetAction}>
              <Button type="submit" className="bg-red-700">
                Delete
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
