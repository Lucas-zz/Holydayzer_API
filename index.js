import express from 'express';
import chalk from 'chalk';
import cors from 'cors';

import { holidays } from "./holidays.js";

const app = express();
const port = 5000;
app.use(cors);

app.get("/holidays", (request, response) => {
    response.send(holidays);
});

app.get("/is-today-holiday", (request, response) => {
    const today = new Date();

    const todayHoliday = holidays.find(holiday => holiday.date === today.toLocaleDateString());

    if (todayHoliday) {
        response.send(`Sim, hoje é ${holidays.name}`);
    } else {
        response.send(`Não, hoje não é feriado`);
    }
});

// app.get("holidays/:month", (request, response) => {
//     const monthHolidays = holidays.filter(holiday => holiday.date.split("/")[0] === request.params.month)

//     response.send(monthHolidays);
// })

app.listen(port, () => {
    console.log(`Servidor ${chalk.bgGreen(chalk.black(' ON '))} - Porta ${chalk.magenta(port)} - ${chalk.blue(`http://localhost:${port}/holidays`)}`);
});