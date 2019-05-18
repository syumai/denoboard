import { Post } from '../domain/post.ts';
import { PostsRepository } from '../repositories/posts.ts';

const nameMax = 20;
const bodyMax = 100;

const minutesLimit = 30;
const postsLimit = 50;

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
    return this.repo.createPost(name, body, postsLimit);
  }
}

export class GetPosts {
  constructor(private repo: PostsRepository) {}

  invoke(): Post[] {
    const posts: Post[] = [...this.repo.getPosts(minutesLimit)];
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return posts;
  }
}
