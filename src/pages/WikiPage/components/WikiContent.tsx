import React from 'react'
import ContentList from './ContentList'
import ContentHeader from './ContentHeader'
import { ContentContainer  } from '../../../styled/wiki/Container'

export default function WikiContent() {
  return (
    <ContentContainer>
      <ContentHeader />
      <ContentList />

    </ContentContainer>
  )
}
