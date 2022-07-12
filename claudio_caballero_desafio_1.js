class Usuario {
  
    constructor (nombre, apellido, libros, mascotas = []) {
        this.nombre =  nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas 
    }

    getFullName(){
      return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }
  
    countMascotas(){
        //console.log(`Cantidad de mascotas: ${this.mascotas.length}`)
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push(Object = {nombre:nombre, autor:autor})
    }

    getBookNames(){
      let nombres = []
          for (let i = 0; i < this.libros.length; i++) {
            nombres.push(`${this.libros[i].nombre}`)
          }
      return nombres
    }
}

let usuario = new Usuario("Claudio", "Caballero", [{nombre:"El señor de las moscas", autor:"William Golding"}, {nombre:"Fundacion", autor:"Isaac Asimov"}], ["Firulais", "Misho", "Nubecita", "Petruska", "Cleta"] );
usuario.addMascota("firulais") 
usuario.addMascota("Misho")
usuario.addBook("1984", "George Orwell")
console.log(usuario.countMascotas())
console.log(usuario.getBookNames())
console.log(usuario.getFullName())


