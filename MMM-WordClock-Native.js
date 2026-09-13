Module.register("MMM-WordClock-Native", {
    defaults: {
        size: "960px",
        inactiveOpacity: 0.10,
        updateAtMinuteBoundary: true
    },

    matrix: [
        "ESKISTAFÜNF",
        "ZEHNZWANZIG",
        "DREIVIERTEL",
        "VORFUNKNACH",
        "HALBAELFÜNF",
        "EINSXAMZWEI",
        "DREIPMJVIER",
        "SECHSNLACHT",
        "SIEBENZWÖLF",
        "ZEHNEUNKUHR"
    ],

    words: {
        ES: [[1,1],[1,2]],
        IST: [[1,4],[1,5],[1,6]],

        MIN_FUENF: [[1,8],[1,9],[1,10],[1,11]],
        MIN_ZEHN: [[2,1],[2,2],[2,3],[2,4]],
        ZWANZIG: [[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],[2,11]],

        DREIVIERTEL: [[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11]],
        VIERTEL: [[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11]],

        VOR: [[4,1],[4,2],[4,3]],
        NACH: [[4,8],[4,9],[4,10],[4,11]],

        HALB: [[5,1],[5,2],[5,3],[5,4]],

        STUNDE_ELF: [[5,6],[5,7],[5,8]],
        STUNDE_FUENF: [[5,8],[5,9],[5,10],[5,11]],

        STUNDE_EIN: [[6,1],[6,2],[6,3]],
        STUNDE_EINS: [[6,1],[6,2],[6,3],[6,4]],
        STUNDE_ZWEI: [[6,8],[6,9],[6,10],[6,11]],

        STUNDE_DREI: [[7,1],[7,2],[7,3],[7,4]],
        STUNDE_VIER: [[7,8],[7,9],[7,10],[7,11]],

        STUNDE_SECHS: [[8,1],[8,2],[8,3],[8,4],[8,5]],
        STUNDE_ACHT: [[8,8],[8,9],[8,10],[8,11]],

        STUNDE_SIEBEN: [[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]],
        STUNDE_ZWOELF: [[9,7],[9,8],[9,9],[9,10],[9,11]],

        STUNDE_ZEHN: [[10,1],[10,2],[10,3],[10,4]],
        STUNDE_NEUN: [[10,4],[10,5],[10,6],[10,7]],

        UHR: [[10,9],[10,10],[10,11]]
    },

    hourWords: {
        0: "STUNDE_ZWOELF",
        1: "STUNDE_EINS",
        2: "STUNDE_ZWEI",
        3: "STUNDE_DREI",
        4: "STUNDE_VIER",
        5: "STUNDE_FUENF",
        6: "STUNDE_SECHS",
        7: "STUNDE_SIEBEN",
        8: "STUNDE_ACHT",
        9: "STUNDE_NEUN",
        10: "STUNDE_ZEHN",
        11: "STUNDE_ELF"
    },

    start() {
        this.scheduleUpdate();
    },

    getStyles() {
        return ["MMM-WordClock-Native.css"];
    },

    scheduleUpdate() {
        const now = new Date();
        const delay =
            (60 - now.getSeconds()) * 1000 -
            now.getMilliseconds() +
            100;

        setTimeout(() => {
            this.updateDom(0);

            this.minuteTimer = setInterval(() => {
                this.updateDom(0);
            }, 60000);
        }, delay);
    },

    getHourWord(hour, fullHour) {
        const normalized = hour % 12;

        // Sonderfall:
        // 01:00 / 13:00 -> "EIN UHR"
        // ansonsten       -> "EINS"
        if (normalized === 1 && fullHour) {
            return "STUNDE_EIN";
        }

        return this.hourWords[normalized];
    },

    getActiveWords(date) {
        const hour = date.getHours();
        const minute = date.getMinutes();

        const currentHour = hour % 12;
        const nextHour = (currentHour + 1) % 12;

        const active = ["ES", "IST"];

        if (minute < 5) {
            active.push(
                this.getHourWord(currentHour, true),
                "UHR"
            );
        } else if (minute < 10) {
            active.push(
                "MIN_FUENF",
                "NACH",
                this.getHourWord(currentHour, false)
            );
        } else if (minute < 15) {
            active.push(
                "MIN_ZEHN",
                "NACH",
                this.getHourWord(currentHour, false)
            );
        } else if (minute < 20) {
            active.push(
                "VIERTEL",
                "NACH",
                this.getHourWord(currentHour, false)
            );
        } else if (minute < 25) {
            active.push(
                "ZWANZIG",
                "NACH",
                this.getHourWord(currentHour, false)
            );
        } else if (minute < 30) {
            active.push(
                "MIN_FUENF",
                "VOR",
                "HALB",
                this.getHourWord(nextHour, false)
            );
        } else if (minute < 35) {
            active.push(
                "HALB",
                this.getHourWord(nextHour, false)
            );
        } else if (minute < 40) {
            active.push(
                "MIN_FUENF",
                "NACH",
                "HALB",
                this.getHourWord(nextHour, false)
            );
        } else if (minute < 45) {
            active.push(
                "ZWANZIG",
                "VOR",
                this.getHourWord(nextHour, false)
            );
        } else if (minute < 50) {
            active.push(
                "DREIVIERTEL",
                this.getHourWord(nextHour, false)
            );
        } else if (minute < 55) {
            active.push(
                "MIN_ZEHN",
                "VOR",
                this.getHourWord(nextHour, false)
            );
        } else {
            active.push(
                "MIN_FUENF",
                "VOR",
                this.getHourWord(nextHour, false)
            );
        }

        return active;
    },

    getActivePositions(date) {
        const positions = new Set();

        for (const word of this.getActiveWords(date)) {
            const coordinates = this.words[word] || [];

            for (const [row, column] of coordinates) {
                positions.add(`${row}-${column}`);
            }
        }

        return positions;
    },

    getDom() {
        const now = new Date();
        const activePositions = this.getActivePositions(now);
        const activeDots = now.getMinutes() % 5;

        const clock = document.createElement("div");
        clock.className = "wordclock-native";
        clock.style.width = this.config.size;
        clock.style.height = this.config.size;
        clock.style.setProperty(
            "--wordclock-inactive-opacity",
            this.config.inactiveOpacity
        );

        for (let dotNumber = 1; dotNumber <= 4; dotNumber++) {
            const dot = document.createElement("span");
            dot.className =
                "wordclock-dot wordclock-dot-" + dotNumber;

            if (dotNumber <= activeDots) {
                dot.classList.add("active");
            }

            clock.appendChild(dot);
        }

        const letterArea = document.createElement("div");
        letterArea.className = "wordclock-letterarea";

        this.matrix.forEach((rowText, rowIndex) => {
            [...rowText].forEach((letter, columnIndex) => {
                const row = rowIndex + 1;
                const column = columnIndex + 1;

                const cell = document.createElement("span");
                cell.className = "wordclock-letter";
                cell.textContent = letter;

                if (activePositions.has(`${row}-${column}`)) {
                    cell.classList.add("active");
                }

                letterArea.appendChild(cell);
            });
        });

        clock.appendChild(letterArea);

        return clock;
    }
});
