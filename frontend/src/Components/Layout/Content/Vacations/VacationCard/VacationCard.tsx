import { faEdit, faDeleteLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { UserRole } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VactionModel";
import usersLikesService from "../../../Services/UsersLikesService";
import vacationService from "../../../Services/VacationService";
import EditVacationModal from "../EditVacationModal/EditVacationModal";
import "./VacationCard.css";


interface VacationCardProps {
    totalLikes: number;
    userLikes?: number | boolean;
    vacationId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    image: string;
    likes?: number[]
    setRefresh: (e: boolean) => void;
    refresh: boolean;
    imageUrl?: string;

}

function VacationCard(vacation: VacationCardProps): JSX.Element {

    const [isFilled, setIsFilled] = useState(vacation.userLikes);
    const [countLikes, setCountLikes] = useState(vacation.totalLikes);
    const [showModal, setShowModal] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState<VacationModel | null>(null);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [vacationImage, setVacationImage] = useState('');
    const [refreshEditModel , setRefreshEditModel] = useState<boolean>(false)
    const authSlice: any = useSelector((state: any) => state?.authSlice);

    useEffect(() => {
        getVacationImage(vacation);
    }, [])

    async function getVacationImage(vacation: VacationModel) {
        const vacationImageUrl = await vacationService.getVacationImage(vacation.vacationId);
        if (vacationImageUrl) {
            setVacationImage(vacationImageUrl)
        }
    }

    const handleLike = () => {
        setIsFilled(!isFilled);
        if (isFilled !== true) {
            usersLikesService.addUserLike(authSlice?.id, vacation.vacationId);
            let updateCounLikes = countLikes + 1;
            setCountLikes(updateCounLikes)
        } else {
            usersLikesService.deleteUserLike(authSlice?.id, vacation.vacationId);
            let updateCounLikes = countLikes - 1;
            setCountLikes(updateCounLikes)
        }
    }

    async function deleteVacation(id: number) {
        const confirmed = window.confirm("Are you sure you want to delete this vacation?");
        if (confirmed) {
            const res = await vacationService.deleteVacation(id);
            vacation.setRefresh(!vacation.refresh)
            if (res.status === 200) {
                setVacations(vacations.filter((v) => v.vacationId !== id));
            }
        }
    }

    function handleOpenModal(vacations: VacationModel) {
        setSelectedVacation(vacations);
        setShowModal(true);

    }


    return (
        <div className="cardVacation" key={vacation.destination}>
            <div className="image-container">
                {showModal && (
                    <EditVacationModal
                        closeModal={() => setShowModal(false)}
                        vacation={vacation}
                        vacationId={vacation.vacationId}
                        vacationImage={vacationImage}
                        // setRefreshModel={setRefreshEditModel}
                        // refreshEditModel={refreshEditModel}
                    />
                )}

                {authSlice?.role === UserRole.ADMIN ?
                    <>
                        <div className="EditVacation">
                            <Button variant="warning" onClick={() => handleOpenModal(vacation)}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </Button>
                        </div>
                        <div className="deleteVacation">
                            <Button variant="warning" onClick={() => deleteVacation(vacation.vacationId)}>
                                <FontAwesomeIcon icon={faDeleteLeft} /> Delete
                            </Button>
                        </div>
                    </>
                    :
                    <>
                        <button
                            className={isFilled ? "liked" : ""}
                            onClick={() => handleLike()}>
                            <div className="likes">
                                likes {countLikes}
                                <div className="heartbutton">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                            </div>
                        </button>
                    </>
                }
                <div className="imageCard">
                    <img src={vacationImage} alt={vacation.destination} />
                </div>
            </div>

            <div>
                <h5 className="destination"> {vacation.destination} </h5>
            </div>

            <div className="allDates">
                <div className="date">
                    Start Date: {(new Date(vacation.startDate) as Date).getDate()} - {(new Date(vacation.startDate) as Date).getMonth() + 1} - {(new Date(vacation.startDate) as Date).getFullYear()}
                </div>

                <div className="date">
                    End Date: {(new Date(vacation.endDate) as Date).getDate()} - {(new Date(vacation.endDate) as Date).getMonth() + 1} - {(new Date(vacation.endDate) as Date).getFullYear()}
                </div>
            </div>

            <div className="description">
                <span > {vacation.description} </span>
            </div>

            <div
                className="price">${vacation.price}
            </div>
        </div>

    );
}

export default VacationCard;
