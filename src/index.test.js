import {render} from '@testing-library/react'
import { CodeEditor } from './components/code-editor';
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<CodeEditor />)
    
    expect(asFragment(<CodeEditor />)).toMatchSnapshot()
   });
