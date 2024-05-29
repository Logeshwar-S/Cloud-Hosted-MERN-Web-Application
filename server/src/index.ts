// K0UjJYNxZiz2FXmO
import express, {Express} from "express";
import mongoose from "mongoose"
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://logmatic18l:K0UjJYNxZiz2FXmO@financetracker.vzcbscw.mongodb.net/";

mongoose
    .connect(mongoURI)
    .then (() => console.log("connected"))
    .catch((err) => console.error("failed", err));


app.use("/financial-records", financialRecordRouter);
    
app.listen(port, () => {
    console.log(`server on ${port}`)
})
