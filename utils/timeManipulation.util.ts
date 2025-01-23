import { AmPmTo24Hours, HoursToAmPm } from '@untr/apps-coip/constants/amPmTo24Hour.constants';

export const TimeManipulation = {
  addHour: (hour, setHour) => {
    const status = hour.startsWith('0');
    let numberHour = 0;
    if (status) {
      let splitHour = hour.split('');
      numberHour = Number(splitHour[1]);
    } else {
      numberHour = Number(hour);
    }
    numberHour += 1;
    if (numberHour >= 13) {
      numberHour = 1;
      setHour(`0${numberHour}`);
    } else if (numberHour < 10) {
      setHour(`0${numberHour}`);
    } else {
      setHour(`${numberHour}`);
    }
  },
  reduceHour: (hour, setHour) => {
    const status = hour.startsWith('0');
    let numberHour = 0;
    if (status) {
      let splitHour = hour.split('');
      numberHour = Number(splitHour[1]);
    } else {
      numberHour = Number(hour);
    }
    numberHour -= 1;

    if (numberHour > 0 && numberHour < 10) {
      setHour(`0${numberHour}`);
    } else if (numberHour === 0) {
      numberHour = 12;
      setHour(`${numberHour}`);
    } else {
      setHour(`${numberHour}`);
    }
  },
  addMinute: (minute, setMinute) => {
    const status = minute.startsWith('0');
    let numberMinute = 0;
    if (status) {
      let splitHour = minute.split('');
      numberMinute = Number(splitHour[1]);
    } else {
      numberMinute = Number(minute);
    }
    numberMinute += 1;
    if (numberMinute >= 60) {
      numberMinute = 1;
      setMinute(`0${numberMinute}`);
    } else if (numberMinute < 10) {
      setMinute(`0${numberMinute}`);
    } else {
      setMinute(`${numberMinute}`);
    }
  },
  reduceMinute: (minute, setMinute) => {
    const status = minute.startsWith('0');
    let numberMinute = 0;
    if (status) {
      let splitHour = minute.split('');
      numberMinute = Number(splitHour[1]);
    } else {
      numberMinute = Number(minute);
    }
    numberMinute -= 1;
    if (numberMinute >= 0 && numberMinute <= 10) {
      setMinute(`0${numberMinute}`);
    } else if (numberMinute < 0) {
      numberMinute = 59;
      setMinute(`${numberMinute}`);
    } else {
      setMinute(`${numberMinute}`);
    }
  },

  changeAmPm: (amPm, setAmPm) => {
    if (amPm == 'AM') {
      setAmPm('PM');
    } else {
      setAmPm('AM');
    }
  },
  convertAmPmTo24Hours: (timeData: string) => {
    const sampleTime = timeData.split(':');
    const hour = sampleTime[0];
    const amPm = sampleTime[2];

    const joinSampleTime = `${hour}${amPm}`;

    return AmPmTo24Hours[joinSampleTime];
  },
  convertHourToAmPm: (timeData: string) => {
    const sampleTime = timeData.split(':');
    const hour = HoursToAmPm[sampleTime[0]].split(' ');
    const hourFixed = `${hour[0]}:${sampleTime[1]}:${hour[1]}`;
    return hourFixed;
  },
};
