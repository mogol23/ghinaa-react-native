import React from 'react';
import { Dimensions, Image, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Background } from './../assets';
import { Logo } from './../components';
import { colors } from './../utils';


const d = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    minHeight: '100%',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: colors.default,
  },
  background: {
    width: d.width,
    height: d.height,
    position: 'absolute',
    resizeMode: 'stretch',
  }
});

const Ghinaa = ({ children }) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
      <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false} overScrollMode='never'
      >
        <Image source={Background} style={styles.background} />
        <Logo style={{ marginTop: 50, marginBottom: 20, alignSelf: 'center' }} />
        {children}
      </ScrollView>
    </>
  );
}

export default Ghinaa;