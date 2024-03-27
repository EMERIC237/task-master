export class Task {
    constructor(
        public userId: number,
        public title: string,
        public description: string,
        public priority: string,
        public status: string,
        public deadline: Date
    ) { }
}
