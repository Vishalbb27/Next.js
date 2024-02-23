"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import * as actions from "@/actions";
import FormButton from "../common/form-button";
import { Post } from "@prisma/client";
import { ChangeEvent, SetStateAction, useState } from "react";

interface PostCreateFormProps {
  slug: string;
  postId: string;
  post: Post;
}

export default function PostEditForm({
  postId,
  slug,
  post,
}: PostCreateFormProps) {

  const [posts, setPosts] = useState(post);

  const handlePostChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPosts((prevState) => ({ ...prevState, [name]: value }));
  };

  const [formState, action] = useFormState(
    actions.editPost.bind(null, postId, slug, posts.title, posts.content),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" className="mr-2">
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Edit a post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              value={posts.title}
              isInvalid={!!formState.errors.title}
              onChange={(e) => handlePostChange(e)}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              defaultValue={posts.content}
              onChange={(e) => handlePostChange(e)}
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton>Update</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
