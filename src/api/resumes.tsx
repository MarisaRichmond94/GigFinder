import BaseApi from 'api/base';

class Resumes extends BaseApi {
  constructor() {
    super('resumes');
  }
}

const ResumesApi = new Resumes();
export default ResumesApi;

