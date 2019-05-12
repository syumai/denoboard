import { Post } from '../domain/post.ts';
import { PostsRepository } from '../repositories/posts.ts';

export class CreatePost {
  constructor(private repo: PostsRepository) {}

  invoke(name: string, body: string): Post {
    return this.repo.createPost(name, body);
  }
}

export class GetPosts {
  constructor(private repo: PostsRepository) {}

  invoke(): Post[] {
    const posts: Post[] = [...this.repo.getPosts()];
    posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return posts;
  }
}
