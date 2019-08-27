/**
 * dependencias:
 * yarn add axios
 *
 * cria uma API, a partir de um documento .json:
 * yarn global add json-server
 *
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
