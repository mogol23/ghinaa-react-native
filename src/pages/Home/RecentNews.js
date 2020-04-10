import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { NewsListItem, Button } from '../../components';
import { Axios } from './../../config';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigation } from '@react-navigation/native';


const styles = {
  wrapper: {
    components: { backgroundColor: 'transparent', width: '90%', maxHeight: '60%', flexWrap: 'nowrap' }
  },
  title: { fontSize: 20, marginBottom: 10, textTransform: 'uppercase' }
}


const RecentNews = () => {
  const [news, setNews] = useState({});
  const [refreshing, setRefreshing] = React.useState(true);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  
  const ReadNews = (news_id, title) => {
    navigation.navigate('NewsRead', { title: title, news_id: news_id })
  }
  
  useEffect(() => {
    getNews();
  }, []);
  
  
  const getNews = async() => {
    Axios.defaults.headers['Authorization'] = `Bearer ${user.token}`;

    try {
      const res = await Axios.get('berita')
      setNews(res.data);
      setRefreshing(false);
    } catch (err) { 
      console.log(err.response);
      setRefreshing(false)
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNews();
  }, [refreshing]);

  return (
    <ScrollView style={styles.wrapper.components} showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>Kabar baru</Text>
      {
        Object.keys(news).map((key, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => { ReadNews(news[key]['id'], news[key]['judul']) }}>
              <NewsListItem  key={index} date={news[key]['created_at']} newsTitle={news[key]['judul']} />
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

export default RecentNews;
