


export class ExerciseController 
{
  private db;
    constructor(db) {
      this.db = db;
    }
    handle(request, response) {
        request.on("data", (data) => {
            console.log("receiving data");
          });
          request.on("end", async () => {
            console.log("req end", this);

            const result = await this.db.get("SELECT * FROM exercise");
            console.log("result", result);
            response.write("Hello " + result.ex_name);
            response.end();
          });
    }
}