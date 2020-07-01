import React, { Children } from 'react';
import { FlexItem, Row } from '../../layout';
import { padding } from '@rainbow-me/styles';

function renderButton(child) {
  if (!child) return null;
  return <FlexItem marginHorizontal={7.5}>{child}</FlexItem>;
}

export default function SheetActionButtonRow({ children }) {
  return (
    <Row css={padding(19, 11.5, 24)} width="100%" zIndex={2}>
      {Children.map(children, renderButton)}
    </Row>
  );
}
