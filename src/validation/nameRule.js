import { string } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

const { blank: firstNameBlank, invalid:firstNameInvalid } = copy.errors.firstName;
const { blank: lastNameBlank, invalid:lastNameInvalid } = copy.errors.lastName;

const nameRule = (blank, invalid) => string()
  .required(blank)
  .matches("^[a-zA-Z]*$", invalid);


export const firstNameRule = nameRule(firstNameBlank, firstNameInvalid);
export const lastNameRule = nameRule(lastNameBlank, lastNameInvalid);
