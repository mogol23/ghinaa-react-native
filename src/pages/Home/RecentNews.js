import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { NewsListItem, Button } from '../../components';
import { Axios } from './../../config';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigation } from '@react-navigation/native';


const styles = {
  wrapper: {
    components: { backgroundColor: 'transparent', width: '90%', maxHeight: '70%', flexWrap: 'nowrap' }
  },
  title: { fontSize: 20, marginBottom: 10, textTransform: 'uppercase' }
}

const RecentNews = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [news, setNews] = useState({});
  Axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
  useEffect(() => {
    getNews();
  }, [])
  
  const ReadNews = (news_id, title) => {
    navigation.navigate('NewsRead', { title: title, news_id: news_id})
  }
  
  const getNews = () => {
    Axios.get('berita/role/3')
    .then(res => {
      setNews(res.data);
    })
    .catch(err => {
      console.error(err.response)
    })
  }
  
  return (
    <ScrollView style={styles.wrapper.components}>
      <Text style={styles.title}>Recent News</Text>
      {
        Object.keys(news).map(key => {
          return(
            <TouchableOpacity onPress={() => { ReadNews(news[key]['id'], news[key]['judul']) }}>
              <NewsListItem date='23 Januari 2020' newsTitle={news[key]['judul']} />
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

export default RecentNews;
