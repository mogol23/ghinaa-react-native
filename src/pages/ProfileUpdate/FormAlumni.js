import AsyncStorage from '@react-native-community/async-storage';
import { Input, Item, Label, Toast, View } from 'native-base';
import React, { Component } from 'react';
import { Button, Dropdown } from '../../components';
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

export default class FormAlumni extends Component {
  static contextType = AuthContext;
  state = { tahun_lulus: '', jenjang_terakhir: '', jenjang_pendidikan: {} }

  componentDidMount() {
    this.getProfile();
    this.getJenjangPendidikan();
  }

  getProfile = () => {
    const profiles = this.context.user.profil;
    profiles.map((v, i) => {
      if (v.role_id == 4) {
        if(v.profilable != null){
          this.setState({
            tahun_lulus: v.profilable.tahun_lulus,
            jenjang_terakhir: v.profilable.jenjang_terakhir,
          });
        }
      }
    })
  }

  getJenjangPendidikan = () => {
    Axios.get('ref/profil/jenjangpendidikan')
      .then(res => {
        // console.log(res);
        const data = res.data;
        this.setState({ jenjang_pendidikan: data })
      })
      .catch(err => {
        console.log(err)
        Toast.show({
          position: 'bottom',
          type: 'danger',
          duration: 3000,
          text: 'Tidak dapat mengambil data dari server'
        })
      })
  }

  saveAlumni = () => {
    this.context.setLoading(true)
    const data = {
      tahun_lulus: this.state.tahun_lulus,
      jenjang_terakhir: this.state.jenjang_terakhir
    };
    
    Axios.defaults.headers.common['Authorization'] = `Bearer ${this.context.user.token}`;
    Axios.post('alumni', data)
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
        <TextInput label="Tahun Lulus" keyboardType={'numeric'} value={`${this.state.tahun_lulus}`} onChangeText={value => this.setState({ tahun_lulus: value })} />
        <Dropdown placeholder='Jenjang Terakhir' list={this.state.jenjang_pendidikan} onValueChange={value => { this.setState({ jenjang_terakhir: value }) }} selectedValue={this.state.jenjang_terakhir} />
        <Button text='Simpan' onPress={() => { this.saveAlumni() }} />
      </View>
    );
  }
}