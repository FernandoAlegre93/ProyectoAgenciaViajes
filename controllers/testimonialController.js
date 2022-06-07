import{ Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial = async (req,res) => {
    // Validar..

    const { nombre, correo, mensaje } = req.body;

    const errores = [];


    if(nombre.trim() === ''){
        errores.push({mensaje:'El nombre esta vacio'})
    }

    if(correo.trim() === ''){
        errores.push({mensaje:'El correo esta vacio'})
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje:'El mensaje esta vacio'})
    }

    if(errores.length > 0){
        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();



        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Reseñas',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenar en la base de datos
        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}