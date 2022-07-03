import {store} from '../redux';
import moment from 'moment';

const normalizer = async datas => {
  const {
    user: {
      collector: {identifier},
    },
  } = store.getState();
  return await datas
    .filter(x => x.Transactions.length > 0 && x.identifier == identifier)
    .flatMap(n => n.Transactions);
};

async function removeDuplicated(datas) {
  const {
    transfer: {histories},
  } = store.getState();
  return await datas.filter(
    x => histories.findIndex(y => y.id === x.id) === -1,
  );
}

async function sort(datas) {
  return await datas.sort((a, b) => {
    const x = moment(a.createdAt).unix();
    const y = moment(b.createdAt).unix();
    return y - x;
  });
}

export default {
  normalizer,
  removeDuplicated,
  sort,
};
