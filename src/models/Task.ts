export class Task {
    constructor(
        public title: string,
        public description: string,
        public priority: string,
        public status: string,
        public deadline: Date,
        public userId?: number,
        public id?: number,
    ) { }
}
