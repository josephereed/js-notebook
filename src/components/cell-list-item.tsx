import React from 'react';
import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';
import './cell-list-item.css';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  child =
    cell.type === 'text' ? (
      <TextEditor cell={cell}></TextEditor>
    ) : (
      <CodeCell cell={cell}></CodeCell>
    );

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
