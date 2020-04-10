import AsyncStorage from '@react-native-community/async-storage';
import { Input, Item, Label, Toast, View } from 'native-base';
import React, { Component } from 'react';
import { Button } from '../../components';
import { AuthContext } from '../../provider/AuthProvider';
import { Axios } from './../../config';

const styles = {
  wrapper: {
    component: {
      flex: 1,
      padding: 10
    },
    item: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginVertical: 5,
      paddingHorizontal: 10
    }
  }
}

const TextInput = ({ label, ...props }) => {
  return (
    <Item stackedLabel style={styles.wrapper.item}>
      <Label>{label}</Label>
      <Input {...props} />
    </Item>
  )
}

export default class FormSantri extends Component {
  static contextType = AuthContext;
  state = { no_induk: '', no_telp_wali_ortu: '', no_telp_wali_kelas: '', loading: false }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    const profiles = this.context.user.profil;
    profiles.map((v, i) => {
      if (v.role_id == 3) {
        if(v.profilable != null){
          this.setState({
            no_induk: v.profilable.no_induk,
            no_telp_wali_kelas: v.profilable.no_telp_wali_kelas,
            no_telp_wali_ortu: v.profilable.no_telp_wali_ortu,
          });
        }
      }
    })
  }

  saveSantri = () => {
    this.context.setLoading(true)
    const data = {
      no_induk: this.state.no_induk,
      no_telp_wali_kelas: this.state.no_telp_wali_kelas,
      no_telp_wali_ortu: this.state.no_telp_wali_ortu
    };

    Axios.defaults.headers.common['Authorization'] = `Bearer ${this.context.user.token}`;
    Axios.post('santri', data)
      .then(res => {
        const response = res.data;
        AsyncStorage.setItem('user', JSON.stringify(response));
        this.context.setUser(response);
        this.context.setLoading(false)
        Toast.show({
          text: 'Disimpan',
          duration: 3000,
        })
        return true;
      })
      .catch(err => {
        const y = err.response.data.errors;
        const x = Object.keys(y)[0];
        Toast.show({
          text: err.response.data.errors[x][0],
          duration: 3000,
        });
        this.context.setLoading(false)
      })
  }

  render() {
    return (
      <View style={styles.wrapper.component}>
        <TextInput label="No Induk Santri" keyboardType={'numeric'} value={`${this.state.no_induk}`} onChangeText={value => this.setState({ no_induk: value })} />
        <TextInput label="No Telp Wali/Ortu" keyboardType={'numeric'} value={`${this.state.no_telp_wali_ortu}`} onChangeText={value => this.setState({ no_telp_wali_ortu: value })} />
        <TextInput label="No Telp Wali kelas" keyboardType={'numeric'} value={`${this.state.no_telp_wali_kelas}`} onChangeText={value => this.setState({ no_telp_wali_kelas: value })} />
        <Button text='Simpan' onPress={() => { this.saveSantri() }} />
      </View>
    );
  }
}