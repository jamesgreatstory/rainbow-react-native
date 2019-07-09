import lang from 'i18n-js';
import PropTypes from 'prop-types';
import React from 'react';
import {
  compose,
  onlyUpdateForKeys,
  shouldUpdate,
  withHandlers,
} from 'recompact';
import { buildAssetUniqueIdentifier } from '../../helpers/assets';
import { deviceUtils } from '../../utils';
import { FlyInAnimation } from '../animations';
import { RecyclerAssetList } from '../asset-list';
import { CoinRow, CollectiblesSendRow, SendCoinRow } from '../coin-row';
import { ListFooter } from '../list';
import { View, Text } from 'react-primitives';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { RecyclerListView, LayoutProvider, DataProvider } from "recyclerlistview";
import { LayoutAnimation } from 'react-native';
import TokenFamilyHeader from '../token-family/TokenFamilyHeader';

const rowHeight = 64;
const familyHeaderHeight = 64;

class SendAssetList extends React.Component {
  enhanceRenderItem = compose(
    withHandlers({
      onPress: (itemInfo) => () => {
        return this.props.onSelectAsset(itemInfo.item ? itemInfo.item : itemInfo);
      },
    }),
  );

  TokenItem = React.memo(this.enhanceRenderItem(SendCoinRow));
  UniqueTokenItem = React.memo(this.enhanceRenderItem(CollectiblesSendRow));

  rlv = React.createRef();

  changeOpenTab = (index) => {
    let openCards = this.state.openCards;
    LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
    openCards[index] = !openCards[index];
    this.setState({ openCards: openCards });
    let familiesHeight = 0;
    if(openCards[index]) {
      for(let i = 0; i < index; i++) {
        if(openCards[i]) {
          familiesHeight += familyHeaderHeight + this.props.uniqueTokens[i].data.length * rowHeight;
        } else {
          familiesHeight += familyHeaderHeight;
        }
      }
      const heightBelow = this.props.allAssets.length * rowHeight + familiesHeight;
      const renderSize = familyHeaderHeight + this.props.uniqueTokens[index].data.length * rowHeight;
      const screenHeight = this.position + this.componentHeight;
      if(heightBelow + renderSize + 64 > screenHeight) {
        setTimeout(() => {
          this.rlv.scrollToOffset(0, this.position + (heightBelow + renderSize - screenHeight + familyHeaderHeight), true);
        }, 10);
      }

    }
  }

  mapTokens = (collectibles) => {
    items = collectibles.map((collectible) => {
      let newItem = {}
      newItem.item = collectible;
      return <this.UniqueTokenItem key={collectible.id} {...newItem} />;
    });
    return items;
  }

  balancesRenderItem = item => <this.TokenItem {...item} />;
  collectiblesRenderItem = item => {
    return <View>
      <TokenFamilyHeader
        isCoinRow
        familyName={item.name}
        familyImage={item.familyImage}
        childrenAmount={item.data.length}
        isOpen={this.state.openCards[item.familyId]}
        onHeaderPress={() => { this.changeOpenTab(item.familyId) }}
      />
      {this.state.openCards[item.familyId] && this.mapTokens(item.data)}
    </View>
  }

  constructor(args) {
    super(args);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return false;
      }).cloneWithRows(this.props.allAssets.concat(this.props.uniqueTokens)),
      openCards: [false, false, false, false, false]
    };

    this._layoutProvider = new LayoutProvider((i) => {
      if (i < this.props.allAssets.length) {
        return 'COIN_ROW';
      } else {
        if (this.state.openCards[i - this.props.allAssets.length]) {
          return { type: 'COLLECTIBLE_ROW', size: this.props.uniqueTokens[i - this.props.allAssets.length].data.length + 1 };
        } else {
          return 'COLLECTIBLE_ROW_CLOSED';
        }
      }
    }, (type, dim) => {
      if (type == "COIN_ROW") {
        dim.width = deviceUtils.dimensions.width;
        dim.height = 64;
      } else if (type.type == "COLLECTIBLE_ROW") {
        dim.width = deviceUtils.dimensions.width;
        dim.height = type.size * 64;
      } else if (type == "COLLECTIBLE_ROW_CLOSED") {
        dim.width = deviceUtils.dimensions.width;
        dim.height = 64;
      } else {
        dim.width = 0;
        dim.height = 0;
      }
    });
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow(type, data) {
    if (type == "COIN_ROW") {
      return this.balancesRenderItem(data);
    } else if (type.type == "COLLECTIBLE_ROW") {
      return this.collectiblesRenderItem(data);
    } else if (type == "COLLECTIBLE_ROW_CLOSED") {
      return this.collectiblesRenderItem(data);
    } else {
      return null;
    }
  }

  render() {
    console.log(this.props.uniqueTokens);
    return (
      <FlyInAnimation style={{ flex: 1, width: '100%' }}>
        <RecyclerListView
          ref={ref => { this.rlv = ref; }}
          rowRenderer={this._renderRow}
          dataProvider={this.state.dataProvider}
          layoutProvider={this._layoutProvider}
          onScroll={event => {
            this.componentHeight = event.nativeEvent.layoutMeasurement.height;
            this.position = event.nativeEvent.contentOffset.y;
          }}
        />
      </FlyInAnimation>
    );
  };
}

export default SendAssetList;
