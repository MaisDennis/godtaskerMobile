import React from 'react'
import { AlignView, HeaderContainer, HeaderText, HeaderImage } from './styles';
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';

export default function HeaderView({data}) {
  // console.log(data)

  return (
    <AlignView>
    <HeaderContainer>
      <HeaderImage
        source={godtaskerFont}
      />
      {/* <HeaderText>{todayDate}</HeaderText> */}
      <HeaderText>{data}</HeaderText>
    </HeaderContainer>
    </AlignView>
  )
}
