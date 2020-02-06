import { isNil } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { withNavigation } from 'react-navigation';
import { compose, withProps } from 'recompact';
import styled from 'styled-components/primitives';
import {
  AddCashForm,
  AddCashHeader,
  AddCashStatus,
} from '../components/add-cash';
import { Column } from '../components/layout';
import { withTransitionProps, withWyre } from '../hoc';
import { borders, colors } from '../styles';
import { deviceUtils } from '../utils';
import isNativeStackAvailable from '../helpers/isNativeStackAvailable';

const cashLimitAnnually = 1500;
const cashLimitDaily = 250;

const statusBarHeight = getStatusBarHeight(true);
const sheetHeight = isNativeStackAvailable
  ? deviceUtils.dimensions.height - statusBarHeight - 10
  : deviceUtils.dimensions.height - statusBarHeight;

const Container = isNativeStackAvailable
  ? styled(Column)`
      background-color: ${colors.transparent};
      height: ${sheetHeight};
    `
  : styled(Column)`
      background-color: ${colors.transparent};
      height: 100%;
    `;

const SheetContainer = isNativeStackAvailable
  ? styled(Column)`
      background-color: ${colors.white};
      height: ${deviceUtils.dimensions.height};
    `
  : styled(Column)`
      ${borders.buildRadius('top', 30)};
      background-color: ${colors.white};
      height: ${sheetHeight};
      top: ${statusBarHeight};
    `;

const AddCashSheet = ({
  orderStatus,
  transferHash,
  transferStatus,
  wyreClearState,
}) => {
  useEffect(() => {
    return () => wyreClearState();
  }, [wyreClearState]);

  return (
    <SheetContainer>
      <StatusBar barStyle="light-content" />
      <Container align="center" justify="space-between">
        <AddCashHeader
          limitDaily={cashLimitDaily}
          limitAnnually={cashLimitAnnually}
        />
        {!isNil(orderStatus) ? (
          <AddCashStatus
            orderStatus={orderStatus}
            transferHash={transferHash}
            transferStatus={transferStatus}
          />
        ) : (
          <AddCashForm
            limitDaily={cashLimitDaily}
            limitAnnually={cashLimitAnnually}
          />
        )}
      </Container>
    </SheetContainer>
  );
};

AddCashSheet.propTypes = {
  orderStatus: PropTypes.string,
  transferHash: PropTypes.string,
  transferStatus: PropTypes.string,
  wyreClearState: PropTypes.func,
};

export default compose(
  withWyre,
  withNavigation,
  withTransitionProps,
  withProps(({ transitionProps: { isTransitioning } }) => ({
    isTransitioning,
  }))
)(AddCashSheet);
