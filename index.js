import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import { holidays } from "./holidays.js";

const app = express();
const port = 5000;
app.use(cors());

app.get("/holidays", (request, response) => {
    response.send(holidays);
});

app.get("/is-today-holiday", (request, response) => {
    response.send(IsTodayHoliday(holidays));
});

// app.get("holiday/:id", (request, response) => {
//     response.send(ListHolidays(holidays, request.params.id));
// });

app.listen(port, () => {
    console.log(`Servidor ${chalk.bgGreen(chalk.black(' ON '))} - Porta ${chalk.blue(port)}`);
});

// function ListHolidays(holidays, id) {
//     return holidays.filter(holiday => holiday.date.split("/")[0] === id);
// }

function IsTodayHoliday(day) {
    const today = new Date();
    let holiday = {
        isHoliday: false,
        name: "",
    };

    function setHoliday(name) {
        holiday.isHoliday = true;
        holiday.name = name;
    }

    day.forEach(holy => {
        holy.date === today.toLocaleDateString('en-US') && setHoliday(holy.name)
    });

    return holiday.isHoliday ? `Sim, hoje é ${holiday.name}` : `Não, hoje não é feriado`;
}

