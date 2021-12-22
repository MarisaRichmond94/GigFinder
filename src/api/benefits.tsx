
import BaseApi from 'api/base';

class Benefits extends BaseApi {
  constructor() {
    super('benefits');
  }
};

const BenefitsApi = new Benefits();
export default BenefitsApi;

