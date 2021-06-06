import { useRef, useEffect } from 'react';
import './preview.css';
import ActionBar from './action-bar';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface PreviewProps {
  code: string;
  error: string;
  id: string;
}

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/javascript">
        const handleError = (err) => {
          document.body.style.color = 'red';
          document.getElementById('root').innerHTML = "<div><h4>Runtime Error</h4>" + err + "</div>";
          throw(err);
        }

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        })

        window.addEventListener('message', (event) => {
          try {
            document.getElementById('root').innerHTML = '';
            eval(event.data);
          } catch(err) {
            handleError(err);
          }
        }, false)
      </script>
    </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error, id }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    let timer: any;
    iframe.current.srcdoc = html;
    timer = setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [code]);
  return (
    <div className="preview-wrapper">
      <ActionBar id={id} />
      <iframe
        title="js-playpen"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
