import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="js-playpen"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
