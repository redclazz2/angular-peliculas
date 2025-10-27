import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function firstCapitalLetter():ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null => {
        const valor = <string>control.value;

        if(!valor) return null;
        if(valor.length == 0) return null;

        const primeraLetra = valor[0];
        if(primeraLetra !== primeraLetra.toUpperCase()){
            return{
                primeraLetraMayuscula: 'La primera letra debe ser mayuscula',
            }
        }

        return null;
    }
}

export function dateCannotBeFuture():ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null => {
        const datePicked = new Date(control.value);
        const today = new Date();

        if(datePicked > today){
            return {
                futuro: {
                    message: "La fecha no puede ser del futuro"
                }
            }
        }
        
        return null;
    }
}