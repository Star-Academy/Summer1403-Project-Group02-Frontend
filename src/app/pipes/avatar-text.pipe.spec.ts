import { AvatarTextPipe } from './avatar-text.pipe';

describe('AvatarTextPipe', () => {
  it('create an instance', () => {
    const pipe = new AvatarTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return first letter of each word', () => {
    const pipe = new AvatarTextPipe();
    expect(pipe.transform('name family')).toBe('NF');
  });

  it('should return first 2 letter of one word', () => {
    const pipe = new AvatarTextPipe();
    expect(pipe.transform('name')).toBe('NA');
  });

  it('should return default value', () => {
    const pipe = new AvatarTextPipe();
    expect(pipe.transform('')).toBe('@tui.user');
  });

});
