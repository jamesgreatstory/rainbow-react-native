import PropTypes from 'prop-types';
import React from 'react';
import Svg, { Defs, Path, RadialGradient, Stop } from 'react-native-svg';

const EmojiAnimalsIcon = ({ color, ...props }) => (
  <Svg height="30" width="30" viewBox="0 0 30 30" {...props}>
    <Defs>
      <RadialGradient
        cx="100%"
        cy="49.9814195%"
        fx="100%"
        fy="49.9814195%"
        r="108.068849%"
        id="rainbow"
      >
        <Stop stopColor="#FFB114" offset="0%" />
        <Stop stopColor="#FF54BB" offset="63.5417%" />
        <Stop stopColor="#00F0FF" offset="100%" />
      </RadialGradient>
    </Defs>
    <Path
      d="M19.5170868,7.02076546 C20.3547512,7.03475986 21.1251091,7.38761846 21.7455272,8.0413565 C23.5151514,9.90660907 22.2343313,12.4072737 21.2800471,13.5104983 C21.9404491,14.1312495 23.4748342,15.8572246 22.8600806,18.0366846 C21.9591083,21.230738 19.1415706,21.3386948 18.9429835,21.3420268 L18.9429835,21.3420268 L18.4348538,21.3420268 C17.5088915,22.5478769 16.0151568,22.9787043 15.0082269,22.9787043 C13.9116663,22.9787043 12.4279275,22.4709077 11.5596088,21.3420268 L11.5596088,21.3420268 L11.0521455,21.3420268 C10.8635544,21.3386948 8.04601676,21.230738 7.14504446,18.0366846 C6.5286248,15.852893 8.07100674,14.1235859 8.73174198,13.5031679 C7.77845731,12.3959449 6.50663361,9.90261067 8.27225943,8.0416897 C8.89301069,7.38728526 9.66370187,7.03442666 10.501033,7.02043226 C12.1513717,6.99310988 13.4938338,8.26959837 13.6414413,8.41553989 L13.6414413,8.41553989 L13.6441069,8.41753909 L13.7214092,8.48817745 C14.1788926,8.37155752 14.6740275,8.30325156 15.2124784,8.30325156 C15.6283118,8.30325156 16.0151568,8.34390193 16.3763454,8.41553989 L16.3763454,8.41553989 C16.5242861,8.26959837 17.8667481,6.99310988 19.5170868,7.02076546 Z M15.2124784,9.3031842 C11.3586893,9.3031842 10.0188929,13.3872144 9.9642481,13.5608115 L9.9642481,13.5608115 L9.86895295,13.8606913 L9.61938629,14.0546136 C9.53675274,14.1192543 7.52889064,15.7172807 8.10699233,17.7651267 C8.80171394,20.228473 10.84123,20.3380957 11.0714711,20.3427605 L11.0714711,20.3427605 L11.9677786,20.3427605 C12.2440012,20.3427605 12.4675783,20.5660044 12.4675783,20.8425602 C12.4675783,20.8492242 12.4655791,20.8552218 12.4652459,20.862219 C13.1929543,21.6905538 14.3358297,21.9791048 15.0082269,21.9791048 C15.6956181,21.9791048 16.8531543,21.6798914 17.5758647,20.8095735 C17.5931911,20.5490112 17.808105,20.3427605 18.0729988,20.3427605 L18.0729988,20.3427605 L18.9429835,20.3427605 C19.1635618,20.3380957 21.2030779,20.228473 21.8977995,17.7651267 C22.475568,15.7172807 20.4680391,14.1192543 20.3824068,14.051948 L20.3824068,14.051948 L20.1015193,13.8327025 L20.0195522,13.4821763 C19.9805678,13.31491 19.0026263,9.3031842 15.2124784,9.3031842 Z M15.9249555,17.3005604 C15.997025,17.3035287 16.4654763,17.3421168 16.4654763,17.8437619 C16.4654763,18.2835857 15.8657166,18.9596481 15.3452585,19.2018843 L15.3452585,19.2018843 L15.3454529,19.9467541 C15.3468875,19.9824882 15.3578091,20.0964703 15.4372217,20.1778266 C15.4848693,20.2271402 15.5588396,20.2641254 15.6707948,20.2641254 C16.0109918,20.2641254 16.0253194,19.9355903 16.0253194,19.9319251 L16.0253194,19.9319251 L16.6913858,19.9619131 C16.6703942,20.4333909 16.3055404,20.930525 15.6707948,20.930525 C15.4138977,20.930525 15.1813242,20.8402278 15.0043951,20.6796255 C14.8271328,20.8402278 14.5945593,20.930525 14.3379955,20.930525 C13.7032498,20.930525 13.3387292,20.4333909 13.3174045,19.9649119 L13.3174045,19.9649119 L13.3174045,19.9619131 L13.9834709,19.9319251 C13.9834709,19.9355903 13.9981317,20.2641254 14.3379955,20.2641254 C14.4499506,20.2641254 14.5235878,20.2271402 14.5715686,20.1778266 C14.6668637,20.0801991 14.6631985,19.9355903 14.6631985,19.9355903 L14.6631985,19.2068823 C14.1407412,18.9686445 13.5336511,18.285918 13.5336511,17.8437619 C13.5336511,17.300313 14.0830976,17.300313 14.0830976,17.300313 Z M17.9927976,14.3010148 C18.3609834,14.3010148 18.6591973,14.7488354 18.6591973,15.3009475 C18.6591973,15.8523932 18.3609834,16.3002137 17.9927976,16.3002137 C17.624945,16.3002137 17.326398,15.8523932 17.326398,15.3009475 C17.326398,14.7488354 17.624945,14.3010148 17.9927976,14.3010148 Z M11.9950343,14.3010148 C12.3632201,14.3010148 12.661434,14.7488354 12.661434,15.3009475 C12.661434,15.8523932 12.3632201,16.3002137 11.9950343,16.3002137 C11.6271817,16.3002137 11.3286347,15.8523932 11.3286347,15.3009475 C11.3286347,14.7488354 11.6271817,14.3010148 11.9950343,14.3010148 Z M10.517693,8.02003171 C10.0108961,8.02836171 9.48344077,8.2176192 8.99730223,8.72974732 C7.71614894,10.0802062 8.76639476,11.8701556 9.28052208,12.581204 C9.72534383,11.5985977 10.7589297,9.79965193 12.6515046,8.87935404 C12.2316728,8.54748702 11.4080029,8.00503772 10.517693,8.02003171 Z M19.5000936,8.02036491 C18.6994145,8.00703692 17.9513809,8.44486148 17.5038935,8.7743961 C19.4407841,9.64371442 20.3790748,11.5063014 20.7672525,12.539554 C21.2903763,11.8031824 22.2783137,10.0552162 21.0201512,8.72974732 C20.5346791,8.2176192 20.0068906,8.02836171 19.5000936,8.02036491 Z"
      fill={color ? color : 'url(#rainbow)'}
      fillRule="nonzero"
    />
  </Svg>
);

EmojiAnimalsIcon.propTypes = {
  color: PropTypes.string,
};

EmojiAnimalsIcon.defaultProps = {
  color: null,
};

export default EmojiAnimalsIcon;
