import BaseApi from 'api/base';

class UserGigs extends BaseApi {
  constructor() {
    super('userGigs');
  }
};

const UserGigsApi = new UserGigs();
export default UserGigsApi;
