require("colors");
const { guardarDB, leerDB } = require("./db/guardarArchivo");
const { inquirerMenu, pausa, leerImput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //   crear opcion
        const desc = await leerImput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listarCompleto();
        //   console.log(tareas.listadoArr)
        break;
      case "3":
        tareas.listarPendientesCompletadas(true)
        break;
      case "4":

        tareas.listarPendientesCompletadas(false)
        break;
        break;
        case "5":
  
         const ids = await mostrarListadoChecklist( tareas.listadoArr);
          tareas.toggleCompletadas(ids)
          break;
        case "6":

       const id = await listadoTareasBorrar(tareas.listadoArr);
       const ok = await confirmar('¿Está seguro?');
         if(id !== '0'){
            if(ok){
              tareas.borrarTareas( id );
              console.log('Tarea borrada');
            }
          }
          break;
      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
