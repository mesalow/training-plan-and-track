import "mocha";
import { assert } from "chai";

import { ExpectedSet, JackednTan2 } from "./JackednTan2";

describe('JackednTan2', () => {
    it('should calculate T1, first week', () => {
        const jacked = new JackednTan2();
        const actual = jacked.getExpectedSets(1,'T1',120);
        const expected = [{weight:'RM', reps: 10},{weight: 84, reps:6},{weight: 84, reps:6},{weight: 84, reps:'MR'}]
        assert.deepEqual(actual, expected);
    })
    it('should calculate T1, fifth week', () => {
        const jacked = new JackednTan2();
        const actual = jacked.getExpectedSets(5,'T1',120);
        const expected = [{weight:'RM', reps: 2},{weight: 102, reps:2},{weight: 102, reps:2},{weight: 102, reps:2},{weight: 102, reps:'MR'}]
        assert.deepEqual(actual, expected);
    })
    it('should calculate T1, sixth week', () => {
        const jacked = new JackednTan2();
        const actual = jacked.getExpectedSets(6,'T1',120);
        const expected: ExpectedSet[] = [{weight:'RM', reps: 1}]
        assert.deepEqual(actual, expected);
    })
})