import moment from 'moment'

export default (date_string, duration_minutes = 0) => {

    const expiration = moment(date_string).add(duration_minutes, 'minutes')
    const current_date = moment()
    const seconds = moment(expiration).diff(current_date, 'seconds')

    return seconds
}