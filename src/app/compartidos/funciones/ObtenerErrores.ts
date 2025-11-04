export function obtenerErrores(obj: any): string[]{
    const error = obj.error.errors;
    let mensajesError:string[] = [];

    for(let llave in error){
        let campo = llave;
        const mensajesConCampos = error[llave].map((mensaje:string) => `Campo: ${campo}. Error: ${mensaje}`)
        mensajesError = mensajesError.concat(mensajesConCampos);
    }

    return mensajesError;
}

export function extraerErroresIdentity(obj:any): string[]{
    let mens : string [] = [];

    for(let i = 0; i < obj.error.lenght; i++){
        const el = obj.error[i];
        mens.push(el.description);
    }

    return mens;
}