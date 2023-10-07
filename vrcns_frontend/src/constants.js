export const _api_url = "http://217.18.60.195:8080"

export const userTestMapper = [
    {key: "number", name: "№"},
    {key: "uDate", name: "Дата"},
    {key: "userSurname", name: "Фамилия"},
    {key: "userName", name: "Имя"},
    {key: "userGroup", name: "Группа"},
    {key: "uTime", name: "Время"},
    {key: "points", name: "Баллы"},
    {key: "mark", name: "Оценка"},
]

export const userMistakesMapper = [
    {key: "number", name: "№"},
    {key: "mistakeMessage", name: "Ошибка"}
]


export const userTestMistakesMapper = [
    {key: "item", name: "№"},
    {key: "errorMessage", name: "Ошибка"},
]

export const pieChartMapper = {
    3: [
        "#62ee1d",
        "#fdf109",
        "#e71c3b",
    ],
    4: [
        "#62ee1d",
        "#e3ff00",
        "#fd9b09",
        "#e71c3b",
    ],
    5: [
        "#62ee1d",
        "#aaff00",
        "#fdf109",
        "#e7771c",
        "#e71c3b",
    ]
}