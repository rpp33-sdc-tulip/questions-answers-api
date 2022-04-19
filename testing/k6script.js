import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '5s',
  // scenarios: {
  //   open_model: {
  //     executor: 'constant-arrival-rate',
  //     rate: 10,
  //     timeUnit: '1s',
  //     duration: '10s',
  //     preAllocatedVUs: 10,
  //   },
  // },

};

// create math.random function for random product id

const qParams = {
  product_id: 294511,
  page: 1,
  count: 100,
};

export default function () {
  http.get(`http://localhost:8080/qa/questions?product_id=${qParams.product_id}&count=${qParams.count}&page=${qParams.page}`);
  sleep(1);
}
