import _, { compact, get, sortBy } from 'lodash';
import store from '../redux/store';
import { pushOpenFamilyTab } from '../redux/openFamilyTabs';

export const buildAssetHeaderUniqueIdentifier = ({
  showShitcoins,
  title,
  totalItems,
  totalValue,
}) => ([showShitcoins, title, totalItems, totalValue].join('_'));

export const buildAssetUniqueIdentifier = (item) => {
  const balance = get(item, 'balance.amount', '');
  const nativePrice = get(item, 'native.price.display', '');
  const uniqueId = get(item, 'uniqueId');

  return compact([balance, nativePrice, uniqueId]).join('_');
};

export const buildUniqueTokenList = (uniqueTokens) => {
  let rows = [];
  const grouped = _.groupBy(uniqueTokens, token => token.asset_contract.name);
  const families = Object.keys(grouped);
  for (let i = 0; i < families.length; i++) {
    grouped[families[i]][0].rowNumber = i;

    const tokensRow = []
    for (let j = 0; j < grouped[families[i]].length; j += 2) {
      if (grouped[families[i]][j + 1]) {
        tokensRow.push([grouped[families[i]][j], grouped[families[i]][j + 1]]);
      } else {
        tokensRow.push([grouped[families[i]][j]]);
      }
    }
    tokens = compact(tokensRow);
    rows.push({
      tokens,
      uniqueId: tokensRow[0].map(({ uniqueId }) => uniqueId).join('__'),
      familyImage: get(tokensRow, '[0][0].familyImage', null),
      familyName: families[i],
      familyId: i,
      childrenAmount: grouped[families[i]].length,
    });
  }

  while(rows.length > store.getState().openFamilyTabs.openFamilyTabs.length) {
    store.dispatch(pushOpenFamilyTab());
  }
  
  return sortBy(rows, ['familyName']);
};

/* eslint-disable camelcase */
export const buildUniqueTokenName = ({ asset_contract, id, name }) => (
  name || `${asset_contract.name} #${id}`
);
/* eslint-enable camelcase */
