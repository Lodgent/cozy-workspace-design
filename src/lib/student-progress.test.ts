import { describe, expect, it } from "vitest";
import { coursePoints, currentStudent, groupLeaderboard, students, totalPoints } from "./student-progress";

describe("course group points", () => {
  it("ranks two whole groups, not individual students", () => {
    const ranking = groupLeaderboard("1");
    expect(ranking.map(group => group.id)).toEqual(["rockets", "stars"]);
    expect(ranking.map(group => group.points)).toEqual([840, 780]);
    expect(ranking.map(group => group.members)).toEqual([3, 3]);
    expect(ranking.some(group => students.some(student => student.id === group.id))).toBe(false);
  });
  it("aggregates only points from the selected course", () => {
    expect(groupLeaderboard("2").map(group => [group.id, group.points])).toEqual([["stars", 560], ["rockets", 480]]);
    expect(groupLeaderboard("3").map(group => group.points)).toEqual([0, 0]);
  });
  it("uses the same personal points for student and teacher views", () => {
    expect(coursePoints(currentStudent, "1")).toBe(320);
    expect(totalPoints(currentStudent)).toBe(480);
    expect(coursePoints(currentStudent, "unknown")).toBe(0);
  });
});