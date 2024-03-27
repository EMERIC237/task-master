export class DailyPlan {
  constructor(
    public userId: number,
    public date: Date
  ) { }
}


export class DailyPlanTask {
  constructor(
    public dailyPlanId: number,
    public taskId: number,
    public timeSlotStart: Date,
    public timeSlotEnd: Date
  ) { }
}
