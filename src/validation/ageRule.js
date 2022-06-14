import { string } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

const { blank, min, invalid } = copy.errors.age;

export const ageRule = string()
  .required(blank)
  .matches("^[0-9]*$", invalid)
  .test('is over sixteen years old', min, value => parseInt(value) > 15 );
