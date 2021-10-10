export class Validator {
    private rules: ValidationRule[];
    private errors: ValidationError[];
    constructor(rules) {
        this.rules = rules;
    }

    public validate(requestBody):boolean
    {
        const _validate = (path, type, requestBody) => {
            if (type === 'Object' && path.split(".").length>0) {

            }
        }

        this.errors = this.rules.reduce((agg, rule: ValidationRule) => {
            if (!rule.required) {
                return agg;
            }

            return [...agg, {rule, message: 'not valid' }];
        }, []);
        return this.errors.length === 0;
    }

    public getErrors(): ValidationError[]
    {
        return [];
    }
}

interface ValidationRule {
    path: string,
    required: boolean,
    type: "Array" | "Object" | "string" | "number"
}

interface ValidationError {
    rule: ValidationRule,
    message: string
}