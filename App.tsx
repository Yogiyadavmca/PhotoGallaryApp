/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Image,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [imageUri, setImageUri] = useState<string | undefined>('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const launchNativeImageLibrary = () => {
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
    } as ImageLibraryOptions;

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets?.length > 0) {
          const asset = response.assets[0];
          setImageUri(asset.uri);
          console.log('response', JSON.stringify(asset));
          // setFileData(response.asset.base64);
          // setFileUri(response.asset.uri);
        }
      }
    }).catch(error => {
      // Error in data saved
      console.log('Error => ' + error);
      //Alert.alert(error);
    });
  };

  const getPhoto = () => {
    launchNativeImageLibrary();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            ...styles.contentView,
          }}>
          <Pressable style={[styles.button]} onPress={getPhoto}>
            <Text style={{color: 'green'}}>{'Select Photo'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    marginTop: 50,
    height: 50,
    width: 'auto',
  },
});

export default App;
