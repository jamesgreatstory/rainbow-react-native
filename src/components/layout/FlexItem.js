import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-primitives';

const FlexItem = ({
  flex,
  grow,
  shrink,
  ...props
}) => (
  <View
    {...props}
    style={{
      flex: (isUndefined(flex) && isUndefined(grow) && isUndefined(shrink)) ? 1 : flex,
      flexGrow: grow,
      flexShrink: shrink,
    }}
  />
);

FlexItem.propTypes = {
  flex: PropTypes.number,
  grow: PropTypes.number,
  shrink: PropTypes.number,
};

export default FlexItem;
