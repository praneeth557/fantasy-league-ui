

export class Batting {
  pid: number = 0;
  runs: number = 0;
  balls: number = 0;
  sixes: number = 0;
  fours: number = 0;
  isDuck: number = 0;

  constructor(pid: number) {
    this.pid = pid;
  }
}

export class Bowling {
  pid: number = 0;
  overs: number = 0;
  maidens: number = 0;
  runs: number = 0;
  wickets: number = 0;

  constructor(pid: number) {
    this.pid = pid;
  }
}

export class Fielding {
  pid: number = 0;
  catches: number = 0;
  stumpings: number = 0;
  runouts: number = 0;

  constructor(pid: number) {
    this.pid = pid;
  }
}
