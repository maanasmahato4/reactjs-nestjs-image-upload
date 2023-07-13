import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useGalleryApi } from "../api/Gallery.api";
import Button from "react-bootstrap/Button";
import ImgCard from "../components/ImgCard";
import "../styles/Home.css";

function Home() {
  const { decodedToken, token } = useContext(AuthContext);

  const [title, setTitle] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);
  const [fetchedData, setFetcheddata] = useState<object[]>([]);


  const navigate = useNavigate();

  const { add, getPhotos } = useGalleryApi();

  useEffect(() => {
    if (!token || !decodedToken) {
      navigate("/signup");
    }
    if (decodedToken) {
      getPhotos(decodedToken.id).then((res) => setFetcheddata(res));
    }
  }, [token, decodedToken, navigate])

  if (!decodedToken) {
    return <h1>Loading...</h1>
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await add({ title, files });
  }

  return (
    <div>
      <Form style={{ width: "50%", marginBlock: "1rem", marginInline: "25%" }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" required onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setFiles((oldFiles) => [...oldFiles, ...(target.files ? Array.from(target.files) : [])]);
          }
          } multiple required/>
        </Form.Group>
        <Button type="submit" style={{ marginBlock: "1rem" }}>Submit</Button>
      </Form>
      <section className="cards_section">
        {fetchedData.map((item, idx) => {
          return <ImgCard props={item} key={idx} />
        })}
      </section>
    </div>
  )
}

export default Home;