import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import {
  Container, TitleView, TaskName,
  CameraButton, CameraView, CameraReverseButton, CameraRollButton,
  FlashButton, FooterView,
  // StyledScrollView,
  StyledRNCamera,
} from './styles';
import api from '~/services/api';
import { updateImageRequest } from '~/store/modules/image/actions';
// -----------------------------------------------------------------------------
export default function Confirm({ route }) {
  const { task_id, taskName } = route.params;
  const [toggleFlash, setToggleFlash] = useState(true);
  const [toggleCameraReverse, setToggleCameraReverse] = useState(true);
  const camera = useRef(null);

  async function takePicture() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        // forceUpOrientation: true,
        // fixOrientation: true,
      };
      const data = await camera.current.takePictureAsync(options);

      //************* */
      // console.tron.log(data);
      // const formData = new FormData();

      // formData.append('signature', {
      //   // uri: data.uri,
      //   // // name: `Signature${data.uri}.jpg`,
      //   // type: 'image/jpg',
      //   // name: `${data.uri}_${'1'}.jpg`,
      //   uri: data.uri,
      //   type: 'image/*',
      //   name: `signature_${task_id}.jpg`,
      // });

      const formData = new FormData();
      formData.append('signatureImage', {
        uri: data.uri,
        type: "image/jpg",
        name: `signature_${task_id}.jpg`,
      });

      try {
        const response = await api.post('signatures', formData,
          // {
          //   headers: {
          //     'accept': 'application/json',
          //     'Accept-Language': 'en-US,en;q=0.8',
          //     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          //   }
          // }
        );

        const { signature_id } = response.data;

        await api.put(`tasks/confirm/${task_id}`, {
          signature_id,
        });

        Alert.alert(
          'Confirmação',
          'Enviada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => console.log('OKBJ')
            }
          ],
          {cancelable: false }
        )
      }
      catch {
        Alert.alert(
          'Confirmação',
          'Não foi possível enviar a confirmação.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OKBJ')
            }
          ],
          {cancelable: false }
        )
      }

    }
  }
  // -----------------------------------------------------------------------------
  return (
    <>
    {/* <StyledScrollView> */}
      <Container>
        <TitleView>
          <Icon name="clipboard" size={20} style={{ color: '#222'}}/>
          <TaskName>{taskName}</TaskName>
        </TitleView>
        {/* <CameraView> */}
          <StyledRNCamera
            ref={camera}
            type={ toggleCameraReverse
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
            }
            flashMode={ toggleFlash
              ? RNCamera.Constants.FlashMode.off
              : RNCamera.Constants.FlashMode.on
            }
            captureAudio={false}
          />
        {/* </CameraView> */}
        <FlashButton onPress={() => setToggleFlash(!toggleFlash)}>
          { toggleFlash
            ? (
              <Icon name='zap' size={24} color='#fff'/>
            )
            : (
              <Icon name='zap-off' size={24} color='#fff'/>
            )
          }
        </FlashButton>
        <FooterView>

        <CameraRollButton>
        <Icon name='codepen' size={24} color='#fff'/>
        </CameraRollButton>
        <CameraButton onPress={() => takePicture()}>
          <Icon name='camera' size={24} color='#fff'/>
        </CameraButton>
        <CameraReverseButton onPress={() => setToggleCameraReverse(!toggleCameraReverse)}>
          <Icon name='users' size={24} color='#fff'/>
        </CameraReverseButton>
        </FooterView>
      </Container>
      {/* </StyledScrollView> */}
    </>
  );
}
