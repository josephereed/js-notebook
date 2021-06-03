import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

const bundle = async (code: string): Promise<{ code: string; err: string }> => {
  // initialize esbuild
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'http:///unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  // run bundle
  try {
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
    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err) {
    return {
      code: '',
      err: err.message,
    };
  }
};

export default bundle;
