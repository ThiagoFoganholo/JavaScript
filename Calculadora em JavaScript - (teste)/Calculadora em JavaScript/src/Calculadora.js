export default class Calculadora{

    static soma(a, b){
        return a + b;
    }

    static subtracao(a, b){
        return a - b;
    }

    static multiplicacao(a, b){
        return a * b;
    }

    static divisao(a, b){
        if(b == 0){
            return "Nan";
        }else{
            return a / b;
        }
    }

    static potencia(a,b){
        if(a == 0 && b == 0){
            return "Nan";
        }else{
            return Math.pow(a,b);
        }
    }

    static pi(){
        return 3.141592653589793;
    }

    static numeroDeEuler(){
        return 2.718281828459045;
    }

    static senoEmRadianos(anguloEmRadianos){
        return (Math.sin(anguloEmRadianos));
    }

    static senoEmGraus(anguloEmRadianos){
        let AnguloEmgraus = anguloEmRadianos * (Math.PI / 180);
        return (Math.sin(AnguloEmgraus));
    }

    static cossenoEmRadianos(anguloEmRadianos){
        return (Math.cos(anguloEmRadianos));
    }
    static cossenoEmGraus(anguloEmRadianos){
        let AnguloEmgraus = anguloEmRadianos * (Math.PI / 180);
        return (Math.cos(AnguloEmgraus));
    }

    static moduloDeUmNumero(a){
        if(a<0){
            return -a ;
        }else{
            return a;
        }

    }

    static raizQuadrada(a){
        if(a>=0){
            return Math.sqrt(a);
        }else{
            return "NaN";
        }
    }

    static logaritmoDecimal(a){
        if(a<=0){
            return "Nan";
        }else{
            return Math.log10(a);
        }
    }

    static logaritmoNatural(a){
        if(a<=0){
            return "Nan";
        }else{
            return Math.log(a);
        }
    }

    static fatorial(a){

        let fat = 1;

        if((Number.isInteger(a) && a >= 0)){
            for(let i = 1 ; i<=a;i++){
                fat = fat * i ;
            }
            return fat;
        }else{
            return "Nan";
        }
    }

}