import React, {useEffect, useState} from 'react';
import {findDOMNode} from 'react-dom';


function useLabelWidth(inputLabelRef) {
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(findDOMNode(inputLabelRef.current).offsetWidth);
  }, []);

  return labelWidth;
}

export default useLabelWidth;