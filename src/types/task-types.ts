export interface Task {
    title: string;
    matter: string;
    url: string;
    rawStart: string;
    dateStart: Date;
    rawEnd: string;
    dateEnd: Date;
    daysLeft: number;
    status: string;
    dateDetailsInPortuguese: string;
    taskDetails: string;
}