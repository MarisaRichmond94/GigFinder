import BaseApi from 'api/base';

class EmployerReviews extends BaseApi {
  constructor() {
    super('employerReviews');
  }
};

const EmployerReviewsApi = new EmployerReviews();
export default EmployerReviewsApi;
