import { app, get, post } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { PostsRepository } from './repositories/posts.ts';
import { Server } from './server.ts';
import { Response } from 'https://denopkg.com/syumai/dinatra/response.ts';

const postsRepo = new PostsRepository();
const server = new Server(postsRepo);

app(
  get('/', () => `<script>window.location = '/posts';</script>`),
  get(
    '/posts',
    async (): Promise<Response> => {
      let res: Response;
      try {
        res = await server.showPosts();
      } catch (err) {
        console.log(err);
        return 'error';
      }
      return res;
    }
  ),
  post('/posts', ({ params }) => {
    console.log(params);
    return server.createPost({
      name: `${params.name}`,
      body: `${params.body}`,
    });
  })
);
