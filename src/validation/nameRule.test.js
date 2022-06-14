import { firstNameRule, lastNameRule } from './nameRule';
import { object } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

const names = [
  ['firstName', firstNameRule, copy.errors.firstName ],
  ['lastName', lastNameRule, copy.errors.lastName ],
];


describe.each(names)('When testing a %s', (name, rule, errorCopy) => {
  const {blank, invalid} = errorCopy;
  
  const params = [
    [undefined, blank], 
    ['', blank],
    ['123', invalid],
  ];

  it.each(params)(
    'throws an error if given the value of "%s"',
    async ( invalidInput, expectedErrorMessage ) => {
      let actualErrors;

      const validator = object({
        [name]: rule,
      });

      try {
        await validator.validate({ [name]: invalidInput });
      } catch (e) {
        actualErrors = e.errors;
      }

      expect(actualErrors).toStrictEqual([expectedErrorMessage]);
    }
  );

  it.each(['John','Jane'])('should accept valid input: "%s"',async (validName) =>{
    const validator = object({
      [name]: rule,
    });
    
    const result = await validator.isValid({ [name]: validName })
    expect(result).toBe(true);
  });
});
