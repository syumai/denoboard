import { app, get, post } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { PostsMemoryRepository } from './repositories/posts.ts';
import { Server } from './server.ts';

const postsRepo = new PostsMemoryRepository();
const server = new Server(postsRepo);

app(
  get('/', () => `<script>window.location = '/posts';</script>`),
  get('/posts', () => server.showPosts()),
  post('/posts', ({ params }) => server.createPost(params))
);
