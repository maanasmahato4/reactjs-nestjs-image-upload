import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useGalleryApi } from "../api/Gallery.api";
import Button from "react-bootstrap/Button";
import ImgCard from "../components/ImgCard";
import "../styles/Home.css";
import { useAlbumApi } from "../api/Album.api";
import { IAlbum } from "../Interface";
import Dropdown from "react-bootstrap/Dropdown";

function Home() {
  const { decodedToken, token } = useContext(AuthContext);

  const [album, setAlbum] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);

  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [fetchedData, setFetcheddata] = useState<object[]>([]);


  const navigate = useNavigate();

  const { getAlbums } = useAlbumApi();
  const { add, getPhotos, getPhotosByAlbum } = useGalleryApi();

  useEffect(() => {
    if (!token || !decodedToken) {
      navigate("/signup");
    }
    if (decodedToken) {
      getPhotos(decodedToken.id).then((res) => setFetcheddata(res));
    }
  }, [token, decodedToken, navigate])

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await getAlbums();
      setAlbums(res);
    }

    fetchAlbums();
  }, [])

  if (!decodedToken) {
    return <h1>Loading...</h1>
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await add({album, files });
  }

  const handleAlbum = async (album: string) => {
    const res = await getPhotosByAlbum(album);
    setFetcheddata(res);
    console.log(res);
  }

  return (
    <div>
      <Form style={{ width: "50%", marginBlock: "1rem", marginInline: "25%" }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Album</Form.Label>
          <Form.Select onChange={(e) => setAlbum((e.target as HTMLSelectElement).value)} placeholder="Your photo albums">
            <option>Your Photo Albums</option>
            {albums.map((item, idx) => {
              return <option key={idx}>{item.album_name}</option>
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setFiles((oldFiles) => [...oldFiles, ...(target.files ? Array.from(target.files) : [])]);
          }
          } multiple required />
        </Form.Group>
        <Button type="submit" style={{ marginBlock: "1rem" }}>Submit</Button>
      </Form>
      <Dropdown style={{marginLeft: "25%", marginRight: "25%", width: "50%"}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Album
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item style={{border: "1px solid black", margin: "0.2rem", width: "96%"}} onClick={() => handleAlbum('')}>All</Dropdown.Item>
          {albums.map((item, idx) => {
            return <Dropdown.Item key={idx} style={{border: "1px solid black", margin: "0.2rem", width: "96%"}} onClick={() => handleAlbum(item.album_name)}>{item.album_name}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
      <section className="cards_section">
        {fetchedData.map((item, idx) => {
          return <ImgCard props={item} key={idx} />
        })}
      </section>
    </div>
  )
}

export default Home;