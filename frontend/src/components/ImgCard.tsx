import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/Home.css";
import { Fragment, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { useGalleryApi } from "../api/Gallery.api";

function ImgCard({ props }: any) {
    const { id, fileName } = props;
    const [show, setShow] = useState(false);
    const { deletePhoto } = useGalleryApi();

    const handleClose = () => setShow(false);
    return (
        <Fragment>
            <Card style={{ width: "20rem", marginBlock: "1rem", marginInline: "0.5rem", position: "relative" }} className="imge-card-c">
                <Button variant="danger" style={{ position: "absolute", left: "auto", right: "10px", top: "10px", zIndex: 1 }} onClick={async () => {
                    await deletePhoto(id);
                }}>D</Button>
                <Card.Img variant="top" style={{cursor: "pointer" }} src={`http://localhost:3000/gallery/${fileName}`} className="img-overlay-c"  onClick={() => setShow(true)} />
            </Card>
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Button variant="secondary" onClick={handleClose} style={{ position: "absolute", left: "auto", right: "1rem", top: "1rem" }}>
                    Close
                </Button>
                <Image src={`http://localhost:3000/gallery/${fileName}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Modal>
        </Fragment>

    )
}

export default ImgCard;