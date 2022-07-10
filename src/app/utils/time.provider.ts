import * as moment from 'moment-timezone';
import { Injectable } from '@angular/core';
/**
 * https://momentjs.com/docs/#/displaying/
 */
export enum DatetimeFormatEnum {
    FULL_DATE_TIME = 'YYYY-MM-DDTHH:mm:ss.SSSSS',
    FULL_DATE_TIME_ZONED = 'YYYY-MM-DDTHH:mm:ss.SSSSSZ',
    TILL_DATE = 'YYYYMMDD',
    TILL_DATE_DOTS = 'DD.MM.YYYY.HHmm',
    TILL_MONTH = 'YYYYMM',
    DATE_FORMAT_HTML_DEFAULT = 'YYYY-MM-DD',
    TILL_HOUR = 'YYYYMMDDHH',
    TILL_SECOND = 'YYYYMMDDHHmmss',
    TILL_YEAR = 'YYYY',
    TILL_MINUTE = 'YYYYMMDDHHmm',
    TILL_WEEK = 'YYYYww',
    ONLY_MINUTE = 'mm',
    ONLY_HOUR_MINUTE = 'HHmm',
    ONLY_WEEK_DAY_HOUR_MINUTE = 'dHHmm',
    ONLY_DAY_HOUR_MINUTE = 'DDHHmm',
    ONLY_SECOND = 'ss',
    FORMAT_HOUR_MINUTE_MERIDIEM = 'h:mm a',
    FORMAT_FULL_DETAILS_V_1 = 'dddd, MMM Do, h:mm a',
    DAY_NAME = 'ddd',
    DATE_FORMAT = 'DD MMM\'YY',
    MONTH_FORMAT = 'MMM',

}

@Injectable({ providedIn: "root" })
export class DateTimeProvider {
    constructor() {
        moment.tz.setDefault('Asia/Kolkata');
    }

    getCurrentMilies(): number {
        return moment.now();
    }

    getCurrentDateTime(format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment().format(format);
    }

    getFormattedDateTime(dateTime: string): any {
        return moment(dateTime);
    }

    getStartOfDayMilies(): number {
        return moment().startOf('day').valueOf();
    }

    getStartOfMonthMilies(): number {
        return moment().startOf('month').valueOf();
    }


    getEndOfMonthMilies(): number {
        return moment().endOf('month').valueOf();
    }

    getStartOfDayMiliesByDate(dateTime: string): number {
        return moment(dateTime).startOf('day').valueOf();
    }
    getEndOfDayMilies(): number {
        return moment().endOf('day').valueOf();
    }

    static getStaticCurrentDateTime(format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment().format(format);
    }

    getMilies(dateTime: string, format = DatetimeFormatEnum.FULL_DATE_TIME): number {
        if (format == DatetimeFormatEnum.ONLY_WEEK_DAY_HOUR_MINUTE) {
            return this.weekDayHourMinute(dateTime);
        }
        return moment(dateTime, format).valueOf();
    }

    private weekDayHourMinute(dateTime: string): number {
        const hourMinute = moment(dateTime.slice(1, dateTime.length), 'HHmm');
        return moment().day(parseInt(dateTime.slice(0, 1))).startOf('day').add(hourMinute.hour(), 'hour').add(hourMinute.minute(), 'minute').valueOf();
    }

    getDay(dateTime: string, format = DatetimeFormatEnum.FULL_DATE_TIME): number {
        return moment(dateTime, format).day();
    }

    getYear(dateTime: string, format = DatetimeFormatEnum.FULL_DATE_TIME): number {
        return moment(dateTime, format).year();
    }

    isLeapYear(dateTime: number): boolean {
        return moment(this.getDateTime(dateTime)).isLeapYear();
    }

    getDayOfYear(dateTime: string, format = DatetimeFormatEnum.FULL_DATE_TIME): number {
        return moment(dateTime, format).dayOfYear();
    }

    getDateTime(milies: number, format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment(milies).format(format);
    }

    convertDateTimeFormat(currentDateTime: string, currentFormat = DatetimeFormatEnum.FULL_DATE_TIME, newFormat = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return this.getDateTime(this.getMilies(currentDateTime, currentFormat), newFormat);
    }

    addDays(givenMilies: number, days: number, format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment(givenMilies).add(days, 'days').format(format);
    }

    substractDays(givenMilies: number, days: number, format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment(givenMilies).subtract(days, 'days').format(format);
    }

    addYears(givenMilies: number, days: number, format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment(givenMilies).add(days, 'years').format(format);
    }

    getPreviousDayDateTime(dayNumber: any, format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment().add(-dayNumber, 'days').format(format);
    }
    getPreviousMonthDateTime(monthNumber: any, format = DatetimeFormatEnum.FULL_DATE_TIME): string {
        return moment().add(-monthNumber, 'month').format(format);
    }

    checkIsBetween(format: string, first: string, middle: string, last: string): boolean {
        const time = moment(middle, format);
        const beforeTime = moment(first, format);
        const afterTime = moment(last, format);
        return moment(time).isBetween(beforeTime, afterTime);
    }

    checkIsBefore(first: string, last: string) {
        return moment(first).isBefore(last);
    }

    checkIsAfter(first: string, last: string) {
        return moment(first).isAfter(last);
    }
}
