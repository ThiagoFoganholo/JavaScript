import Get_Usuarios from "../teste_individual/usuarios/Get/Get_usuarios";
import { group,sleep } from "k6";

export default function(){
    group("Usuarios Get" ,() => {
        Get_Usuarios();
    });
    sleep(1);
}