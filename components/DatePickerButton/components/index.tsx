import * as React from 'react';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { NAV_THEME } from '@untr/apps-coip/lib/constants';
import { useColorScheme } from '@untr/apps-coip/lib/useColorScheme';

// TODO: create custom native calendar
// TODO: create web component, use https://ui.shadcn.com/docs/components/calendar

/**
 * @docs https://github.com/wix/react-native-calendars
 */
function CalendarCustom({ theme, ...props }: React.ComponentProps<typeof RNCalendar>) {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const id = React.useId();

  return (
    <RNCalendar
      key={`${id}-${colorScheme}`}
      theme={getTheme(isDarkColorScheme, theme)}
      {...props}
    />
  );
}

function getTheme(
  isThemeDark: boolean,
  customTheme?: React.ComponentProps<typeof RNCalendar>['theme']
): React.ComponentProps<typeof RNCalendar>['theme'] {
  return {
    backgroundColor: NAV_THEME.light.background,
    calendarBackground: NAV_THEME.light.card,
    textSectionTitleColor: NAV_THEME.light.text,
    selectedDayBackgroundColor: ColorsApp.primary,
    selectedDayTextColor: ColorsApp.white,
    todayTextColor: ColorsApp.primary,
    todayDotColor: 'black',
    selectedDotColor: 'black',
    dotColor: 'black',
    textDayFontFamily: FontsUtils.regular,
    dayTextColor: 'black',
    monthTextColor: NAV_THEME.light.text,
    textMonthFontWeight: '600',
    arrowColor: 'black',
    ...customTheme,
  };
}

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  today: 'Today',
};

LocaleConfig.locales['id'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'Mei',
    'Juni',
    'Juli.',
    'Agust.',
    'Sept.',
    'Okt.',
    'Nov.',
    'Des.',
  ],
  dayNames: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  dayNamesShort: ['Sen.', 'Sel.', 'Rab.', 'Kam.', 'Jum.', 'Sab.', 'Min.'],
  today: 'Hari ini',
};

LocaleConfig.defaultLocale = 'en';
export { CalendarCustom, LocaleConfig };
