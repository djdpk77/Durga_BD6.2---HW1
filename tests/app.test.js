let {
  app,
  getEmployees,
  getEmployeeById,
  addEmployee,
} = require('../index.js');
let http = require('http');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getEmployees should return a list of employees', () => {
    const mockEmployees = [
      { id: 1, name: 'John Doe', position: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', position: 'Product Manager' },
    ];

    getEmployees.mockReturnValue(mockEmployees);

    let result = getEmployees();
    expect(result).toEqual(mockEmployees);
    expect(getEmployees).toHaveBeenCalled();
  });

  test('getEmployeeById should return an employee details', () => {
    const mockEmployee = {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
    };

    getEmployeeById.mockReturnValue(mockEmployee);

    let result = getEmployeeById(1);
    expect(result).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(1);
  });

  test('getEmployeeById should return undefined for a non-existent employee', () => {
    getEmployeeById.mockReturnValue(undefined);

    let result = getEmployeeById(99);
    expect(result).toBeUndefined();
    expect(getEmployeeById).toHaveBeenCalledWith(99);
  });

  test('addEmployee should add a new employee', () => {
    const newEmployee = {
      id: 4,
      name: 'Alice Johnson',
      position: 'Marketing Manager',
    };

    addEmployee.mockReturnValue(newEmployee);

    let result = addEmployee(newEmployee);
    expect(result).toEqual(newEmployee);
    expect(addEmployee).toHaveBeenCalledWith(newEmployee);
  });
});
