import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    const myHolidays: Holiday[] = [
        { name: "Chinese New Year", emoji: "🐲", date: new Date("2022-12-21") },
        { name: "Christmas", emoji: "🎅", date: new Date("2022-12-25") },
        { name: "Pi Day", emoji: "📚", date: new Date("2022-03-14") },
        { name: "Thanksgiving Day", emoji: "🦃", date: new Date("2022-11-24") },
        { name: "Independence Day", emoji: "🇺🇸", date: new Date("2022-07-04") }
    ];
    const [holiday, setHoliday] = useState<Holiday>(myHolidays[0]);

    const sortByName = (h1: Holiday, h2: Holiday) => {
        if (h1.name.toLowerCase() > h2.name.toLowerCase()) {
            return 1;
        } else if (h1.name.toLowerCase() < h2.name.toLowerCase()) {
            return -1;
        }
        return 0;
    };

    const sortByDate = (h1: Holiday, h2: Holiday) => {
        if (h1.date > h2.date) {
            return 1;
        } else if (h1.date < h2.date) {
            return -1;
        }
        return 0;
    };

    const getNextHoliday = (method: string): void => {
        const sortedHolidays: Holiday[] = [...myHolidays];
        sortedHolidays.sort(method === "name" ? sortByName : sortByDate);
        const currentIdx: number = sortedHolidays
            .map((h: Holiday): string => h.name)
            .indexOf(holiday.name);

        const newHoliday: Holiday =
            currentIdx === myHolidays.length - 1
                ? sortedHolidays[0]
                : sortedHolidays[currentIdx + 1];

        setHoliday(newHoliday);
    };
    return (
        <div>
            <p>Current Holiday: {holiday.emoji}</p>
            <Button onClick={() => getNextHoliday("name")}>
                Advance by Alphabet
            </Button>
            <Button onClick={() => getNextHoliday("date")}>
                Advance by Year
            </Button>
        </div>
    );
}

interface Holiday {
    name: string;
    emoji: string;
    date: Date;
}