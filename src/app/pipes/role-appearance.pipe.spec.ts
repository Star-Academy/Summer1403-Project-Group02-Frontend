import { RoleAppearancePipe } from './role-appearance.pipe';

describe('RoleAppearancePipe Tests', () => {
  it('create an instance', () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe).toBeTruthy();
  });

  it("return 'success' when value is 'SystemAdmin'", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('SystemAdmin')).toBe('success');
  });

  it("return 'warning' when value is 'DataAdmin'", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('DataAdmin')).toBe('warning');
  });

  it("return 'info' when value is 'Analyst'", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('Analyst')).toBe('info');
  });

  it("return 'neutral' by default case", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('123')).toBe('neutral');
  });
});
