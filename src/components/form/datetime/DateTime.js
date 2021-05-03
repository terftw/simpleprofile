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
        key: "Sep",
        value: "November",
        text: "November"
    },
    {
        key: "Dec",
        value: "December",
        text: "December"
    },
]

const generateYears = current => {
    const arr = [];
    const yearOption = {

    }

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

console.log(currentYear);

export {
    monthOptions,
    yearOptions
}
