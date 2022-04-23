import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
};

// create random product and question id in last 10% of database
const randomProductId = Math.trunc(Math.random() * (298010 - 268209) + 268209);
const randomQuestionsId = Math.trunc(Math.random() * (536416 - 482774) + 482774);

const BASE_URL = 'http://localhost:8080';
// const getQuestions = http.get(`${BASE_URL}/qa/questions?product_id=${randomProductId}`);
// const getAnswers = http.get(`${BASE_URL}/qa/questions/${randomQuestionsId}/answers`);

export default function () {
  const getAnswers = http.get(`${BASE_URL}/qa/questions/${randomQuestionsId}/answers`);
  const getQuestions = http.get(`${BASE_URL}/qa/questions?product_id=${randomProductId}`);

  // get request here
  getAnswers;
  sleep(1);
}

// STAGES EXAMPLE FROM DOCS

// export const options = {
//   stages: [
//     { duration: '30s', target: 20 },
//     { duration: '1m30s', target: 10 },
//     { duration: '20s', target: 0 },
//   ],
// };

// export default function () {
//   const res = http.get('https://httpbin.test.k6.io/');
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }
