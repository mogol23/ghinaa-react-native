import AsyncStorage from '@react-native-community/async-storage';
import { Input, Item, Label, Toast, View, Textarea as TextareaBase } from 'native-base';
import React, { Component } from 'react';
import { Button } from '../../components';
import { AuthContext } from '../../provider/AuthProvider';
import { Axios } from './../../config';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 10
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'stretch'
  }
})

const TextInput = ({ label, ...props }) => {
  return (
    <Item stackedLabel style={styles.item}>
      <Label>{label}</Label>
      <Input {...props} />
    </Item>
  )
}

const TextArea = ({ label, ...props }) => {
  return (
    <Item stackedLabel style={styles.item}>
      <Label>{label}</Label>
      <TextareaBase {...props} />
    </Item>
  )
}

export default class FormOrtu extends Component {
  static contextType = AuthContext;
  state = {
    alamat: '',
    no_telp: ['','','','','']
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    const profiles = this.context.user.profil;
    profiles.map((v, i) => {
      if (v.role_id == 2) {
        if (v.profilable != null) {
          this.setState({
            alamat: v.profilable.alamat
          });
          const telp = v.profilable.telp_santri;
          telp.map((v, i) => {
            this.handleNoSantri(v.no_telp, i);
          })
        }
      }
    })
  }

  saveOrtu = async () => {
    const data = {
      alamat : this.state.alamat,
      no_telp : this.state.no_telp
    };
    
    Axios.defaults.headers.common['Authorization'] = `Bearer ${this.context.user.token}`;
    try {
      const response = await Axios.post('ortu', data);
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      this.context.setUser(response.data);
      Toast.show({
        text: 'Disimpan',
        duration: 3000,
      })
      return true;
    } catch (err) {
      const y = err.response.data.errors;
      const x = Object.keys(y)[0];
      Toast.show({
        text: err.response.data.errors[x][0],
        duration: 3000,
      });

    }
  }

  handleNoSantri = (value, index) => {
    var telp = this.state.no_telp;
    telp[index] = value;
    this.setState({ no_telp: telp });
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.component}>
          <TextArea rowSpan={5} label="Alamat" placeholder="alamat lengkap" value={`${this.state.alamat}`} onChangeText={value => this.setState({ alamat: value })} />
          <TextInput label="No Telp Santri 1" keyboardType={'numeric'} placeholder="Santri yang anda wali-kan" value={`${(this.state.no_telp[0])}`} onChangeText={value => this.handleNoSantri(value, 0)} />
          <TextInput label="No Telp Santri 2" keyboardType={'numeric'} placeholder="Santri yang anda wali-kan (jika ada)" value={`${(this.state.no_telp[1])}`} onChangeText={value => this.handleNoSantri(value, 1)} />
          <TextInput label="No Telp Santri 3" keyboardType={'numeric'} placeholder="Santri yang anda wali-kan (jika ada)" value={`${(this.state.no_telp[2])}`} onChangeText={value => this.handleNoSantri(value, 2)} />
          <TextInput label="No Telp Santri 4" keyboardType={'numeric'} placeholder="Santri yang anda wali-kan (jika ada)" value={`${(this.state.no_telp[3])}`} onChangeText={value => this.handleNoSantri(value, 3)} />
          <TextInput label="No Telp Santri 5" keyboardType={'numeric'} placeholder="Santri yang anda wali-kan (jika ada)" value={`${(this.state.no_telp[4])}`} onChangeText={value => this.handleNoSantri(value, 4)} />
          <Button text='Simpan' onPress={() => { this.saveOrtu() }} />
        </View>
      </ScrollView>
    );
  }
}