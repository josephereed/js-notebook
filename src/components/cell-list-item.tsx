import React from 'react';
import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return <div>{cell.type === 'text' ? <TextEditor /> : <CodeCell />}</div>;
};

export default CellListItem;
