import { PostsRepository } from './repositories/posts.ts';
import { GetPosts, CreatePost } from './usecases/posts.ts';
import { renderFile } from 'https://deno.land/x/dejs@0.2.0/dejs.ts';
import { contentType } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { Response } from 'https://denopkg.com/syumai/dinatra/response.ts';

export class Server {
  constructor(private postsRepo: PostsRepository) {}

  async showPosts(): Promise<Response> {
    const getPosts = new GetPosts(this.postsRepo);
    const posts = getPosts.invoke();
    return await renderFile('./views/showPosts.ejs', {
      posts,
    });
  }

  createPost({ name, body }: { name: string; body: string }): Response {
    const createPost = new CreatePost(this.postsRepo);
    const post = createPost.invoke(name, body);
    return [201, contentType('json'), JSON.stringify(post)];
  }
}
