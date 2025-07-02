export interface FaceMatcherState {
    faceMatcher: faceapi.FaceMatcher | null;
    modelsLoaded: boolean;
}

export interface userFormProps {
    nom: string;
    prenom: string;
    dateNaissance: string;
    email: string;
    photo: string;
}