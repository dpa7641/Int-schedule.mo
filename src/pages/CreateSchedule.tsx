import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonLabel,
  IonButton,
  IonAlert
} from "@ionic/react";
import "./CreateSchedule.css";
import { arrowRoundBack } from "ionicons/icons";

const CreateSchedule: React.FC = (props: any) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setShowAlert] = useState(false);
  const { history } = props;

  const handleSubmit = async () => {
    const url = "https://afternoon-refuge-46845.herokuapp.com/api/schedules";
    const result = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        description: description,
        user_id: props.match.params.iduser
      })
    });
    const data = await result.json();
    if (data.user_id === props.match.params.iduser) {
      props.history.push(`/tab2/${props.match.params.iduser}`);
    } else {
      setShowAlert(true);
      props.history.push(`/createSchedule/${props.match.params.iduser}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowRoundBack}></IonIcon>
              <IonLabel>Atras</IonLabel>
            </IonButton>
          </IonButtons>
          <IonTitle>Creación de Horario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contenido">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <IonLabel>Inserte Nombre del nuevo Calendario:</IonLabel>
            <input
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Nombre Calendario..."
              className="inputName"
              name="name"
              required
            />
            <IonLabel>Descripcion (Opcional):</IonLabel>
            <textarea
              onChange={e => setDescription(e.target.value)}
              placeholder="Descripción..."
              className="inputDescription"
              name="description"
            />
            <IonButton type="submit" expand="block" className="submit">
              Aceptar
            </IonButton>
            <IonAlert
              isOpen={alert}
              onDidDismiss={() => setShowAlert(false)}
              header={"Advertencia"}
              subHeader={"Fallo en el guardado"}
              message={"caracteres en la descripcion exedidos"}
              buttons={["OK"]}
            />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateSchedule;
