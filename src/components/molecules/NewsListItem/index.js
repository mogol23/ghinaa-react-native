import React from 'react';
import { Text, View } from 'react-native';

const styles = {
  wrapper: {
    component: { height: 50, flexDirection: 'row', marginVertical: 1 },
    date: { width: 50, height: 50, backgroundColor: '#28ca8f', justifyContent: 'center', alignItems: 'center', padding: 2 },
    news: { flex: 1, backgroundColor: '#21ae7a', paddingVertical: 2, paddingHorizontal: 4, flexWrap: 'nowrap', justifyContent: 'space-around' }
  },
  date: {
    day: {
      color: 'black', fontSize: 17, fontWeight: 'bold'
    },
    month: {
      color: 'black', fontSize: 12, textTransform: 'capitalize'
    }
  },
  news: {
    text: {
      fontSize: 15, color: 'white',
    }
  }
}

const NewsListItem = ({ date, month, newsTitle }) => {
  return (
    <View style={styles.wrapper.component}>
      <View style={styles.wrapper.date}>
        <Text style={styles.date.day}>{date}</Text>
        <Text style={styles.date.month}>{month}</Text>
      </View>
      <View style={styles.wrapper.news}>
        <Text style={styles.news.text}>{newsTitle}</Text>
      </View>
    </View>
  )
}

export default NewsListItem;