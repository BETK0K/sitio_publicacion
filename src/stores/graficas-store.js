import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useGraficasStore = defineStore('useGraficasStore', {
  state: () => ({
    loading: false,
    loadingIdentidad: false,

    list_Judicial_Graficas_Genero_Edad_Filtrado: [],
    filtro_Genero_Edad_Judicial: [],
    list_Judicial_Graficas_Genero: [],
    filtro_Genero_Judicial: [],
    list_Judicial_Graficas_Estudios: [],
    filtro_Estudios_Judicial: [],
    list_Judicial_Graficas_Avance: [],
    filtro_Avance_Judicial: [],
  }),

  actions: {
    //---------------------------------------------------------------------------------
    //GRAFICAS

    async loadJudicialGraficasEdad(id) {
      try {
        this.list_Judicial_Graficas_Genero_Edad_Filtrado = []
        let listado = []
        //if (id <= 2) {
        let resp = await api.get(`/Graficas/Edades/${id}`)
        listado = resp.data.data
        //} else {
        // for (let i = 3; i <= 6; i++) {
        //   let resp = await api.get(`/Graficas/Edades/${i}`);
        //   let { data } = resp.data;
        //   listado.push(...data);
        // }
        //}
        this.list_Judicial_Graficas_Genero_Edad_Filtrado = listado.map((item) => {
          return {
            edad: item.edad,
            cantidad: item.candidatosPorEdad,
            porSexo: item.porSexo,
          }
        })
        this.filtro_Genero_Edad_Judicial = this.list_Judicial_Graficas_Genero_Edad_Filtrado
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    async filtroJudicialGraficasEdad(edad, genero) {
      try {
        if (edad == 'Todos') {
          if (genero == 'Todos') {
            this.filtro_Genero_Edad_Judicial = this.list_Judicial_Graficas_Genero_Edad_Filtrado
          } else {
            let filtro = this.list_Judicial_Graficas_Genero_Edad_Filtrado.map((item) => {
              // Filtra los elementos de porSexo que coincidan con el género
              const porSexoFiltrado = item.porSexo.filter((sexoItem) => sexoItem.sexo === genero)

              // Calcula la nueva cantidad basada en los elementos filtrados
              const nuevaCantidad = porSexoFiltrado.reduce(
                (acc, sexoItem) => acc + sexoItem.candidatos,
                0,
              )

              // Devuelve el objeto actualizado con porSexo filtrado y la nueva cantidad
              return {
                ...item,
                porSexo: porSexoFiltrado,
                cantidad: nuevaCantidad,
              }
            })
            if (filtro) {
              this.filtro_Genero_Edad_Judicial = filtro
              console.log('filtro final', this.filtro_Genero_Edad_Judicial)
            } else {
              this.filtro_Genero_Edad_Judicial = this.list_Judicial_Graficas_Genero_Edad_Filtrado
            }
          }
        } else {
          if (edad == '60 o más') {
            let filtro = this.list_Judicial_Graficas_Genero_Edad_Filtrado.filter((item) => {
              return item.edad >= 60
            })
            if (filtro) {
              if (genero == 'Todos') {
                this.filtro_Genero_Edad_Judicial = filtro
              } else {
                let filtroNuevo = filtro.map((item) => {
                  // Filtra los elementos de porSexo que coincidan con el género
                  const porSexoFiltrado = item.porSexo.filter(
                    (sexoItem) => sexoItem.sexo === genero,
                  )

                  // Calcula la nueva cantidad basada en los elementos filtrados
                  const nuevaCantidad = porSexoFiltrado.reduce(
                    (acc, sexoItem) => acc + sexoItem.candidatos,
                    0,
                  )

                  // Devuelve el objeto actualizado con porSexo filtrado y la nueva cantidad
                  return {
                    ...item,
                    porSexo: porSexoFiltrado,
                    cantidad: nuevaCantidad,
                  }
                })
                this.filtro_Genero_Edad_Judicial = filtroNuevo
              }
            } else {
              this.filtro_Genero_Edad_Judicial = []
            }
          } else {
            let rango = edad.split('-')
            let filtro = this.list_Judicial_Graficas_Genero_Edad_Filtrado.filter((item) => {
              return item.edad >= parseInt(rango[0]) && item.edad <= parseInt(rango[1])
            })
            if (filtro) {
              if (genero == 'Todos') {
                this.filtro_Genero_Edad_Judicial = filtro
              } else {
                let filtroNuevo = filtro.map((item) => {
                  // Filtra los elementos de porSexo que coincidan con el género
                  const porSexoFiltrado = item.porSexo.filter(
                    (sexoItem) => sexoItem.sexo === genero,
                  )

                  // Calcula la nueva cantidad basada en los elementos filtrados
                  const nuevaCantidad = porSexoFiltrado.reduce(
                    (acc, sexoItem) => acc + sexoItem.candidatos,
                    0,
                  )

                  // Devuelve el objeto actualizado con porSexo filtrado y la nueva cantidad
                  return {
                    ...item,
                    porSexo: porSexoFiltrado,
                    cantidad: nuevaCantidad,
                  }
                })
                this.filtro_Genero_Edad_Judicial = filtroNuevo
              }
            } else {
              this.filtro_Genero_Edad_Judicial = []
            }
          }
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    /*        { id: 1, edades: "Todos" },
        { id: 2, edades: "18-24" },
        { id: 3, edades: "25-29" },
        { id: 4, edades: "30-39" },
        { id: 5, edades: "40-49" },
        { id: 6, edades: "50-59" },
        { id: 7, edades: "60 o más" },*/
    async loadJudicialGraficasGenero(id) {
      try {
        this.list_Judicial_Graficas_Genero = []
        let listado = []
        //if (id <= 2) {
        let resp = await api.get(`/Graficas/Genero/${id}`)
        listado = resp.data.data
        //} else {
        // let listaPrevia = [];
        // for (let i = 3; i <= 6; i++) {
        //   let resp = await api.get(`/Graficas/Genero/${i}`);
        //   let { data } = resp.data;
        //   listaPrevia.push(...data);
        // }
        // listado = listaPrevia;
        console.log('listado', listado)
        //}

        this.list_Judicial_Graficas_Genero = listado.map((item) => {
          return {
            sexo: item.sexo,
            candidatos: item.candidatos,
          }
        })
        this.filtro_Genero_Judicial = this.list_Judicial_Graficas_Genero
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    async filtroJudicialGraficasGenero(Genero) {
      try {
        if (Genero == 'Todos') {
          this.filtro_Genero_Judicial = this.list_Judicial_Graficas_Genero
        } else {
          let filtro = this.list_Judicial_Graficas_Genero.filter((item) => {
            return item.sexo == Genero
          })

          if (filtro) {
            this.filtro_Genero_Judicial = filtro
          } else {
            this.filtro_Genero_Judicial = this.list_Judicial_Graficas_Genero
          }
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    async loadJudicialGraficasEstudios(id) {
      try {
        this.list_Judicial_Graficas_Estudios = []
        let listado = []
        //if (id <= 2) {
        let resp = await api.get(`/Graficas/Estudios/${id}`)
        listado = resp.data.data
        //} else {
        // let listaPrevia = [];
        // for (let i = 3; i <= 6; i++) {
        //   let resp = await api.get(`/Graficas/Estudios/${i}`);
        //   let { data } = resp.data;
        //   listaPrevia.push(...data);
        // }
        // listado = listaPrevia;
        // console.log("listado", listado);
        //}
        this.list_Judicial_Graficas_Estudios = listado.map((item) => {
          return {
            grado: item.grado,
            candidatos: item.candidatos,
          }
        })
        this.filtro_Estudios_Judicial = this.list_Judicial_Graficas_Estudios
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    async filtroJudicialGraficasEstudios(Estudio) {
      try {
        if (Estudio == 'Todos') {
          this.filtro_Estudios_Judicial = this.list_Judicial_Graficas_Estudios
        } else {
          let filtro = this.list_Judicial_Graficas_Estudios.filter((item) => {
            return item.grado == Estudio
          })

          if (filtro) {
            this.filtro_Estudios_Judicial = filtro
          } else {
            this.filtro_Estudios_Judicial = this.list_Judicial_Graficas_Estudios
          }
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    async loadJudicialGraficasAvance(id) {
      try {
        this.list_Judicial_Graficas_Avance = []
        let listado = []
        //if (id <= 2) {
        let resp = await api.get(`/Graficas/Avance/${id}`)
        listado = resp.data.data
        //} else {
        // let listaPrevia = [];
        // for (let i = 3; i <= 6; i++) {
        //   let resp = await api.get(`/Graficas/Avance/${i}`);
        //   let { data } = resp.data;
        //   listaPrevia.push(...data);
        // }
        // listado = listaPrevia;
        //}
        this.list_Judicial_Graficas_Avance = listado.map((item) => {
          return {
            porcentaje: item.porcentaje,
            candidatos: item.candidatos,
          }
        })
        this.filtro_Avance_Judicial = this.list_Judicial_Graficas_Avance
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
  },
})
