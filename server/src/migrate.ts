
import * as sqlite3  from 'sqlite3'
import { open } from 'sqlite'
import * as fs from 'fs';

enum Mode {
    Up = 'UP',
    Refresh = 'REFRESH'
};

type ExMuscMapping = {
    Exercise: string, 
    Muscle: string
};

const createExerciseMuscleMappingSQL = (mapping: ExMuscMapping): string => {
    return `INSERT INTO ex_msc_map ('ex_ex_id','musc_musc_id') 
    select ex_id, musc_id
    from exercise
    join muscle_group
    where ex_name = ?
    and musc_name = ?
    ;`
}

const sanitize = s => s.split("\r").join(""); // windows line breaks 

const readCSVToArray = async (filePath:string, delimiter=";"):Promise<Array<ExMuscMapping>> => {
    return new Promise((res, rej) => {
        fs.readFile(filePath, (err, buf) => {
            if (err) rej(err);
            const content = buf.toString()
            const lines = content.split("\n"); // maybe do this platform-specific? the \r on windows breaks the inserts into the sql
            const header = lines.shift()
            const [colName1, colName2] = header.split(delimiter);
            const result = lines.map((line) => {
                const [col1, col2] = line.split(delimiter);
                return {
                    Exercise: col1,
                    Muscle: sanitize(col2)
                }
            })
            res(result);
        })
    })
}
const args = process.argv;
(async () => {
    try { 
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        })
        const mode: Mode = args[2] as Mode; 
        if (mode === Mode.Up) {
            console.log('Mode: UP');
            console.log('migrating');
            await db.migrate({
            })
    
        } else if (mode === Mode.Refresh) {
            console.log('Mode: REFRESH');
            console.log('migrating');
            await db.migrate({
                force:true
            })
        } else {
            throw new Error('not supported mode argument: '+mode);
        }
        const mapping = await readCSVToArray('./migrations/exercise-muscle-map.csv') // expects csv to have header with columns Exercise and Muscle
        for (const [idx, mappingObject] of mapping.entries()) {
            const sql = createExerciseMuscleMappingSQL(mappingObject)
            console.log('running insert:', sql);
            const result = await db.run(sql,mappingObject.Exercise, mappingObject.Muscle)
            console.log('result %o', result);
        }
    } catch(error) {
        console.error(error);
    }
    
})()