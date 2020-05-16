import { PostsRepository } from "./repositories/posts.ts";
import { GetPosts, CreatePost } from "./usecases/posts.ts";
import { renderFile } from "../vendor/https/deno.land/x/dejs/mod.ts";
import { Response } from "../vendor/https/denopkg.com/syumai/dinatra/response.ts";
import { Params } from "../vendor/https/denopkg.com/syumai/dinatra/params.ts";

export class Server {
  constructor(private postsRepo: PostsRepository) {}

  async showPosts(): Promise<Response> {
    const getPosts = new GetPosts(this.postsRepo);
    const posts = getPosts.invoke();
    return await renderFile("./views/showPosts.ejs", {
      name: "",
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
      await renderFile("./views/showPosts.ejs", {
        name,
        posts,
      }),
    ];
  }
}
