import React from 'react';
import { ScrollView, Text } from 'react-native';
import { NewsListItem } from '../../components';

const RecentNews = () => {
  return (
    <ScrollView style={{ backgroundColor: 'transparent', width: '90%', maxHeight: '70%', flexWrap: 'nowrap' }}>
      <Text style={{ fontSize: 20, marginBottom: 10, textTransform: 'uppercase' }}>Recent News</Text>
      <NewsListItem date='23' month='jan' newsTitle='anjay child' />
      <NewsListItem date='1' month='feb' newsTitle='anjay child' />
      <NewsListItem date='3' month='mar' newsTitle='anjay child' />
      <NewsListItem date='4' month='apr' newsTitle='anjay child' />
      <NewsListItem date='30' month='mei' newsTitle='anjay child' />
    </ScrollView>
  )
}

export default RecentNews;
