import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getContractDurationInDays(startDate: string, endDate: string): number {
    return moment(endDate).diff(moment(startDate), 'days');
  }

  public formatDateToText(date: string): string {
    const dateMoment = moment(date);

    if(!dateMoment.isValid()) return '';

    const day = dateMoment.date();     
    const month = dateMoment.format('MMMM');
    const year = dateMoment.year();
    
    const formattedDate = `${day}${this.getDaySuffix(day)} ${month} ${year}`;

    return formattedDate;
  }

  public compareStringsByDay(firstDateString: string, secondDateString: string) {
    const firstDate = moment(firstDateString);
    const secondDate = moment(secondDateString);

    return firstDate.isValid() && secondDate.isValid() && firstDate.isSame(secondDate, 'day');
  }

  private getDaySuffix(day: number) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
}
