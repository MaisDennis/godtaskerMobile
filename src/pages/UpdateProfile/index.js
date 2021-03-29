import React, { useState } from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
// -----------------------------------------------------------------------------
import Background from '~/components/Background';
import {
  AllIcon,
  ButtonText,
  Container,
  Form, FormInput,
  ImageView,
  Options,
  PhoneMask,
  SignUpErrorText,
  SubmitButton,
  UserImage,
} from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import api from '~/services/api';
// -----------------------------------------------------------------------------
export default function UpdateProfile({ navigation, route }) {
  const user = useSelector(state => state.user.profile);
  const userData = useSelector(state => state.user.profile)
  // const previewImage = useSelector(state => state.image.image);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [userName, setUserName] = useState(user.user_name);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState(user.birth_date);
  const [gender, setGender] = useState(user.gender);
  const [signUpError, setSignUpError] = useState();
  const [imagePath, setImagePath] = useState();
  const [previewImage, setPreviewImage] = useState();

  // const schema = Yup.object().shape({
  //   first_name: Yup.string().required('O nome é obrigatório'),
  //   last_name: Yup.string().required('O sobrenome é obrigatório'),
  //   user_name: Yup.string().required('O nome de usuário é obrigatório'),
  //   password: Yup.string().min(6,'No mínimo 6 caracteres.').required('A senha é obrigatorória'),
  //   confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'A senha confirmada não é igual'),
  //   // phonenumber: Yup.string()
  //   // .required()
  //   // .min(11),
  //   email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
  //   birth_date: Yup.string(),
  //   gender: Yup.string().required('Escolha o gênero'),
  // });

  // console.log(user)
  // const lastNameRef = useRef();
  // const userNameRef = useRef();
  // const passwordRef = useRef();
  // const confirmPasswordRef = useRef();
  // const phonenumberRef = useRef();
  // const emailRef = useRef();
  // const birthDateRef = useRef();
  // const genderRef = useRef();

  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro', '']

  async function handleUpdatePhoto() {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async image => {
      // console.log(image.path)
      setImagePath(image.path)
      const formData = new FormData();
      formData.append('profileImage', {
        uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
        type: "image/jpg",
        name: `profile_${user.id}.jpg`,
      });

      try {
        const response = await api.post('files', formData);
        const { image } = response.data;
        setPreviewImage(image)
      }
      catch(err) {
        Alert.alert(
          'Erro ao carregar a foto.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OKBJ')
            }
          ],
          {cancelable: false }
        )
      }
    })
  }

  function handleSubmit() {
    try {
      dispatch(updateProfileRequest({
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        email: email,
        birth_date: birthDate,
        gender,
        image: previewImage,
        // preview,
      }));
      // navigation.goBack();
      console.log('dispatch profile OK')
    }
    catch {
      setSignUpError('erro nos dados');
    }

  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>

        <Form contentContainerStyle={{ alignItems: 'center' }}>
        <AllIcon name='user'/>
          <TouchableOpacity onPress={() => handleUpdatePhoto()}>
            <ImageView>
              { imagePath
                ? (
                  <UserImage
                    source={{uri: imagePath}}
                  />
                )
                : (
                  <>
                    { userData === undefined || userData.avatar === null
                      ? (
                        <>
                          <UserImage
                            source={require('~/assets/insert_photo-24px.svg')}
                          />
                          <Text>n/a</Text>
                        </>
                      )
                      : (
                        <UserImage
                          source={
                            userData.avatar
                              ? { uri: userData.avatar.url }
                              : null
                          }
                        />
                      )
                    }
                  </>
                )
              }

            </ImageView>
          </TouchableOpacity>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome"
            placeholderTextColor="#ccc"
            returnKeyType="next"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Sobrenome"
            placeholderTextColor="#ccc"
            // onSubmitEditing={() => userNameRef.current.focus()}
            value={lastName}
            onChangeText={setLastName}
            // ref={lastNameRef}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome de usuário"
            placeholderTextColor="#ccc"
            // onSubmitEditing={() => passwordRef.current.focus()}
            value={userName}
            onChangeText={setUserName}
            // ref={userNameRef}
          />
          {/* <HrLine/> */}
          <AllIcon name='info'/>
          {/* <PhoneMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            placeholder="DDD + Número de whatsapp"
            placeholderTextColor="#ccc"
            returnKeyType="next"
            value={phonenumber}
            onChangeText={setPhonenumber}
            // ref={phoneNumberRef}
          /> */}
          <PhoneMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="Data de nascimento (DD/MM/YYYY)"
            placeholderTextColor="#ccc"
            returnKeyType="next"
            value={birthDate}
            onChangeText={setBirthDate}
            // ref={birthDateRef}
          />
          {/* <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="gênero"
            // onSubmitEditing={() => passwordRef.current.focus()}
            value={gender}
            onChangeText={setGender}
            // ref={genderRef}
          /> */}
          <Options
            selectedValue={gender}
            onValueChange={setGender}
            placeholder="Gênero"
          >
            { genderOptions.map(g => (
              <Options.Item key={g} label={g} value={g}/>
            ))}
          </Options>
          <FormInput
            keboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="e-mail"
            // onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            // ref={emailRef}
          />
          {/* <HrLine/> */}
          <AllIcon name='unlock'/>
          <FormInput
            secureTextEntry
            placeholder="Sua antiga senha"
            returnKeyType="send"
            // onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
            // ref={passwordRef}
          />
          <FormInput
            secureTextEntry
            placeholder="Sua nova senha"
            returnKeyType="send"
            // onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
            // ref={passwordRef}
          />
          <FormInput
            secureTextEntry
            placeholder="Confirmar a nova senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            // ref={confirmPasswordRef}
          />
          {signUpError && (
            <SignUpErrorText>{signUpError}</SignUpErrorText>
          )}
          <SubmitButton onPress={handleSubmit}>
            <ButtonText>Enviar</ButtonText>
          </SubmitButton>

        </Form>

      </Container>
    </Background>
  );
}
