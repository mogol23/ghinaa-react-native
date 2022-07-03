import {AxiosResponse} from 'axios';
import {fidlyApiInstance, digitalBrokerApiInstance} from '../utils';

function send(
  code: String,
  base: String,
  quote: String,
  base_amount: String,
  quote_amount: String,
  date: Date | String,
  from: String,
  to: String,
): Promise<AxiosResponse> {
  return fidlyApiInstance.post('api/transfer', {
    code,
    base,
    quote,
    base_amount,
    quote_amount,
    date,
    from,
    to,
    status: 'transfered',
  });
}

function history(page: Number, perPage: Number): Promise<AxiosResponse> {
  return digitalBrokerApiInstance.get(`member/transactions/${page}/${perPage}`);
}

export default {
  send,
  history,
};
