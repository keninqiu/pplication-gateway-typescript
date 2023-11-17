import * as mongoose from "mongoose";
class Db {
    static startconnection(version: number, dropFlag:number=0) {
        if(dropFlag && version != 1) {
            console.log('dangerous drop');
            process.exit(1);
        }
        let MONGODB_URL = '';

        
        MONGODB_URL = process.env.MONGODB_URL + '_' + version;

        console.log('MONGODB_URL===', MONGODB_URL);

        mongoose.connect(MONGODB_URL, { retryWrites: false }).then(() => {
            //don't show the log when it is test
        //   console.log("App is running ... \n");
        //   console.log("Press CTRL + C to stop the process. \n");
          if(dropFlag == 1) {
            mongoose.connection.db.dropDatabase();
          }
        }).catch((err: any) => {
                console.error("App starting error:", err.message);
                process.exit(1);
        });
    }

    static async closeConnection() {
        await mongoose.connection.close();
    }
}

export default Db;