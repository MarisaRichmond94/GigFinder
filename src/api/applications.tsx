import BaseApi from 'api/base';

class Applications extends BaseApi {
  constructor() {
    super('applications');
  }
}

const ApplicationsApi = new Applications();
export default ApplicationsApi;
