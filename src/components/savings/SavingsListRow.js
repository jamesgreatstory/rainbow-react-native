import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  calculateAPY,
  calculateCompoundInterestPerBlock,
  APROX_BLOCK_TIME,
  formatSavingsAmount,
} from '../../helpers/savings';
import { add, multiply } from '../../helpers/utilities';
import { colors, padding, position, fonts } from '../../styles';
import { deviceUtils } from '../../utils';
import { ButtonPressAnimation, AnimatedNumber } from '../animations';
import { CoinIcon } from '../coin-icon';
import { Icon } from '../icons';
import { Centered, Row } from '../layout';
import { ShadowStack } from '../shadow-stack';
import { GradientText, Text } from '../text';
import { useNavigation } from 'react-navigation-hooks';

const AVERAGE_BLOCK_TIME_MS = APROX_BLOCK_TIME * 1000;
const BLOCKS_IN_1_DAY = (60000 / AVERAGE_BLOCK_TIME_MS) * 60 * 24 * 1000;
const MS_IN_1_DAY = 1000 * 60 * 60 * 24;
const ANIMATE_NUMBER_INTERVAL = 30;
const STABLECOINS = ['DAI', 'SAI', 'USDC', 'USDT'];

const sx = StyleSheet.create({
  text: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: fonts.weight.bold,
    marginBottom: 0.5,
    marginRight: 4,
    textAlign: 'left',
  },
});

const animatedNumberFormatterWithDolllars = val =>
  `$${formatSavingsAmount(val)}`;
const animatedNumberFormatter = val => `${formatSavingsAmount(val)}`;

const renderAnimatedNumber = (value, steps, symbol) => {
  const isStablecoin = STABLECOINS.indexOf(symbol) !== -1;
  const numberComponent = (
    <AnimatedNumber
      letterSpacing={parseFloat(fonts.letterSpacing.roundedTightest)}
      style={sx.text}
      formatter={
        isStablecoin
          ? animatedNumberFormatterWithDolllars
          : animatedNumberFormatter
      }
      steps={steps}
      time={ANIMATE_NUMBER_INTERVAL}
      value={Number(value)}
    />
  );

  if (isStablecoin) {
    return numberComponent;
  }

  return (
    <React.Fragment>
      {numberComponent}
      <Text style={sx.text}>{symbol}</Text>
    </React.Fragment>
  );
};

const SavingsListRow = ({
  cTokenBalance,
  lifetimeSupplyInterestAccrued,
  lifetimeSupplyInterestAccruedNative,
  nativeValue,
  supplyBalanceUnderlying,
  supplyRate,
  underlying,
  underlyingPrice,
}) => {
  const initialValue = BigNumber(supplyBalanceUnderlying);
  const [value, setValue] = useState(initialValue);
  const [steps, setSteps] = useState(0);
  const apy = useMemo(() => calculateAPY(supplyRate), [supplyRate]);
  const { navigate } = useNavigation();

  const onButtonPress = useCallback(() => {
    navigate('SavingsSheet', {
      cTokenBalance,
      isEmpty: !supplyBalanceUnderlying,
      lifetimeSupplyInterestAccrued,
      lifetimeSupplyInterestAccruedNative,
      nativeValue,
      supplyBalanceUnderlying,
      supplyRate,
      underlying,
      underlyingPrice,
    });
  }, [
    cTokenBalance,
    lifetimeSupplyInterestAccrued,
    lifetimeSupplyInterestAccruedNative,
    nativeValue,
    navigate,
    supplyBalanceUnderlying,
    supplyRate,
    underlying,
    underlyingPrice,
  ]);

  useEffect(() => {
    const getFutureValue = () => {
      if (!supplyBalanceUnderlying) return;
      const valuePerBlock = calculateCompoundInterestPerBlock(
        supplyBalanceUnderlying,
        apy
      );
      const futureValue = BigNumber(
        add(initialValue, multiply(valuePerBlock, BLOCKS_IN_1_DAY))
      );

      if (!futureValue.eq(value)) {
        const steps = MS_IN_1_DAY / ANIMATE_NUMBER_INTERVAL;
        setValue(futureValue);
        setSteps(steps);
      }
    };
    getFutureValue();
  }, [apy, initialValue, supplyBalanceUnderlying, underlying, value]);

  const displayValue = formatSavingsAmount(value);
  if (!underlying || !underlying.address) return null;

  return (
    <ButtonPressAnimation onPress={onButtonPress} scaleTo={0.96}>
      <Centered css={padding(0, 0, 15)} direction="column">
        <ShadowStack
          height={49}
          width={deviceUtils.dimensions.width - 38}
          borderRadius={25}
          shadows={[
            [0, 10, 30, colors.dark, 0.1],
            [0, 5, 15, colors.dark, 0.04],
          ]}
        >
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: 0,
              paddingBottom: 10,
              paddingLeft: 11,
              paddingRight: 10,
              paddingTop: 9,
            }}
          >
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {underlying.symbol ? (
                <CoinIcon
                  symbol={underlying.symbol}
                  size={26}
                  style={{ marginRight: 6 }}
                />
              ) : null}
              {supplyBalanceUnderlying && !isNaN(displayValue) ? (
                renderAnimatedNumber(displayValue, steps, underlying.symbol)
              ) : (
                <>
                  <Text
                    style={{
                      color: colors.blueGreyDark,
                      fontSize: 16,
                      fontWeight: fonts.weight.semibold,
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  >
                    $0.00
                  </Text>
                  <ButtonPressAnimation onPress={onButtonPress} scaleTo={0.92}>
                    <ShadowStack
                      width={97}
                      height={30}
                      borderRadius={25}
                      paddingHorizontal={8}
                      backgroundColor="#575CFF"
                      alignItems="center"
                      flexDirection="row"
                      shadows={[
                        [0, 3, 5, colors.dark, 0.2],
                        [0, 6, 10, colors.dark, 0.14],
                      ]}
                    >
                      <Icon
                        name="plusCircled"
                        color={colors.white}
                        height={16}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 15,
                          fontWeight: fonts.weight.semibold,
                          marginLeft: -7.5,
                          paddingHorizontal: 10,
                        }}
                      >
                        Deposit
                      </Text>
                    </ShadowStack>
                  </ButtonPressAnimation>
                </>
              )}
            </Row>
            <Centered
              style={{
                height: 30,
              }}
            >
              <LinearGradient
                borderRadius={17}
                overflow="hidden"
                colors={['#2CCC00', '#FEBE44']}
                end={{ x: 1, y: 1 }}
                pointerEvents="none"
                start={{ x: 0, y: 0 }}
                opacity={0.1}
                style={position.coverAsObject}
              />
              <GradientText
                align="center"
                angle={false}
                end={{ x: 1, y: 1 }}
                letterSpacing="roundedTight"
                start={{ x: 0, y: 0 }}
                steps={[0, 1]}
                style={{
                  fontSize: parseFloat(fonts.size.lmedium),
                  fontWeight: fonts.weight.semibold,
                  paddingBottom: 1,
                  paddingHorizontal: 10,
                }}
              >
                {apy}% APY
              </GradientText>
            </Centered>
          </Row>
        </ShadowStack>
      </Centered>
    </ButtonPressAnimation>
  );
};

SavingsListRow.propTypes = {
  cTokenBalance: PropTypes.string,
  lifetimeSupplyInterestAccrued: PropTypes.string,
  nativeValue: PropTypes.number,
  supplyBalanceUnderlying: PropTypes.string,
  supplyRate: PropTypes.string,
  underlying: PropTypes.object,
  underlyingPrice: PropTypes.string,
};

export default SavingsListRow;