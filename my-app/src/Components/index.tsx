import React, {useId} from 'react'
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"

type Inputs = { 
    nombre: string,
    password: string,
    passwordConfirmation: string,
    email: string,
    edad: number,
    pais: string,
    checkTelefono: boolean,
    telefono: number,
    message: string
}

const Formulario = () => {

    const [t, i18n] = useTranslation("form")

    const {register, formState: { errors }, handleSubmit, watch, getValues} = useForm<Inputs>({
        defaultValues: {
            nombre: '',
            password: '',
            passwordConfirmation: '',
            email: '',
            edad: undefined,
            pais: '',
            checkTelefono: false,
            telefono: undefined, 
            message: '',
        }
    }) // register es para registrar los campos 
    const formSubmit = (data) =>{
        console.log(data)
    }
    const edadValidator = (value) => {
        return value >= 18
    }
    
    const incluirTelefono = watch('checkTelefono')
    const id = useId()
    console.log(id, "id")
    return (
        <div>
            <h2>{t("form.title")}</h2>
            <button onClick={() => i18n.changeLanguage("es")}>ES</button>
            <button onClick={() => i18n.changeLanguage("en")}>EN</button>
   
            <form  onSubmit={handleSubmit(formSubmit)}>
                <div>
                    <label htmlFor={id + 'name'}>{t("form.name")}</label>
                    <input id={id + 'name'} type="text"  {...register('nombre', {
                        required: true,
                        minLength: {
                            value: 3,
                            message: "minimo 3 letras :D"
                        },
                        
                    })}/>
                    {errors.nombre?.type === 'required' && <p>El campo nombre es obligatorio</p>}
                    {errors.nombre?.type === 'minLength' && <p>{errors.nombre?.message}</p>}
                </div>


                <div>
                    <label htmlFor={id + 'password'}>{t("form.password")}</label>
                    <input id={id + 'password'} type="password"  {...register('password', {
                        required: "password es requerida",
                    })}/>
                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor={id + 'reppass'}>{t("form.passwordRep")}</label>
                    <input id={id + 'reppass'} type="password"  {...register('passwordConfirmation', {
                        required: "confirmar contrasela",
                        pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
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
                    <label htmlFor={id + 'email'}>Email</label>
                    <input id={id + 'email'} type="text"  {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    })}/>
                    {errors.email?.type === 'pattern' && <p>Formato de mails incorrecto</p>}
                </div>
                <div>
                    <label htmlFor={id + 'edad'}>{t("form.yearOld")}</label>
                    <input id={id + 'edad'} type="number" {...register('edad', {
                        validate: edadValidator
                    })}/>
                    {errors.edad?.type && <p>Tenes que ser mayor de 18</p>}
                </div> 
            
             
                <div>
                    <label htmlFor={id + 'country'}>{t("form.country")}</label>
                    <select id={id + 'country'} {...register('pais')}>
                        <option value="ar">Argentina</option>
                        <option value="br">Brasil</option>
                        <option value="pe">Peru</option>
                    </select>
                </div>
                <input type="submit" value={t("form.send")}/>


                
                <div>
                    <label htmlFor={id + 'checkphone'}>{t("form.includePhone")}</label>
                    <input id={id + 'checkphone'} type="checkbox" {...register('checkTelefono')}/>
                </div>
                {incluirTelefono && (
                    <div>
                       
                        <input id={id + 'phone'} type="tel" {...register('telefono')}/>
                    </div>
                )

                }
            </form>
        </div>
    )
}

export default Formulario;