import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
import { Container, Header, SpaceView,
  UserProfileView, UserImageView, UserImage, UserInfoView, UserText,
  UserAboutText,
  SettingsMenuView, SettingsItemView, SettingsImageView, SettingsItemText,
  SettingsImage, HrView, SubHrView, SettignsLeftView, SettingsRightView, NextIcon,
  AlignView
} from './styles';
import HeaderView from '~/components/HeaderView'
import { signOut } from '../../store/modules/auth/actions';
import insert from '~/assets/insert_photo-24px.svg';

export default function SettingsPage({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.profile)

  // console.tron.log(userData)

  function handleUpdateProfile() {
    navigation.navigate('UpdateProfile')
  }

  function handleSignOut() {
    // userData.avatar.url = insert
    // console.tron.log(userData.avatar)
    dispatch(signOut())
  }


  // ---------------------------------------------------------------------------
  return (
    <Container>
      <Header>
        <SpaceView/>
        <HeaderView data="Configurações"/>
        <SpaceView/>
      </Header>
      <UserProfileView>
        {/* <UserImageView> */}
          { userData === undefined || userData.avatar === null
            ? (
              <>
                <UserImage
                  source={require('~/assets/insert_photo-24px.svg')}
                />
                {/* <UserText>n/a</UserText> */}
              </>
            )
            : (
              <UserImage
                source={
                  userData.avatar
                    ? { uri: userData.avatar.url }
                    : insert
                }
              />
            )
          }
        {/* </UserImageView> */}
        <UserInfoView>
          <UserText>{userData.user_name}</UserText>
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
              <TouchableOpacity onPress={handleUpdateProfile}>
                <NextIcon name="arrow-right" size={16} style={{color: '#18A0FB'}}></NextIcon>
              </TouchableOpacity>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>
        <SettingsItemView>
          <SettignsLeftView>
          <AlignView>
            <SettingsImageView>
              <SettingsImage name="info" size={24} style={{color: '#ddd'}}/>
            </SettingsImageView>
            </AlignView>
            <SettingsItemText style={{color: '#ddd'}}>Ajuda</SettingsItemText>
          </SettignsLeftView>
          <AlignView>
            <SettingsRightView>
              <NextIcon name="arrow-right" size={16} style={{color: '#ddd'}}></NextIcon>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>
        <SettingsItemView>
          <SettignsLeftView>
          <AlignView>
            <SettingsImageView>
              <SettingsImage name="heart" size={24} style={{color: '#ddd'}}/>
            </SettingsImageView>
            </AlignView>
            <SettingsItemText style={{color: '#ddd'}}>Compartilhar godtasker</SettingsItemText>
          </SettignsLeftView>
          <AlignView>
            <SettingsRightView>
              <NextIcon name="arrow-right" size={16} style={{color: '#ddd'}}></NextIcon>
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
                <NextIcon name="arrow-right" size={16} style={{color: '#18A0FB'}}></NextIcon>
              </TouchableOpacity>
            </SettingsRightView>
          </AlignView>
        </SettingsItemView>
        <SubHrView/>
      </SettingsMenuView>
    </Container>
  )
}
