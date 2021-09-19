import { assert } from 'chai';
import 'mocha';
import { Router } from './router';

describe('router::route', () => {
    it('should find the correct Controller-Class', () => {
        const db = {};
        const router = new Router(db as any)
        const className = router.getControllerClassName('/exercise')
        assert.equal(className,'ExerciseController')
    })
    it('should find the NotFound-Class', () => {
        const db = {};
        const router = new Router(db as any)
        const className = router.getControllerClassName('/asdfasdf')
        assert.equal(className,'NotFoundController')
    })
})