import sinon from 'sinon';
import UserVaccineStatusService from '../../src/service/UserVaccineStatusService';
import DBConnecterRepository from '../../src/repository/Transactions';
const data = require('../utils/UserVaccineStatus.json');

describe('getUserVaccineStatusByUserId', () => {
  let dbRepoStub;
  beforeEach(function () {
    dbRepoStub = sinon.stub(DBConnecterRepository, 'findAllByCondition');
  });
  afterEach(function () {
    dbRepoStub.restore();
  });
  it('should fetch user vaccine status for given user key', async () => {
    const dataByUserKey = (data, nic) => data.filter(record => record.nic == nic);
    dbRepoStub.returns(Promise.resolve(dataByUserKey(data, 'TestNIC1')));
    const result = await UserVaccineStatusService.getUserVaccineStatusByUserId('TestNIC1');
    expect(result.length).toBe(2);
    expect(result[0].status).toBe('COMPLETED');
  });
  it('should fetch empty array if user not found', async () => {
    const dataByUserKey = (data, nic) => data.filter(record => record.nic == nic);
    dbRepoStub.returns(Promise.resolve(dataByUserKey(data, 'TestNIC100')));
    const result = await UserVaccineStatusService.getUserVaccineStatusByUserId('TestNIC100');
    expect(result.length).toBe(0);
  })
});

describe('saveUserVaccineStatusByUserId', () => {
  let dbRepoStub;
  beforeEach(function () {
    dbRepoStub = sinon.stub(DBConnecterRepository, 'bulkInsertDataByColumns');
  });
  afterEach(function () {
    dbRepoStub.restore();
  });
  it('should save user vaccine status for given user key', async () => {
    dbRepoStub.returns(Promise.resolve({}));
    const result = await UserVaccineStatusService.saveUserVaccinseStatusByUserId('TestNIC1', 1, 'PENDING');
  });
});


describe('deleteUserVaccineStatusByUserId', () => {
  let dbRepoStub;
  beforeEach(function () {
    dbRepoStub = sinon.stub(DBConnecterRepository, 'bulkDeleteData');
  });
  afterEach(function () {
    dbRepoStub.restore();
  });
  it('should delete user vaccine status for given user key', async () => {
    dbRepoStub.returns(Promise.resolve({}));
    const result = await UserVaccineStatusService.deleteVaccineStatusByUserId('TestNIC1', 1);
  });
});
