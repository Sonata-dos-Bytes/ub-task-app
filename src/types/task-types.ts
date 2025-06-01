export interface Task {
    title: string;
    matter: string;
    url: string;
    matterUrl: string;
    rawStart: string;
    dateStart: string;
    rawEnd: string;
    dateEnd: string;
    daysLeft: number;
    status: StatusTask;
    dateDetailsInPortuguese: string;
    taskDetails: string;
}

export type StatusTask = 'upcoming' | 'due' | 'overdue' | 'completed';
