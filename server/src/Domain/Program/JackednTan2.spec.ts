import "mocha";
import { assert } from "chai";

import { ExpectedSet, JackednTan2 } from "./JackednTan2";

describe('JackednTan2', () => {
    describe('T1', () => {
        it('should calculate T1, first week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(1,'T1',120);
            const expected: ExpectedSet[] = [{weight:'RM', reps: 10},{weight: 84, reps:6},{weight: 84, reps:6},{weight: 84, reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T1, fifth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(5,'T1',120);
            const expected: ExpectedSet[] = [{weight:'RM', reps: 2},{weight: 102, reps:2},{weight: 102, reps:2},{weight: 102, reps:2},{weight: 102, reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T1, sixth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(6,'T1',120);
            const expected: ExpectedSet[] = [{weight:'RM', reps: 1}]
            assert.deepEqual(actual, expected);
        })
    });
    describe('T2a', () => {
        it('should calculate T2a, first week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(1, 'T2a', 100);
            const expected: ExpectedSet[] = [{weight:60,reps:10},{weight:60,reps:10},{weight:60,reps:10},{weight:60,reps:10}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2a, fourth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(4, 'T2a', 100);
            const expected: ExpectedSet[] = [{weight:75,reps:4},{weight:75,reps:4},{weight:75,reps:4},{weight:75,reps:4},{weight:75,reps:4}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2a, fifth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(5, 'T2a', 100);
            const expected: ExpectedSet[] = [{weight:80,reps:2},{weight:80,reps:2},{weight:80,reps:2},{weight:80,reps:2},{weight:80,reps:2},{weight:80,reps:2},{weight:80,reps:2}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2a, six week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(6, 'T2a', 100);
            const expected: ExpectedSet[] = []
            assert.deepEqual(actual, expected);
        })
    })
 
})