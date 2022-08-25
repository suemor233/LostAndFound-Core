import { register } from './global/index.global';

async function main() {
  register()
  const [{ bootstrap }] = await Promise.all([
    import('./bootstrap'),
    import('./app.config'),
  ])
  bootstrap()
}
main();
