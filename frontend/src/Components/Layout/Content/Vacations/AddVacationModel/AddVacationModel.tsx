
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VactionModel";
import vacationService from "../../../Services/VacationService";
import "./AddVacationModel.css";



interface AddVacationProps {
    closeModal: () => void;
}

function AddVacationModel({ closeModal }: AddVacationProps): JSX.Element {
    const { register, handleSubmit } = useForm<VacationModel>();


    const onSubmit = async (data: VacationModel) => {

        if (data.editImageFile && data.editImageFile[0]) {
            const file = data.editImageFile[0];
            data.image = file.name;
        }

        await vacationService.addVacation(data);
        closeModal();
        
    };

    return (
        <Form>
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add vacation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Destination:</Form.Label>
                        <Form.Control type="text"  {...register("destination", { required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea"  {...register("description", { required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control type="date" {...register("startDate", { required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date:</Form.Label>
                        <Form.Control type="date"  {...register("endDate", { required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number"  {...register("price", { required: true, min: 0 })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image: </Form.Label>
                        <Form.Control title="test" type="file" accept="image/*"  {...register("editImageFile")} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Add Vacation
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>

    );
}

export default AddVacationModel;

