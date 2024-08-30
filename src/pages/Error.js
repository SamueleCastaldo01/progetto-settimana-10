import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Error() {
  const navigate = useNavigate();
  const color = "#1A4899";

  return (
    <>
      <h1>Errore 404</h1>
      <p>Pagina non trovata</p>
      <Button onClick={() => navigate("/")} variant="contained"   style={{ backgroundColor: color }}>Ritorna al Home Page</Button>
    </>
  );
}

export default Error;
