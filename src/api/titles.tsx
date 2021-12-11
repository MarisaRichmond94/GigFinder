import BaseApi from 'api/base';

class Titles extends BaseApi {
  constructor() {
    super('titles');
  }
}

const TitlesApi = new Titles();
export default TitlesApi;

