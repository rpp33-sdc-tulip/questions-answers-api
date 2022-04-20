import http from 'k6/http';

const BASE_URL = 'http://localhost:8080';
const randomProductId = Math.trunc(Math.random() * (298010 - 268209) + 268209);
const randomQuestionsId = Math.trunc(Math.random() * (536416 - 482774) + 482774);
const postQuestion = `${BASE_URL}/qa/questions`;
const postAnswer = `${BASE_URL}/qa/questions/${randomQuestionsId}/answers`;

const postQuestionPayload = {
  body: 'This is a test questions',
  name: 'tester',
  email: 'test@test.com',
  product_id: randomProductId,
};

const postAnswerPayload = {
  body: 'This is a test Answer',
  name: 'tester',
  email: 'test@test.com',
  photos: [],
};

export default function () {
  // post request here
  http.post(postAnswer, postAnswerPayload);
}

// k6 run --vus 100 --duration 30s testing/k6post_script.js
