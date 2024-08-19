import { UsernamePipe } from './username.pipe';

describe('UsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new UsernamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the username with @', () => {
    const pipe = new UsernamePipe();
    expect(pipe.transform('username')).toEqual('@username');
  });

  it('should return the username with @ when value is "@username"', () => {
    const pipe = new UsernamePipe();
    expect(pipe.transform('@username')).toEqual('@username');
  });

  it('should return an empty string if the value is empty string', () => {
    const pipe = new UsernamePipe();
    expect(pipe.transform('')).toEqual('');
  });
});
