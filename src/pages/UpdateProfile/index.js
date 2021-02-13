import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import Background from '~/components/Background';
import {
  AllIcon,
  ButtonText,
  Container,
  Form, FormInput,
  Options,
  PhoneMask,
  SignUpErrorText,
  SubmitButton,
} from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
// -----------------------------------------------------------------------------
export default function SignUp({ navigation }) {
  const user = useSelector(state => state.user.profile);
  // const image = useSelector(state => state.image.image);
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

  // console.tron.log(user)
  // const lastNameRef = useRef();
  // const userNameRef = useRef();
  // const passwordRef = useRef();
  // const confirmPasswordRef = useRef();
  // const phonenumberRef = useRef();
  // const emailRef = useRef();
  // const birthDateRef = useRef();
  // const genderRef = useRef();

  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro', '']

  function handleSubmit() {
    // console.tron.log({
    //   first_name: firstName,
    //   last_name: lastName,
    //   user_name: userName,
    //   oldPassword,
    //   password,
    //   confirmPassword,
    //   phonenumber,
    //   birth_date: birthDate,
    //   gender,
    //   // image,
    //   // preview
    // })
    try {
      dispatch(updateProfileRequest({
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        birth_date: birthDate,
        gender,
        // image,
        // preview
      }));
      // navigation.goBack();
      console.tron.log('OK')
    }
    catch (error) {
      setSignUpError('erro nos dados');
    }

  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>

        <Form contentContainerStyle={{ alignItems: 'center' }}>
        <AllIcon name='user'/>
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
