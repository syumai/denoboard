import { PostsRepository } from './repositories/posts.ts';
import { GetPosts, CreatePost } from './usecases/posts.ts';
import { renderFile } from 'https://deno.land/x/dejs@0.2.2/dejs.ts';
import { Response } from 'https://denopkg.com/syumai/dinatra@0.5.1/response.ts';
import { Params } from 'https://denopkg.com/syumai/dinatra@0.5.1/params.ts';

export class Server {
  constructor(private postsRepo: PostsRepository) {}

  async showPosts(): Promise<Response> {
    const getPosts = new GetPosts(this.postsRepo);
    const posts = getPosts.invoke();
    return await renderFile('./views/showPosts.ejs', {
      name: '',
      posts,
    });
  }

  async createPost({ name, body }: Params): Promise<Response> {
    const createPost = new CreatePost(this.postsRepo);
    createPost.invoke(name, body);
    const getPosts = new GetPosts(this.postsRepo);
    const posts = getPosts.invoke();
    return [
      201,
      await renderFile('./views/showPosts.ejs', {
        name,
        posts,
      }),
    ];
  }
}
