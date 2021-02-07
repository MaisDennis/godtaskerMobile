import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { Container, Header, SpaceView,
  UserProfileView, UserImageView, UserImage, UserInfoView, UserText,
  UserAboutText,
  SettingsMenuView, SettingsItemView, SettingsImageView, SettingsItemText,
  SettingsImage, HrView, SubHrView, SettignsLeftView, SettingsRightView, NextIcon,
  AlignView
} from './styles';
import HeaderView from '~/components/HeaderView'
import { signOut } from '../../store/modules/auth/actions';

export default function SettingsPage() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Container>
      <Header>
        <SpaceView/>
        <HeaderView data="Configurações"/>
        <SpaceView/>
      </Header>
      <UserProfileView>
        <UserImageView>
          <UserImage></UserImage>
        </UserImageView>
        <UserInfoView>
          <UserText>Dennis</UserText>
          <UserAboutText>At the gym</UserAboutText>
        </UserInfoView>
      </UserProfileView>
      {/* <HrView/> */}

      <SettingsMenuView>
        <SettingsItemView>
          <SettignsLeftView>
          <AlignView>
            <SettingsImageView>
              <SettingsImage name="key" size={24}/>
            </SettingsImageView>
            </AlignView>
            <SettingsItemText>Conta</SettingsItemText>
          </SettignsLeftView>
          <AlignView>
            <SettingsRightView>
              <NextIcon name="arrow-right" size={16}></NextIcon>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>
        <SettingsItemView>
          <SettignsLeftView>
          <AlignView>
            <SettingsImageView>
              <SettingsImage name="info" size={24}/>
            </SettingsImageView>
            </AlignView>
            <SettingsItemText>Ajuda</SettingsItemText>
          </SettignsLeftView>
          <AlignView>
            <SettingsRightView>
              <NextIcon name="arrow-right" size={16}></NextIcon>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>
        <SettingsItemView>
          <SettignsLeftView>
          <AlignView>
            <SettingsImageView>
              <SettingsImage name="heart" size={24}/>
            </SettingsImageView>
            </AlignView>
            <SettingsItemText>Compartilhar godtasker</SettingsItemText>
          </SettignsLeftView>
          <AlignView>
            <SettingsRightView>
              <NextIcon name="arrow-right" size={16}></NextIcon>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>

        <SettingsItemView>
          <SettignsLeftView>
          <AlignView>
            <SettingsImageView>
              <SettingsImage name="log-out" size={24}/>
            </SettingsImageView>
            </AlignView>
            <SettingsItemText>Sair</SettingsItemText>
          </SettignsLeftView>
          <AlignView>
            <SettingsRightView>
              <TouchableOpacity onPress={handleSignOut}>
                <NextIcon name="arrow-right" size={16}></NextIcon>
              </TouchableOpacity>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>
      </SettingsMenuView>
    </Container>
  )
}
