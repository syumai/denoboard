import {
  app,
  get,
  post,
} from 'https://denopkg.com/syumai/dinatra@0.5.1/mod.ts';
import { PostsMemoryRepository } from './src/repositories/posts.ts';
import { Server } from './src/server.ts';

const postsRepo = new PostsMemoryRepository();
const server = new Server(postsRepo);

app(
  get('/', () => `<script>window.location = '/posts';</script>`),
  get('/posts', () => server.showPosts()),
  post('/posts', ({ params }) => server.createPost(params))
);
