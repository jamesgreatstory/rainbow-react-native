import {
  getAccountLocal,
  getKey,
  getLocal,
  removeAccountLocal,
  saveAccountLocal,
  saveLocal,
} from './common';

const assetPricesFromUniswapVersion = '0.1.0';
const assetsVersion = '0.2.0';
const compoundAssetsVersion = '0.1.0';
const transactionsVersion = '0.2.2';
const uniqueTokensVersion = '0.2.0';

const ACCOUNT_INFO = 'accountInfo';
const ASSET_PRICES_FROM_UNISWAP = 'assetPricesFromUniswap';
const ASSETS = 'assets';
const COMPOUND_ASSETS = 'compoundAssets';
const OPEN_FAMILIES = 'openFamilies';
const OPEN_INVESTMENT_CARDS = 'openInvestmentCards';
const SMALL_BALANCE_TOGGLE = 'smallBalanceToggle';
const TRANSACTIONS = 'transactions';
const UNIQUE_TOKENS = 'uniquetokens';
const WALLET_EMPTY = 'iswalletempty';

/**
 * @desc get assets
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getAssets = (accountAddress, network) =>
  getAccountLocal(ASSETS, accountAddress, network, [], assetsVersion);

/**
 * @desc save assets
 * @param  {String}   [address]
 * @param  {Array}    [assets]
 * @param  {String}   [network]
 */
export const saveAssets = (assets, accountAddress, network) =>
  saveAccountLocal(ASSETS, assets, accountAddress, network, assetsVersion);

/**
 * @desc remove assets
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeAssets = (accountAddress, network) =>
  removeAccountLocal(ASSETS, accountAddress, network);

/**
 * @desc get asset prices from Uniswap
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getAssetPricesFromUniswap = (accountAddress, network) =>
  getAccountLocal(
    ASSET_PRICES_FROM_UNISWAP,
    accountAddress,
    network,
    [],
    assetPricesFromUniswapVersion
  );

/**
 * @desc save asset prices from Uniswap
 * @param  {String}   [address]
 * @param  {Array}    [assets]
 * @param  {String}   [network]
 */
export const saveAssetPricesFromUniswap = (
  assetPrices,
  accountAddress,
  network
) =>
  saveAccountLocal(
    ASSET_PRICES_FROM_UNISWAP,
    assetPrices,
    accountAddress,
    network,
    assetPricesFromUniswapVersion
  );

/**
 * @desc remove asset from Uniswap
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeAssetPricesFromUniswap = (accountAddress, network) =>
  removeAccountLocal(ASSET_PRICES_FROM_UNISWAP, accountAddress, network);

/**
 * @desc get compound assets
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getCompoundAssets = (accountAddress, network) =>
  getAccountLocal(
    COMPOUND_ASSETS,
    accountAddress,
    network,
    [],
    compoundAssetsVersion
  );

/**
 * @desc save compound assets
 * @param  {String}   [address]
 * @param  {Array}    [compound assets]
 * @param  {String}   [network]
 */
export const saveCompoundAssets = (compoundAssets, accountAddress, network) =>
  saveAccountLocal(
    COMPOUND_ASSETS,
    compoundAssets,
    accountAddress,
    network,
    compoundAssetsVersion
  );

/**
 * @desc remove compound assets
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeCompoundAssets = (accountAddress, network) =>
  removeAccountLocal(COMPOUND_ASSETS, accountAddress, network);

/**
 * @desc get transactions
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getLocalTransactions = (accountAddress, network) =>
  getAccountLocal(
    TRANSACTIONS,
    accountAddress,
    network,
    [],
    transactionsVersion
  );

/**
 * @desc save transactions
 * @param  {String}   [address]
 * @param  {Array}   [transactions]
 * @param  {String}   [network]
 */
export const saveLocalTransactions = (transactions, accountAddress, network) =>
  saveAccountLocal(
    TRANSACTIONS,
    transactions,
    accountAddress,
    network,
    transactionsVersion
  );

/**
 * @desc remove transactions
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeLocalTransactions = (accountAddress, network) =>
  removeAccountLocal(TRANSACTIONS, accountAddress, network);

/**
 * @desc get is wallet empty
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Boolean}
 */
export const getIsWalletEmpty = async (accountAddress, network) =>
  await getLocal(getKey(WALLET_EMPTY, accountAddress, network));

/**
 * @desc save is wallet empty
 * @param  {String}   [address]
 * @param  {Boolean}   [isWalletEmpty]
 * @param  {String}   [network]
 */
export const saveIsWalletEmpty = async (
  accountAddress,
  isWalletEmpty,
  network
) => {
  await saveLocal(getKey(WALLET_EMPTY, accountAddress, network), isWalletEmpty);
};

/**
 * @desc remove is wallet empty
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeIsWalletEmpty = (accountAddress, network) =>
  removeAccountLocal(WALLET_EMPTY, accountAddress, network);

/**
 * @desc get unique tokens
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getUniqueTokens = (accountAddress, network) =>
  getAccountLocal(
    UNIQUE_TOKENS,
    accountAddress,
    network,
    [],
    uniqueTokensVersion
  );

/**
 * @desc save unique tokens
 * @param  {String}   [address]
 * @param  {Array}    [uniqueTokens]
 * @param  {String}   [network]
 */
export const saveUniqueTokens = (uniqueTokens, accountAddress, network) =>
  saveAccountLocal(
    UNIQUE_TOKENS,
    uniqueTokens,
    accountAddress,
    network,
    uniqueTokensVersion
  );

/**
 * @desc remove unique tokens
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeUniqueTokens = (accountAddress, network) =>
  removeAccountLocal(UNIQUE_TOKENS, accountAddress, network);

/**
 * @desc get open small balances
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getSmallBalanceToggle = (accountAddress, network) =>
  getAccountLocal(SMALL_BALANCE_TOGGLE, accountAddress, network, false);

/**
 * @desc save small balance toggle
 * @param  {String}   [address]
 * @param  {Boolean}    [small balance toggle]
 * @param  {String}   [network]
 */
export const saveSmallBalanceToggle = (
  openSmallBalances,
  accountAddress,
  network
) =>
  saveAccountLocal(
    SMALL_BALANCE_TOGGLE,
    openSmallBalances,
    accountAddress,
    network
  );

/**
 * @desc remove small balance toggle
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeSmallBalanceToggle = (accountAddress, network) =>
  removeAccountLocal(SMALL_BALANCE_TOGGLE, accountAddress, network);

/**
 * @desc get open investment cards
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getOpenInvestmentCards = (accountAddress, network) =>
  getAccountLocal(OPEN_INVESTMENT_CARDS, accountAddress, network, {});

/**
 * @desc save open investment cards
 * @param  {String}   [address]
 * @param  {Object}    [open investment cards]
 * @param  {String}   [network]
 */
export const saveOpenInvestmentCards = (
  openInvestmentCards,
  accountAddress,
  network
) =>
  saveAccountLocal(
    OPEN_INVESTMENT_CARDS,
    openInvestmentCards,
    accountAddress,
    network
  );

/**
 * @desc remove open investment cards
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeOpenInvestmentCards = (accountAddress, network) =>
  removeAccountLocal(OPEN_INVESTMENT_CARDS, accountAddress, network);

/**
 * @desc get open families
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getOpenFamilies = (accountAddress, network) =>
  getAccountLocal(OPEN_FAMILIES, accountAddress, network, {});

/**
 * @desc save open families
 * @param  {String}   [address]
 * @param  {Object}    [open families]
 * @param  {String}   [network]
 */
export const saveOpenFamilies = (openFamilies, accountAddress, network) =>
  saveAccountLocal(OPEN_FAMILIES, openFamilies, accountAddress, network);

/**
 * @desc remove open families
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeOpenFamilies = (accountAddress, network) =>
  removeAccountLocal(OPEN_FAMILIES, accountAddress, network);

/**
 * @desc get profile info
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const getAccountInfo = (accountAddress, network) =>
  getAccountLocal(ACCOUNT_INFO, accountAddress, network, {});

/**
 * @desc save profile info
 * @param  {String}   [address]
 * @param  {Object}    [profile info]
 * @param  {String}   [network]
 */
export const saveAccountInfo = (profileInfo, accountAddress, network) =>
  saveAccountLocal(ACCOUNT_INFO, profileInfo, accountAddress, network);

/**
 * @desc remove profile info
 * @param  {String}   [address]
 * @param  {String}   [network]
 * @return {Object}
 */
export const removeAccountInfo = (accountAddress, network) =>
  removeAccountLocal(ACCOUNT_INFO, accountAddress, network);
