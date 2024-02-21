const paths = {
  home() {
    return "/";
  },
  topicShowPath(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreatePath(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
  editPost(topicSlug: string, postId: string) {
    return `/topics/${topicSlug},posts/${postId}/edit`;
  },
};

export default paths;
