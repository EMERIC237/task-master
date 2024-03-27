export class Review {
    constructor(
        public userId: number,
        public taskId: number,
        public date: Date,
        public summary: string,
        public actionItems: string
    ) { }
}