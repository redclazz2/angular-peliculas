import { obtenerErrores } from "./ObtenerErrores";

describe("ExtraerErrores", ()=>{
    it('Should return an empty array if the object has no errors', () => {
        const input = {error: {errors: {}}};

        const resultado = obtenerErrores(input);

        expect(resultado).toEqual([]);
    });

     it('Should extract the error messages fields', () => {
        const input = {error: {errors: {
            nombre: ['es obligatorio'],
            email: ['no es un mail valido']
        }}};

        const resultado = obtenerErrores(input);

        expect(resultado).toEqual([
            'Campo: nombre. Error: es obligatorio',
            'Campo: email. Error: no es un mail valido'
        ]);
    });
});