import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<null | esbuild.Service>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'http:///unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script type="text/javascript">
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch(err) {
            alert(err)
          }
        }, false)
      </script>
    </body>
  </html>
  `;

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    //setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };
  return (
    <div>
      <textarea
        cols={30}
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        width="300"
        height="300"
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
