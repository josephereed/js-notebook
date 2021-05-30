import ReactDOM from 'react-dom';

import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

export const App = () => {
  const ref = useRef<null | esbuild.Service>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');
  // const [code, setCode] = useState('');

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
            document.getElementById('root').innerHTML = '';
            eval(event.data);
          } catch(err) {
            document.body.style.color = 'red';
            document.getElementById('root').innerHTML = "<div><h4>Runtime Error</h4>" + err + "</div>";
            throw(err);
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

    iframe.current.srcdoc = html;

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
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea
        cols={30}
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* <pre>{code}</pre> */}
      <iframe
        title="js-playpen"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        width="300"
        height="300"
      ></iframe>
    </div>
  );
};



ReactDOM.render(<App />, document.getElementById('root'));
