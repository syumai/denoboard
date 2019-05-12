import { Post } from '../domain/post.ts';
import { PostsRepository } from '../repositories/posts.ts';

const nameMax = 20;
const bodyMax = 100;

export class CreatePost {
  constructor(private repo: PostsRepository) {}

  invoke(name: string, body: string): Post {
    if (!name || name.length > nameMax) {
      // TODO: Add error msg
      throw 400;
    }
    if (!body || body.length > bodyMax) {
      // TODO: Add error msg
      throw 400;
    }
    return this.repo.createPost(name, body);
  }
}

export class GetPosts {
  constructor(private repo: PostsRepository) {}

  invoke(): Post[] {
    const posts: Post[] = [...this.repo.getPosts()];
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return posts;
  }
}
