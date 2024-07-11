import React from 'react';
import { FormattedMessage } from 'react-intl';

function MainSidebar(props) {
  return (
    <div className="bg-white w-20">
        { props.children }
    </div>
  );
}

export default MainSidebar;
