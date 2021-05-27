import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path[0] === '.') {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };

      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
          import React from 'react';
          console.log('react')
          `,
          };
        }
        // Check to see if we already fetched this file
        const cachedResponse = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // and if it already is in the cache
        // if it is return it immediately
        if (cachedResponse) {
          return cachedResponse;
        }

        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('.', request.responseURL).pathname,
        };

        // store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
