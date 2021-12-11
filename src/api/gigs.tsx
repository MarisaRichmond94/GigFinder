import BaseApi from 'api/base';

class Gigs extends BaseApi {
  constructor() {
    super('gigs');
  }
}

const GigsApi = new Gigs();
export default GigsApi;
