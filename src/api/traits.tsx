import BaseApi from 'api/base';

class Traits extends BaseApi {
  constructor() {
    super('traits');
  }
};

const TraitsApi = new Traits();
export default TraitsApi;
