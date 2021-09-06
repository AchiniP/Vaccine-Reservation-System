import sinon from 'sinon';
import VaccineCenterService from '../../src/service/VaccineCenterService';
import DBConnecterRepository from '../../src/repository/Transactions';
const data = require('../utils/VaccineCenteList.json');

describe('getUserVaccineStatusByUserId', () => {
  let dbRepoStub;
  beforeEach(function () {
    dbRepoStub = sinon.stub(DBConnecterRepository, 'findAll');
  });
  afterEach(function () {
    dbRepoStub.restore();
  });
  it('should fetch user vaccine status for given user key', async () => {
    dbRepoStub.returns(Promise.resolve(data));
    const result = await VaccineCenterService.getVaccineCenterList();
    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('TestVC1');
  });
})
