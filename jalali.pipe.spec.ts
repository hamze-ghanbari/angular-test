import { TestBed } from '@angular/core/testing';
import { JalaliPipe, JalaliTimePipe } from '@shared/pipes/jalali.pipe';

fdescribe('JalaliPipe', () => {
  let pipe: JalaliPipe, timePipe: JalaliTimePipe;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        JalaliPipe,
        JalaliTimePipe
      ]
    });
    pipe = TestBed.inject(JalaliPipe);
    timePipe = TestBed.inject(JalaliTimePipe);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('1# TEST_transform_Date_to_jalali1', () => {
    expect(pipe.transform(new Date)).toMatch("^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$");
    expect(pipe.transform(new Date)).not.toBe(new Date);
  });

  it('2# TEST_transform_Date_to_jalali2', () => {
    expect(pipe.transform('0001-01-01T00:00:00')).toBe('');
  });

  it('3# TEST_transform_Date_to_jalali3', () => {
    expect(pipe.transform('0622-03-21')).toEqual('');
    expect(pipe.transform('0622-03-22')).not.toEqual('');
  });

  it('4# TEST_transform_Date_to_jalaliTime1', () => {
    expect(timePipe.transform(new Date)).toMatch("^[0-9]{2}\:[0-9]{2}\:[0-9]{2}$");
    expect(timePipe.transform(new Date)).not.toMatch("^[0-9]{2}\:[0-9]{1}\:[0-9]{2}$");
  });

  it('5# TEST_transform_Date_to_jalaliTime2', () => {
    expect(timePipe.transform('0001-01-01T00:00:00')).toBe('');
  });

  it('6# TEST_transform_Date_to_jalaliTime3', () => {
    expect(timePipe.transform('0622-03-21')).toEqual('');
  });


});
