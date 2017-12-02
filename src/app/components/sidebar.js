import React from 'react';
import PropTypes from 'prop-types';
import { Link, Spacing } from 'react-elemental';
import {
  OP_CREATE,
  OP_DELETE,
  OP_MKDIR,
  OP_READ,
  OP_RENAME,
  OP_APPEND,
  OP_LISTSTATUS,
} from 'app/util/operations';

const OP_TEXT = {
  [OP_CREATE]: 'Create a file',
  [OP_DELETE]: 'Delete a file',
  [OP_MKDIR]: 'Make a directory',
  [OP_READ]: 'Read a file',
  [OP_RENAME]: 'Rename a file',
  [OP_APPEND]: 'Append to a file',
  [OP_LISTSTATUS]: 'List directory contents',
};

const Sidebar = ({ selectedOp, setSelectedOp }) => (
  <div style={{ backgroundColor: '#FAFAFA' }}>
    <Spacing left right top bottom padding>
      {Object.keys(OP_TEXT).map((op) => (
        <Spacing key={op} size="small" bottom>
          <Link
            onClick={() => setSelectedOp(op)}
            underline={op === selectedOp}
            plain={op !== selectedOp}
          >
            {OP_TEXT[op]}
          </Link>
        </Spacing>
      ))}
    </Spacing>
  </div>
);

Sidebar.propTypes = {
  selectedOp: PropTypes.string,
  setSelectedOp: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  selectedOp: null,
};

export default Sidebar;
