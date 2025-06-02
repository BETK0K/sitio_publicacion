import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useConfiguracionStore = defineStore('configuracion', {
  state: () => ({
    list_Tipos_Elecciones: [],
    list_Tipos_Poder: [
      {
        id: 0,
        nombre: 'inicio',
        label: 'inicio',
        siglas: 'inicio',
        icon: 'home',
      },
      {
        id: 1,
        nombre: 'MSJ',
        label: 'Magistraturas del Tribunal\nSuperior de Justicia',
        siglas: 'MSJ',
        icon: '',
      },
      {
        id: 2,
        nombre: 'MDJ',
        label: 'Magistraturas del Tribunal\nde Disciplina Judicial',
        siglas: 'MDJ',
        icon: '',
      },
      {
        id: 3,
        nombre: 'JUE',
        label: 'Juezas y Jueces',
        siglas: 'JUE',
        icon: '',
      },
    ],
    list_Municipios: [],
    list_Oficinas: [],
    list_Secciones: [],
    list_Candidatos: [],
    list_Sexo: [],
    seccion_Select: null,
    fecha_Corte: {
      fecha: null,
      zona: null,
      hora: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //TIPO DE ELECCIONES
    async loadTipoElecciones() {
      try {
        let resp = await api.get('/TiposElecciones')
        let { data } = resp.data
        let listActivo = []
        listActivo = data.filter((x) => x.activo == true)
        let listTipoElecciones = listActivo.map((tipo) => {
          return {
            id: tipo.id,
            nombre: tipo.nombre,
            label: tipo.nombre,
            to: tipo.siglas,
            siglas: tipo.siglas,
            activo: tipo.activo,
            propietario_1: tipo.propietario_1,
            propietario_2: tipo.propietario_2,
            suplente_1: tipo.suplente_1,
            suplente_2: tipo.suplente_2,
            fecha_Registro: tipo.fecha_Registro,
          }
        })

        this.list_Tipos_Elecciones = listTipoElecciones
      } catch (error) {
        console.error('Error:', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    async loadCandidatosNuevo() {
      try {
        let resp = await api.get('/Candidatos')
        if (resp.status == 200) {
          let { data } = resp
          this.list_Candidatos = data.map((tipo) => {
            return {
              id: tipo.id,
              nombres: tipo.nombres,
              apellido_Paterno: tipo.apellido_Paterno,
              apellido_Materno: tipo.apellido_Materno,
            }
          })
        }
      } catch (error) {
        console.error('Error:', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    //----------------------------------------------------------------------
    async loadMunicipios() {
      try {
        let resp = await api.get('/Municipios')
        let { data } = resp.data
        this.list_Municipios = data.map((municipio) => {
          return {
            id: municipio.id,
            clave: municipio.clave,
            nombre: municipio.nombre,
            region: municipio.region,
            label: municipio.nombre,
          }
        })
      } catch (error) {
        console.error('Error:', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    //----------------------------------------------------------------------
    async loadSecciones() {
      try {
        let resp = await api.get('/Secciones')
        let { data } = resp.data
        this.list_Secciones = data.map((tipo) => {
          return {
            id: tipo.id,
            municipio_Id: tipo.municipio_Id,
            municipio: tipo.municipio,
            nombre: tipo.nombre,
            region: tipo.region,
            label: tipo.nombre,
          }
        })

        this.list_Secciones.unshift({
          id: 0,
          municipio_Id: 0,
          municipio: '',
          nombre: 'Todas',
          region: '',
          label: 'Todas',
        })
      } catch (error) {
        console.error('Error:', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },

    //----------------------------------------------------------------------
    async loadOficinas() {
      try {
        let resp = await api.get('/Oficinas')
        let { data } = resp.data
        this.list_Oficinas = data.map((tipo) => {
          return {
            id: tipo.id,
            municipio_Id: tipo.municipio_Id,
            municipio: tipo.municipio,
            no_Oficina: tipo.no_Oficina,
            nombre: tipo.nombre,
            region: tipo.region,
            label: tipo.nombre,
          }
        })
      } catch (error) {
        console.error('Error:', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //----------------------------------------------------------------------
    async loadHoraCorte() {
      try {
        let resp = await api.get('/Avance/Hora_Consulta')
        let { data } = resp.data
        this.fecha_Corte.fecha = data.fecha
        this.fecha_Corte.zona = data.zona
        this.fecha_Corte.hora = data.hora
      } catch (error) {
        console.error('Error:', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //----------------------------------------------------------------------
    //GENERO
    async loadGenero() {
      const data = [
        { id: '', sexo: 'Todos' },
        { id: 1, sexo: 'Femenino' },
        { id: 2, sexo: 'Masculino' },
      ]
      this.list_Sexo = data.map((sexo) => sexo.sexo)
    },
  },
})
