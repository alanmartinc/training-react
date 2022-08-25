import { useForm } from "react-hook-form";

const Formulario = () => {

    const {register, formState: { errors }, handleSubmit, watch, getValues} = useForm({
        defaultValues: {
           // nombre: 'pone aca el nombre'
        }
    }) // register es para registrar los campos 
    const formSubmit = (data) =>{
        console.log(data)
    }
    const edadValidator = (value) => {
        return value >= 18
    }
    
    const incluirTelefono = watch('checkTelefono')
    
    return (
        <div>
            <h2>Formulario</h2>
            <form  onSubmit={handleSubmit(formSubmit)}>
                <div>
                    <label>Nombre</label>
                    <input type="text"  {...register('nombre', {
                        required: true,
                        minLength: 3
                    })}/>
                    {errors.nombre?.type === 'required' && <p>El campo nombre es obligatorio</p>}
                    {errors.nombre?.type === 'minLength' && <p>minimo 3 letras</p>}
                </div>


                <div>
                    <label>Contraseña</label>
                    <input type="text"  {...register('password', {
                        required: "password es requerida",
                    })}/>
                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </div>
                <div>
                    <label>Repetir contraseña</label>
                    <input type="text"  {...register('passwordConfirmation', {
                        required: "confirmar contrasela",
                        pattern: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&])([A-Za-z\d$@$!%?&]|[^ ]){8,15}$/,
                        validate: {
                            matchesPreviousPassword: (value) => {
                                const { password } = getValues();
                                console.log({password})
                                return password === value || "No coinciden";
                            }
                        }
                    })}/>
                    {errors.passwordConfirmation && (
                        <p>{errors.passwordConfirmation.message}</p>
                        )}
                     {errors.passwordConfirmation?.type === 'pattern' && <p>La contraseña debe tener un caracter especial y al menos una mayuscula</p>}
                    
                </div>



                <div>
                    <label>Email</label>
                    <input type="text"  {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    })}/>
                    {errors.email?.type === 'pattern' && <p>Formato de mails incorrecto</p>}
                </div>
                <div>
                    <label>Edad</label>
                    <input type="text" {...register('edad', {
                        validate: edadValidator
                    })}/>
                    {errors.edad?.type && <p>Tenes que ser mayor de 18</p>}
                </div> 
            
             
                <div>
                    <label>Pais</label>
                    <select {...register('pais')}>
                        <option value="ar">Argentina</option>
                        <option value="br">Brasil</option>
                        <option value="pe">Peru</option>
                    </select>
                </div>
                <input type="submit" value="enviar"/>


                
                <div>
                    <label>Incluir telefono?</label>
                    <input type="checkbox" {...register('checkTelefono')}/>
                </div>
                {incluirTelefono && (
                    <div>
                        <label>Telefono</label>
                        <input type="text" {...register('telefono')}/>
                    </div>
                )

                }
            </form>
        </div>
    )
}

export default Formulario;