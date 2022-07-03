import moment from 'moment';
import { transfer as transferHelper } from '../helpers';
import { store } from '../redux';
import transfer from '../redux/actions/transfer';
import { conversion as conversionService } from '../services';
import conversion from './../redux/actions/conversion';

async function confirm(code: String) {
  const {
    user: { collector },
  } = store.getState();
  return await conversionService.confirm(code, {
    code,
    pos: collector.identifier,
  });
}

async function findConversionRequest(code: String) {
  if (code?.length < 2) {
    return;
  }
  try {
    conversion.fetchStart();
    const response = await conversionService.findConversionRequest(code);
    conversion.setState({
      search_results: response.data,
    });
  } catch (error) {
  } finally {
    conversion.fetchEnd();
  }
}

async function removeConversionRequest(code: String) {
  return await conversionService.removeConversionRequest(code);
}

async function confirmDemoConversion(code: String): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let sampleResponse = {
      success: true,
      data: {
        code: code,
        pos: 'INDE|SOC1_MAG',
        base: 'eur',
        quote: 'base',
        quote_amount: '0.01523',
        base_amount: '5',
        executed_at: moment().unix(),
      },
    };

    if (code.toLowerCase().includes('success')) {
      const {
        transfer: { histories },
      } = store.getState();
      const temp = [...histories];
      temp.push({
        id: moment().unix(),
        offer: sampleResponse.data,
        createdAt: moment().toDate(),
      });

      const final = await transferHelper.sort(temp);
      transfer.setState({
        histories: final,
      });
      sampleResponse.success = true;
    } else {
      sampleResponse.success = false;
    }

    setTimeout(() => {
      resolve(sampleResponse);
    }, 2000);
  });
}

export default {
  confirm,
  findConversionRequest,
  removeConversionRequest,
  confirmDemoConversion,
};
