module.exports = {
  name: 'my-microfrontend',
  exposes: {
    './Module': 'apps/my-microfrontend/src/app/remote-entry/entry.module.ts',
  },
};
