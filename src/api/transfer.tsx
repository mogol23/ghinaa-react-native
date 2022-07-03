import {store} from '../redux';
import transfer from '../redux/actions/transfer';
import {transfer as transferService} from '../services';
import {transfer as transferHelper} from '../helpers';

async function history(page: Number) {
  const {
    transfer: {histories},
  } = store.getState();
  try {
    transfer.fetchStart();
    const response = await transferService.history(page, 10);
    const datas = response.data.data;
    let normalized = await transferHelper.normalizer(datas);
    normalized = await transferHelper.removeDuplicated(normalized);

    const final = await transferHelper.sort([...histories, ...normalized]);

    transfer.setState({
      histories: final,
    });
  } catch (error) {
  } finally {
    transfer.fetchEnd();
  }
}

export default {
  history,
};
