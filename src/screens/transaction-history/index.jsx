import { Center, FlatList } from 'native-base';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { transfer as transferApi } from '../../api';
import dateTime from '../../utils/dateTime';
import { AppBar, TransactionListItem } from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  loadNext() {
    this.setState(state => ({
      page: state.page + 1,
    }));
  }

  resetPage() {
    this.setState({
      page: 0,
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      transferApi.history(0);
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page) {
      transferApi.history(this.state.page);
    }
  };

  render() {
    const {
      transfer,
      navigation: { navigate },
    } = this.props;
    return (
      <>
        <AppBar />
        <FlatList
          data={transfer?.histories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const amount = `${item.offer.base_amount} ${item.offer.base} (${item.offer.quote_amount} ${item.offer.quote})`;
            const time = dateTime(item.createdAt);
            return (
              <TransactionListItem
                amount={amount}
                time={time}
                webCode={item.offer.code}
                onPress={() => navigate('TransactionDetail', { data: item })}
              />
            );
          }}
          ListEmptyComponent={
            <TransactionListItem
              leftIconName="exclamation"
              amount="Pas encore de transaction"
              webCode={
                "Si vous pensez avoir effectué une transaction, merci de l'actualiser ou de revenir plus tard."
              }
            />
          }
          refreshing={transfer.fetching}
          onRefresh={this.resetPage.bind(this)}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadNext.bind(this)}
        />
      </>
    );
  }
}

function mapStateToProps({ transfer }) {
  return {
    transfer,
  };
}

export default connect(mapStateToProps)(index);
