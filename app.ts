import { app, get, post } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { PostsMemoryRepository } from './repositories/posts.ts';
import { Server } from './server.ts';
import { Response } from 'https://denopkg.com/syumai/dinatra/response.ts';

const postsRepo = new PostsMemoryRepository();
const server = new Server(postsRepo);

app(
  get('/', () => `<script>window.location = '/posts';</script>`),
  get('/posts', () => server.showPosts()),
  post('/posts', ({ params }) => {
    console.log(params);
    return server.createPost({
      name: `${params.name}`,
      body: `${params.body}`,
    });
  })
);
