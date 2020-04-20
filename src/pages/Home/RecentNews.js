import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text } from 'react-native';
import { NewsListItem } from '../../components';
import { AuthContext } from '../../provider/AuthProvider';
import { Axios } from './../../config';


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textTransform: 'uppercase'
  }
})


const RecentNews = () => {
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const navigation = useNavigation();
  const { user, checkAlive } = useContext(AuthContext);

  const ReadNews = (news_id, title) => {
    navigation.navigate('NewsRead', { title: title, news_id: news_id })
  }

  useEffect(() => {
    getNews();
  }, []);


  const getNews = async () => {
    Axios.defaults.headers['Authorization'] = `Bearer ${user.token}`;

    try {
      const res = await Axios.get('berita')
      setNews(res.data);
      setRefreshing(false);
    } catch (err) {
      console.log(err.response);
      checkAlive();
      setRefreshing(false);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNews();
  }, [refreshing]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Kabar baru</Text>
      <FlatList data={news}
        renderItem={({ item }) =>
          <NewsListItem date={item.created_at} newsTitle={item.judul} onPress={() => { ReadNews(item.id, item.judul) }} />
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default RecentNews;
