import lang from 'i18n-js';
import { get } from 'lodash';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { compose, withHandlers } from 'recompact';
import { createSelector } from 'reselect';
import { BalanceCoinRow } from '../components/coin-row';
import { UniswapInvestmentCard } from '../components/investment-cards';
import { UniqueTokenRow } from '../components/unique-token';
import { buildUniqueTokenList } from './assets';

const allAssetsSelector = state => state.allAssets;
const allAssetsCountSelector = state => state.allAssetsCount;
const assetsSelector = state => state.assets;
const assetsTotalSelector = state => state.assetsTotal;
const languageSelector = state => state.language;
const nativeCurrencySelector = state => state.nativeCurrency;
const onToggleShowShitcoinsSelector = state => state.onToggleShowShitcoins;
const setIsWalletEmptySelector = state => state.setIsWalletEmpty;
const shitcoinsCountSelector = state => state.shitcoinsCount;
const showShitcoinsSelector = state => state.showShitcoins;
const uniqueTokensSelector = state => state.uniqueTokens;
const uniswapSelector = state => state.uniswap;
const uniswapTotalSelector = state => state.uniswapTotal;

const enhanceRenderItem = compose(
  withNavigation,
  withHandlers({
    onPress: ({ assetType, navigation }) => (item) => {
      navigation.navigate('ExpandedAssetScreen', {
        asset: item,
        type: assetType,
      });
    },
  }),
);

const TokenItem = enhanceRenderItem(BalanceCoinRow);
const UniqueTokenItem = enhanceRenderItem(UniqueTokenRow);
const UniswapCardItem = enhanceRenderItem(UniswapInvestmentCard);

const balancesRenderItem = item => <TokenItem {...item} assetType="token" />;
const collectiblesRenderItem = item => <UniqueTokenItem {...item} assetType="unique_token" />;
const uniswapRenderItem = item => <UniswapCardItem {...item} assetType="uniswap" />;

const filterWalletSections = sections => (
  sections.filter(({ data, header }) => (
    data
      ? get(header, 'totalItems')
      : true
  ))
);

const buildWalletSections = (
  allAssets,
  allAssetsCount,
  assets,
  assetsTotal,
  language,
  nativeCurrency,
  onToggleShowShitcoins,
  setIsWalletEmpty,
  shitcoinsCount,
  showShitcoins,
  uniqueTokens = [],
  uniswap = [],
  uniswapTotal,
) => {
  const sections = [
    {
      balances: true,
      data: showShitcoins ? allAssets : assets,
      header: {
        showShitcoins,
        title: lang.t('account.tab_balances'),
        totalItems: allAssetsCount,
        totalValue: get(assetsTotal, 'display', ''),
      },
      name: 'balances',
      renderItem: balancesRenderItem,
    },
    {
      data: uniswap,
      header: {
        title: 'Investments',
        totalItems: uniswap.length,
        totalValue: uniswapTotal,
      },
      investments: true,
      name: 'investments',
      renderItem: uniswapRenderItem,
    },
    {
      collectibles: true,
      data: buildUniqueTokenList(uniqueTokens),
      header: {
        title: lang.t('account.tab_collectibles'),
        totalItems: uniqueTokens.length,
        totalValue: '',
      },
      name: 'collectibles',
      renderItem: collectiblesRenderItem,
      type: 'big',
    },
  ];

  if (shitcoinsCount) {
    // 99 is an arbitrarily high number used to disable the 'destructiveButton' option
    const destructiveButtonIndex = showShitcoins ? 0 : 99;

    sections[0].header.contextMenuOptions = {
      cancelButtonIndex: 1,
      destructiveButtonIndex,
      onPressActionSheet: onToggleShowShitcoins,
      options: [
        `${lang.t(`account.${showShitcoins ? 'hide' : 'show'}`)} ${lang.t('wallet.assets.no_price')}`,
        lang.t('wallet.action.cancel'),
      ],
    };
  }

  const filteredSections = filterWalletSections(sections);
  const isEmpty = !filteredSections.length;

  // Save wallet empty status to state
  setIsWalletEmpty(isEmpty);

  return {
    isEmpty,
    sections: filteredSections,
  };
};

export default createSelector(
  [
    allAssetsSelector,
    allAssetsCountSelector,
    assetsSelector,
    assetsTotalSelector,
    languageSelector,
    nativeCurrencySelector,
    onToggleShowShitcoinsSelector,
    setIsWalletEmptySelector,
    shitcoinsCountSelector,
    showShitcoinsSelector,
    uniqueTokensSelector,
    uniswapSelector,
    uniswapTotalSelector,
  ],
  buildWalletSections,
);
