import sinon from 'sinon';
import VaccineCenterAvailabilityService from '../../src/service/VaccineCenterAvailabilityService';
import DBConnecterRepository from '../../src/repository/Transactions';
const data = require('../utils/UserVaccineCenterAvailability.json');

describe('getUserVaccineStatusByUserId', () => {
  let dbRepoStub;
  beforeEach(function () {
    dbRepoStub = sinon.stub(DBConnecterRepository, 'fetchVaccineCenterAvailability');
  });
  afterEach(function () {
    dbRepoStub.restore();
  });
  it('should fetch user vaccine status for given user key', async () => {
    dbRepoStub.returns(Promise.resolve(data));
    const result = await VaccineCenterAvailabilityService.getVaccineCenterAvailability('D3');
    expect(result.length).toBe(2);
    expect(result[0].timseSlotId).toBe(data[0].timseSlotId);
    expect(result[0].validFrom).toBe(data[0].date);
    expect(result[0].validTo).toBe('2021-09-13 00:00:00');
    expect(result[0].currentCount).toBe((data[0].bookedCount));
    expect(result[0].maxCount).toBe(data[0].count * 10);
  });
});