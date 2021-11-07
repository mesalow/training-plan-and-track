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
            const expected: ExpectedSet[] = [{weight:65,reps:10},{weight:65,reps:10},{weight:65,reps:10},{weight:65,reps:10}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2a, fourth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(4, 'T2a', 100);
            const expected: ExpectedSet[] = [{weight:80,reps:4},{weight:80,reps:4},{weight:80,reps:4},{weight:80,reps:4},{weight:80,reps:4}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2a, fifth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(5, 'T2a', 100);
            const expected: ExpectedSet[] = [{weight:85,reps:2},{weight:85,reps:2},{weight:85,reps:2},{weight:85,reps:2},{weight:85,reps:2},{weight:85,reps:2},{weight:85,reps:2}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2a, six week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(6, 'T2a', 100);
            const expected: ExpectedSet[] = []
            assert.deepEqual(actual, expected);
        })
    })
    describe('T2b', () => {
        it('should calculate T2b, first week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(1, 'T2b', 100);
            const expected: ExpectedSet[] = [{weight:'RM',reps:15},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2b, fourth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(4, 'T2b', 100);
            const expected: ExpectedSet[] = [{weight:'RM',reps:8},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2b, fifth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(5, 'T2b', 100);
            const expected: ExpectedSet[] = [{weight:'RM',reps:6},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T2b, six week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(6, 'T2b', 100);
            const expected: ExpectedSet[] = []
            assert.deepEqual(actual, expected);
        })
    });
    describe('T3', () => {
        it('should calculate T3, first week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(1, 'T3', 100);
            const expected: ExpectedSet[] = [{weight:'RM',reps:20},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T3, fourth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(4, 'T3', 100);
            const expected: ExpectedSet[] = [{weight:'RM',reps:14},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T3, fifth week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(5, 'T3', 100);
            const expected: ExpectedSet[] = [{weight:'RM',reps:12},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'},{weight:'Set1',reps:'MR'}]
            assert.deepEqual(actual, expected);
        })
        it('should calculate T3, six week', () => {
            const jacked = new JackednTan2();
            const actual = jacked.getExpectedSets(6, 'T3', 100);
            const expected: ExpectedSet[] = []
            assert.deepEqual(actual, expected);
        })
    })
})