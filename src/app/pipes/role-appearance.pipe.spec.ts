import { RoleAppearancePipe } from './role-appearance.pipe';

describe('RoleAppearancePipe Tests', () => {
  it('create an instance', () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe).toBeTruthy();
  });

  it("return 'success' when value is 'Admin'", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('Admin')).toBe('success');
  });

  it("return 'warning' when value is 'Developer'", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('Developer')).toBe('warning');
  });

  it("return 'neutral' by default case", () => {
    const pipe = new RoleAppearancePipe();
    expect(pipe.transform('123')).toBe('neutral');
  });
});
