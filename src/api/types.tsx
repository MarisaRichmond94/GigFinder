import BaseApi from 'api/base';

class Types extends BaseApi {
  constructor() {
    super('types');
  }
};

const TypesApi = new Types();
export default TypesApi;
