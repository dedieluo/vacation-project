import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VactionModel";
import vacationService from "../../../Services/VacationService";
import "./EditVacationModal.css";


interface EditVacationProps {
  closeModal: () => void;
  vacation: VacationModel | null;
  vacationId: number;
  vacationImage?: string;
  // setRefreshModel: (e: boolean) => any;
  // refreshEditModel: boolean;

}

function EditVacationModal({ closeModal, vacation }: EditVacationProps): JSX.Element {
  const { register, handleSubmit } = useForm<VacationModel>();

  const onSubmit = async (data: VacationModel) => {

    if (data.editImageFile && data.editImageFile[0]) {
      const file = data.editImageFile[0];
      data.image = file.name;
    } else {
      data.editImageFile = null;
      if (vacation?.image) {
        data.image = vacation?.image;
      }
    }

    await vacationService.editVacation(data);
    closeModal();
    window.location.reload();
  };


  return (
    <Form>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit vacation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Vacation ID:</Form.Label>
            <Form.Control defaultValue={vacation?.vacationId} {...register("vacationId")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Destination:</Form.Label>
            <Form.Control type="text" defaultValue={vacation?.destination} {...register("destination", { required: true })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" defaultValue={vacation?.description} {...register("description", { required: true })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date:</Form.Label>
            <Form.Control type="date" defaultValue={vacation?.startDate.toString().slice(0, 10)} {...register("startDate", { required: true })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date:</Form.Label>
            <Form.Control type="date" defaultValue={vacation?.endDate.toString().slice(0, 10)} {...register("endDate", { required: true })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>

            <Form.Control type="number" defaultValue={vacation?.price.toString()} {...register("price", { required: true, min: 0 })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image: {vacation?.image}</Form.Label>
            {<img src={vacation?.imageUrl} alt={vacation?.destination} />}
            <Form.Control title="test" type="file" accept="image/*"  {...register("editImageFile")} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>

  );
}

export default EditVacationModal;
