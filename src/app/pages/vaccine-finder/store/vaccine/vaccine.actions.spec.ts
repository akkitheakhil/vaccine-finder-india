import * as fromPost from './vaccine.actions';

describe('loadListOfStates', () => {
  it('should return an action', () => {
    expect(fromPost.loadListOfStates().type).toBe('[Vaccine] Load Vaccine States');
  });
});
