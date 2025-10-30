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