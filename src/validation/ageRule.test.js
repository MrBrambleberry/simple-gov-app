import {ageRule} from './ageRule'
import { object } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

describe('When validating an age',()=>{
    const {blank,min, invalid} = copy.errors.age;

    const params = [
        ['',blank], 
        [undefined, blank],
        [0, min],
        [15,min ],
        ['?!', invalid],
        ['Not a number', invalid],
    ];

    it.each(params)('When given the input: "%s" we should recieve the error: "%s"',async (invalidInput, expectedErrorMessage)=>{
      let actualErrors;

      const validator = object({
        age: ageRule,
      });

      try {
        await validator.validate({age: invalidInput});
      } catch (e) {
        actualErrors = e.errors;
      }

      expect(actualErrors).toStrictEqual([expectedErrorMessage]);
    });
})