import { Post } from '../domain/post.ts';
import { uuid } from 'https://deno.land/x/uuid/mod.ts';

export type PostsRepository = {
  getPosts(): Post[];
  createPost(name: string, body: string): Post;
};

export class PostsMemoryRepository {
  store: {
    posts: Post[];
  } = {
    posts: [],
  };

  getPosts(): Post[] {
    return [...this.store.posts];
  }

  createPost(name: string, body: string): Post {
    const post = {
      id: uuid(),
      name,
      body,
      createdAt: new Date(),
    };
    this.store.posts.push(post);
    return post;
  }
}