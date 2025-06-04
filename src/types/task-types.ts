export interface Task {
    title: string;
    matter: string;
    url: string;
    matterUrl: string;
    rawStart: string | null;
    dateStart: string | null;
    rawEnd: string;
    dateEnd: string;
    daysLeft: number;
    status: StatusTask;
    dateDetailsInPortuguese: string | null;
    taskDetails: string | null;
}

export type StatusTask = 'upcoming' | 'due' | 'overdue' | 'completed';
