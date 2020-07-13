document.getElementById('formTask').addEventListener('submit', saveTask); /* document.getElementById para seleccionar un documento por su id. addEventListener para agregar una escucha al evento */
/* para guardar tareas 'tasks' */
function saveTask(e) { /* cuando se ejecuta 'submit' se ejecuta la funcion saveTask */
    
    let title = document.getElementById('title').value /* obtengo desde 'title' su valor, guardandolo en la variable */
    let description = document.getElementById('description').value; /* obtengo desde 'description' su valor y lo guardo en la var */

    const task = { /* creo un obj para almacenar titulo y descripcion */
        title,
        description
    };
    
    //localStorage.setItem('tasks', JSON.stringify(task)); /* almaceno dentro de local storage, JSON.stringify para convertir el obj en un string */
    if (localStorage.getItem('tasks') === null) { /* si desde localstorage existe un valor llamado tasks y es igual a null (no hay), empezaremos a crear tasks */
        let tasks = []; /* creamos el array */
        tasks.push(task); /* agrego valores al array */
        localStorage.setItem('tasks', JSON.stringify(tasks)) /* almaceno las tareas 'tasks' en caso de que no exista ninguna */
    } else { /* caso contrario, si ya existen tasks, vamos a actualizarlos */
        let tasks = JSON.parse(localStorage.getItem('tasks')) /* obtengo las tareas 'tasks' a traves del localstorage, los convierto a JSON, y lo almaceno en la variable */
        tasks.push(task); /* actualizo agregandola */
        localStorage.setItem('tasks', JSON.stringify(tasks)) /* vuelvo a almacenar */
    }


    getTasks(); /* cada vez que almaceno una tarea task vuelvo a ejecutar el metodo 'getTasks' */
    document.getElementById('formTasks').reset(); /* usamos metodo 'reset' para reiniciar el formulario 'formTask' */
    e.preventDefault(); /* evita el comportamiento por defecto, no se recarga al apretar Save  */
}

/* para obtener tareas 'tasks' */
function getTasks() { /* consulta los datos del localstorage y los muestra por pantalla */
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks'); /* obtengo la div tasks y lo almaceno en la var */

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title; /* almacena tareas 'tasks' en su indice i con su propiedad title */
        let description = tasks[i].description; /* idem anterior, muestra la descripcion de la tarea cada vez que se recorre */

        /* html diseñado con js, cada div mostrara los datos diseñados en html */
        /* ${title} y {description} mostramos en la interfaz, el title y la description */
        tasksView.innerHTML += `<div class="card mb-3"> 
        <div class="card-body">
            <p>${title} - ${description}</p> 
            <a class="btn btn-danger" onclick="deleteTask('${title}')">
                Eliminar tarea
            </a>
            </div>
        </div>`
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks')); /* para obtener las tareas */
    for(let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) { /* si la tarea 'tasks' en su indicie i y en su propiedad title es = al titulo de la tarea 'tasks' que me pasa la funcion deleteTasks --> lo puedo eliminar*/
            tasks.splice(i, 1) /* quita 1 sola en el indice i */
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); /* almacenara nuevamente las tareas con ese item menos */
    getTasks();
}

getTasks();


