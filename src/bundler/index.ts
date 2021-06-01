import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

const bundle = async (code: string): Promise<string> => {
  // initialize esbuild
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'http:///unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  // run bundle
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(code)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  // send back result

  return result.outputFiles[0].text;
};

export default bundle;