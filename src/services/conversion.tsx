import { AxiosResponse } from 'axios';
import { digitalBrokerApiInstance, fidlyApiInstance } from './../utils';

function confirm(
  code: String,
  data: { code: String; pos: String },
): Promise<AxiosResponse> {
  return digitalBrokerApiInstance.post('conversion/confirm/' + code, data);
}
function findConversionRequest(code: String): Promise<AxiosResponse> {
  return fidlyApiInstance.get('api/confirm_conversion/find/' + code);
}
function removeConversionRequest(code: String): Promise<AxiosResponse> {
  return fidlyApiInstance.delete('api/confirm_conversion/' + code);
}

export default {
  confirm,
  findConversionRequest,
  removeConversionRequest,
};
