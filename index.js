const createEmployeeRecord = function (employeeDetail) {
    return {
        firstName: employeeDetail[0],
        familyName: employeeDetail[1],
        title: employeeDetail[2],
        payPerHour: employeeDetail[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (employeeData) {
    return employeeData.map(function (employeeDetail) {
        return createEmployeeRecord(employeeDetail)
    })
}

let createTimeInEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: dateStamp.split(' ')[0]
    })

    return employee
}

let createTimeOutEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: dateStamp.split(' ')[0]
    })

    return employee
}


function hoursWorkedOnDate(employeeRecord, date) {
    const timeInObject = employeeRecord.timeInEvents.find(object => {
        object.date == date
    })

    const timeOutObject = employeeRecord.timeOutEvents.find(object => {
        object.date == date
    })

    return timeOutObject.hour - timeInObject.hour
}

const wagesEarnedOnDate = function (employee, dateSought) {
    const rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

const allWagesFor = function (employee) {
    const eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date
    })


    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(function (rec) {
        return rec.firstName === firstName
    })
}

const calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}

