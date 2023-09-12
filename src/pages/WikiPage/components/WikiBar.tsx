import React from 'react'
import Search from './Search'
import Category from './Category'
import { ColumnContainer } from '../../../styled/wiki/Container';

export default function WikiBar() {
  return (
    <ColumnContainer>
      <Search />
      <Category />
    </ColumnContainer>
  )
}
