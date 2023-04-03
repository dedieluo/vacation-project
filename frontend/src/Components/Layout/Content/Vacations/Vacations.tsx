import { useEffect, useState } from "react";
import { VacationModel } from "../../Models/VactionModel";
import vacationService from "../../Services/VacationService";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddVacationModel from "./AddVacationModel/AddVacationModel";
import usersLikesService from "../../Services/UsersLikesService";
import VacationCard from "./VacationCard/VacationCard";
import "./Vacations.css";
import { UserRole } from "../../Models/UserModel";
import { Navigate } from "react-router-dom";


function Vacations(): JSX.Element {
  const perPage = 10
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [countOfAllVacations, setCountOfAllVacations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false)
  const [filters, setFilters] = useState<{ started: boolean, notStarted: boolean, myLiked: boolean }>({
    started: false,
    notStarted: false,
    myLiked: false
  })
  const authSlice: any = useSelector((state: any) => state?.authSlice);


  useEffect(() => {
    getAllVacations(1, perPage, filters);

  }, [refresh, filters.started, filters.notStarted, filters.myLiked]);

  if (!authSlice || !authSlice.id) {
    // user is not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: window.location.origin }} replace />;
  }



  async function getAllVacations(page: number, perPage: number, filters: any) {
    setLoading(true);

    const userId = authSlice?.id;
    const data = await vacationService.getVacations(perPage, page, userId, filters);

    setVacations(data.vacations);
    setCurrentPage(page);
    setTotalPages(Math.ceil(data.countOfAllVacations / perPage));
    setCountOfAllVacations(data.countOfAllVacations)

    setLoading(false);

  }

  async function startedVacaions() {

    const newFilterObject = {
      ...filters,
      started: !filters.started,
    }

    setFilters(newFilterObject)

  }

  async function notStartedVacations() {
    const newFilterObject = {
      ...filters,
      notStarted: !filters.notStarted,
    }

    setFilters(newFilterObject)


  }

  async function myLikedVacations() {
    const newFilterObject = {
      ...filters,
      myLiked: !filters.myLiked,
    }

    setFilters(newFilterObject)

  }

  function handlePageChange(page: number) {
    getAllVacations(page, perPage, filters);
  }

  const checkIfUserLike = (userLikes: any) => {
    if (userLikes === authSlice.id) {
    }
    if (userLikes) {
      return true
    } else {
      return false
    }
  }

  if (loading) {
    return <div className="loading"> Loading...</div>;
  }

  return (
    <div className="Vacations">
      <div className="addButtonCountainer">
        {authSlice?.role === UserRole.ADMIN ?
          <button className="addButton"
            onClick={() => setShowAddModal(true)}>+ Add Vacation
          </button>
          : ''
        }
      </div>

      <div className="countVacations">
        <h4>Total vacations: {countOfAllVacations} </h4>
      </div>

      <div className="button-container">
        {showAddModal && (
          <AddVacationModel
            closeModal={() => setShowAddModal(false)}
          />
        )}

        <button className={`filter-button ${filters.started ? "button-active" : ""}`} onClick={() => startedVacaions()}>Started Vacations</button>
        <button className={`filter-button ${filters.notStarted ? "button-active" : ""}`} onClick={() => notStartedVacations()}>Not Started Vacations</button>
        <button className={`filter-button ${filters.myLiked ? "button-active" : ""}`} onClick={() => myLikedVacations()}>My Liked Vacations</button>
      </div>

      <div className="vacation-container">
        {vacations?.map((vacation) =>
          <VacationCard key={vacation.vacationId} image={vacation.image} vacationId={vacation.vacationId} destination={vacation.destination} description={vacation.description} startDate={vacation.startDate} endDate={vacation.endDate} price={vacation.price} totalLikes={vacation.totalLikes} userLikes={checkIfUserLike(vacation.myLike)} refresh={refresh} setRefresh={setRefresh} />
        )}
      </div>

      <div className="pagination">
        <PaginationComponent
          page={currentPage}
          perPage={perPage}
          totalPage={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Vacations;
