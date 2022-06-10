import { firstNameRule } from './firstNameRule';
import { object } from 'yup';
import * as copy from '../pages/personalDetails/copy.json';

describe('When testing a first name', () => {
  const params = [[{}], [{ firstName: undefined }], [{ firstName: '' }]];

  it.each(params)(
    'should not be empty when given the value "%s"',
    async (parameter) => {
      const expectedErrors = [copy.errors.firstName.blank];
      let actualErrors;

      const validator = object({
        firstName: firstNameRule,
      });

      try {
        await validator.validate(parameter);
      } catch (e) {
        actualErrors = e.errors;
      }

      expect(actualErrors).toStrictEqual(expectedErrors);
    }
  );

  it('should not allow non latin characters', async () => {
    const expectedErrors = [copy.errors.firstName.invalid];
    let actualErrors;

    const validator = object({
      firstName: firstNameRule,
    });

    try {
      await validator.validate({ firstName: '123' });
    } catch (e) {
      actualErrors = e.errors;
    }

    expect(actualErrors).toStrictEqual(expectedErrors);
  });
});
