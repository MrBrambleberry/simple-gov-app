import { string } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

const { blank, invalid } = copy.errors.firstName;

export const nameRule = string()
  .required(blank)
  .matches("^[a-zA-Z]*$", invalid);