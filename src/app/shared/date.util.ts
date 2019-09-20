export class DateUtils {
    static getDateToday() {
        return new Date();
    }

    static getPrevDateToday() {
        return new Date(this.getDateToday().getTime() - (24 * 60 * 60 * 1000));
    }
    
    static getLastMonth() {
        return new Date(this.getDateToday().getTime() - (30 * 24 * 60 * 60 * 1000));
    }
}