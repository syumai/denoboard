import { Post } from "../domain/post.ts";
import { v4 } from "../../vendor/https/deno.land/std/uuid/mod.ts";

export type PostsRepository = {
  getPosts(minutesLimit: number): Post[];
  createPost(name: string, body: string, postsLimit: number): Post;
};

export class PostsMemoryRepository {
  store: {
    posts: Post[];
  } = {
    posts: [],
  };

  getPosts(minutesLimit: number): Post[] {
    const filterDate = new Date();
    filterDate.setMinutes(new Date().getMinutes() - minutesLimit);
    this.store.posts = this.store.posts.filter(
      (post) => filterDate.getTime() < post.createdAt.getTime(),
    );
    return [...this.store.posts];
  }

  createPost(name: string, body: string, postsLimit: number): Post {
    const post: Post = {
      id: v4.generate(),
      name,
      body,
      createdAt: new Date(),
    };
    this.store.posts.push(post);
    if (this.store.posts.length > postsLimit) {
      this.store.posts = this.store.posts.slice(
        this.store.posts.length - postsLimit,
      );
    }
    return post;
  }
}
