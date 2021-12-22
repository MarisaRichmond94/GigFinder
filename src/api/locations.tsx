import BaseApi from 'api/base';

class Locations extends BaseApi {
  constructor() {
    super('locations');
  }
};

const LocationsApi = new Locations();
export default LocationsApi;

