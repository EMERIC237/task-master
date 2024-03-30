export class Task {
    constructor(
        public id: number,
        public userId: number,
        public title: string,
        public description: string,
        public priority: string,
        public status: string,
        public deadline: Date
    ) { }
}
