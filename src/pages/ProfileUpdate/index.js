import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import FormSantri from './FormSantri';
import FormAlumni from './FormAlumni';
import FormOrtu from './FormOrtu';

const ProfileUpdate = () => {
  const {user} = useContext(AuthContext);
  
  if(user.user.role_id == 2){
    return <FormOrtu />
  }
  if(user.user.role_id == 3){
    return <FormSantri />
  }
  if(user.user.role_id == 4){
    return <FormAlumni />
  }
}

export default ProfileUpdate;