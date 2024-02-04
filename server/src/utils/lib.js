import { DateTime } from 'luxon';

export const fromPSQLDate = (date) => DateTime.fromJSDate(new Date(date));
