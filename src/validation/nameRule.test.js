import { nameRule } from './nameRule';
import { object } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

describe('When testing a first name', () => {
  const {blank, invalid} = copy.errors.firstName;
  
  const params = [
    [undefined, blank], 
    ['', blank],
    ['123', invalid],
  ];

  it.each(params)(
    'throw an error if given the value of "%s"',
    async ( invalidInput, expectedErrorMessage ) => {
      let actualErrors;

      const validator = object({
        firstName: nameRule,
      });

      try {
        await validator.validate({ firstName: invalidInput });
      } catch (e) {
        actualErrors = e.errors;
      }

      expect(actualErrors).toStrictEqual([expectedErrorMessage]);
    }
  );

  it.each(['John','Jane'])('should accept valid input: "%s"',async (validName) =>{
    const validator = object({
      firstName: nameRule,
    });
    
    const result = await validator.isValid({ firstName: validName })
    expect(result).toBe(true);
  })
});
