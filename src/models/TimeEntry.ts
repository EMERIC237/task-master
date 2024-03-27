export class TimeEntry {
    constructor(
        public taskId: number,
        public startTime: Date,
        public endTime: Date,
        public duration: number
    ) { }
}