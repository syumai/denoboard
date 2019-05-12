import { Post } from '../domain/post.ts';
import { uuid } from 'https://deno.land/x/uuid/mod.ts';

const maxMinutes = 3;
const maxPosts = 50;

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
    const filterDate = new Date();
    filterDate.setMinutes(new Date().getMinutes() - maxMinutes);
    this.store.posts = this.store.posts.filter(
      post => filterDate.getTime() < post.createdAt.getTime()
    );
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
    if (this.store.posts.length > maxPosts) {
      this.store.posts = this.store.posts.slice(
        this.store.posts.length - maxPosts
      );
    }
    return post;
  }
}
