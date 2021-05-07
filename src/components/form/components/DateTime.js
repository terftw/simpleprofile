const monthOptions = [
    {
        key: "Jan",
        value: "January",
        text: "January"
    },
    {
        key: "Feb",
        value: "February",
        text: "February"
    },
    {
        key: "Mar",
        value: "March",
        text: "March"
    },
    {
        key: "Apr",
        value: "April",
        text: "April"
    },
    {
        key: "May",
        value: "May",
        text: "May"
    },
    {
        key: "Jun",
        value: "June",
        text: "June"
    },
    {
        key: "Jul",
        value: "July",
        text: "July"
    },
    {
        key: "Aug",
        value: "August",
        text: "August"
    },
    {
        key: "Sep",
        value: "September",
        text: "September"
    },
    {
        key: "Oct",
        value: "October",
        text: "October"
    },
    {
        key: "Nov",
        value: "November",
        text: "November"
    },
    {
        key: "Dec",
        value: "December",
        text: "December"
    },
]
const monthStringToNum = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
}
const generateYears = current => {
    const arr = [];
    const yearOption = {};

    for (let i = current; i >= 1962; i--) {
        yearOption.key = i;
        yearOption.value = i;
        yearOption.text = i;
        arr.push(Object.assign({}, yearOption));
    }

    return arr;
}
const currentYear = new Date().getFullYear();
const yearOptions = generateYears(currentYear);

const timeSort = (workExps) => {
    const expToSort = [ ...workExps ];

    expToSort.sort((currExp, nextExp) => {
        const currTime =  new Date(currExp.startYear, monthStringToNum[currExp.startMonth]);
        const nextTime =  new Date(nextExp.startYear, monthStringToNum[nextExp.startMonth]);

        return (nextTime - currTime);
    })

    return expToSort;
}

export {
    monthOptions,
    monthStringToNum,
    yearOptions,
    timeSort
}
