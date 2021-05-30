import {render} from '@testing-library/react';
import ReactDOM from 'react-dom';
import { CodeEditor } from './components/code-editor';
 
// it('should take a snapshot', () => {
//    const { asFragment } = render(<CodeEditor />)
    
//    expect(asFragment(<CodeEditor />)).toMatchSnapshot()
//    });

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<CodeEditor />, div);
   ReactDOM.unmountComponentAtNode(div);
})