import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import { colors } from '../../../styles';
import Svg from '../Svg';

const GearIcon = ({ color, ...props }) => (
  <Svg height="24" width="24" viewBox="0 0 24 24" {...props}>
    <Path
      d="M23.874 10.355a.966.966 0 0 0-.922-.791h-.715c-.44 0-.915-.341-1.056-.758l-.428-1.04c-.198-.393-.105-.969.206-1.28l.505-.505a.907.907 0 0 0 .06-1.186l-2.319-2.32a.906.906 0 0 0-1.185.06l-.506.506c-.31.311-.887.404-1.28.206l-1.04-.428c-.416-.14-.758-.616-.758-1.056v-.715a.966.966 0 0 0-.79-.922S12.834 0 12 0c-.835 0-1.645.126-1.645.126a.966.966 0 0 0-.791.922v.715c0 .44-.341.915-.758 1.055l-1.04.43c-.393.197-.97.104-1.28-.207l-.506-.506a.906.906 0 0 0-1.185-.06l-2.32 2.32a.907.907 0 0 0 .06 1.185l.506.505c.311.311.404.888.206 1.28l-.429 1.04c-.14.417-.615.758-1.055.758h-.715a.966.966 0 0 0-.922.791S0 11.165 0 12c0 .835.126 1.645.126 1.645.067.435.482.79.922.79h.715c.44 0 .915.342 1.055.76l.43 1.038c.197.394.104.97-.207 1.28l-.506.507a.907.907 0 0 0-.06 1.185l2.32 2.32a.907.907 0 0 0 1.185-.06l.506-.506c.311-.311.887-.405 1.28-.206l1.04.428c.417.14.758.616.758 1.056v.714c0 .44.356.856.79.923 0 0 .81.125 1.646.125.835 0 1.645-.125 1.645-.125a.966.966 0 0 0 .79-.923v-.714c0-.44.342-.916.76-1.056l1.038-.429c.394-.197.97-.105 1.28.207l.507.505a.907.907 0 0 0 1.185.06l2.32-2.32a.907.907 0 0 0-.06-1.184l-.506-.506c-.311-.311-.404-.887-.206-1.28l.429-1.04c.14-.417.615-.758 1.055-.758h.715c.44 0 .855-.356.922-.79 0 0 .126-.811.126-1.646 0-.835-.126-1.645-.126-1.645zM12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
      fillRule="nonzero"
      fill={color}
    />
  </Svg>
);

GearIcon.propTypes = {
  color: PropTypes.string,
};

GearIcon.defaultProps = {
  color: colors.dark,
};

export default GearIcon;
