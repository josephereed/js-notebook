import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);
  return (
    <iframe
      title="js-playpen"
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts"
      width="300"
      height="300"
    />
  );
};

export default Preview;
