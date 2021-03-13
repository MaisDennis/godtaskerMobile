import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
import { signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import logo from '~/assets/detective/detectiveBlack.png';
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import {
  Container, ImageLogo, ImageGodtaskerFont,
  Title, Div1, Div2,
  FormWorker,
  SubmitButton, ButtonText, SignUpTouchable, SignUpText,
  FormInputWorkerPassword, PhoneMask, StyledScrollView
} from './styles';
// -----------------------------------------------------------------------------
export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);
  const signed = useSelector(state => state.auth.signed);
  // const test = route.params.phonenumber;
  // console.tron.log(route.params)
  function handleSubmit() {
    const unmaskedPhoneNumber = (
      maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
    )
    const countryCode = '+55'
    const parsedUnmaskedPhoneNumber = countryCode+unmaskedPhoneNumber(phonenumber)
    // console.tron.log(parsedUnmaskedPhoneNumber)
    dispatch(
      signInRequest(
        parsedUnmaskedPhoneNumber, password
      )
    );
  }

  function handleSignUp() {
    navigation.navigate('SignUp',
      // {
      //   phonenumber: test
      // }
    )
  }

  if (signed) {
    navigation.navigate('Home')
  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>
        <StyledScrollView>
          <ImageLogo source={logo} />
          <ImageGodtaskerFont source={godtaskerFont} />
          <Div1>
            <Div2>
              <Title>Usuários</Title>
              <FormWorker>
                <PhoneMask
                  type={'cel-phone'}
                  options={
                    {
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }
                  }
                  placeholder="Número de Whatsapp"
                  returnKeyType="next"
                  value={phonenumber}
                  onChangeText={setPhonenumber}
                  placeholderTextColor={'#ccc'}
                />
                <FormInputWorkerPassword
                  icon="unlock"
                  secureTextEntry={true}
                  placeholder="Senha"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  value={password}
                  onChangeText={setPassword}
                />
                <SubmitButton loading={loading} onPress={handleSubmit}>
                  <ButtonText>Entrar</ButtonText>
                </SubmitButton>
                <SignUpTouchable onPress={handleSignUp}>
                  <SignUpText>Junte-se a godtasker aqui!</SignUpText>
                </SignUpTouchable>
              </FormWorker>
            </Div2>
          </Div1>
          </StyledScrollView>
      </Container>
    </Background>
  );
}
