import BaseApi from 'api/base';

class Employers extends BaseApi {
  constructor() {
    super('employers');
  }
}

const EmployersApi = new Employers();
export default EmployersApi;
