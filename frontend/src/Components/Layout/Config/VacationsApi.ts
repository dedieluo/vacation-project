

class VacationApi {

    STARTED_VACATAIONS_API = 'http://localhost:3001/api/startedVacations';
    NOT_STARTED_VACATIONS_API = 'http://localhost:3001/api/notStartedVacations';
    GET_ALL_VACATIONS_API = 'http://localhost:3001/api/vacations'
    DELETE_VACATION = 'http://localhost:3001/api/vacations/id'
    EDIT_VACATION = 'http://localhost:3001/api/vacations/'
    ADD_VACATION = 'http://localhost:3001/api/vacations/'

}

const vacationApi = new VacationApi;

export default vacationApi