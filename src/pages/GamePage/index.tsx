import { useParams, useNavigate } from 'react-router-dom'
import { Button, Typography } from "antd";
import './styles.modules.scss'

const { Title } = Typography;
export const GamePage = () => {
  const { gameName} = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="Game-page-wrapper">
      <Button onClick={goBack}>На Главную</Button>

      <div className="title">
        <Title>{gameName}</Title>
      </div>
    </div>
  )
}