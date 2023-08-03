import { FormEvent, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useAlbumApi } from "../api/Album.api"

function AddAlbum() {
    const [name, setName] = useState<string>('')
    const  {addAlbum} = useAlbumApi();
    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addAlbum(name);
        setName('');
    }
    return (
        <section>
            <Form style={{ width: "50%", marginBlock: "1rem", marginInline: "25%" }} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Album Name</Form.Label>
                    <Form.Control type="text" name="album_name" value={name || ''} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Button type="submit" style={{marginBlock: "1rem"}}>Submit</Button>
            </Form>
        </section>
    )
}

export default AddAlbum