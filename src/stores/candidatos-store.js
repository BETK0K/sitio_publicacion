import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useCandidatosStore = defineStore('cards', {
  state: () => ({
    loading: false,
    isHomePage: false,
    limpiar: false,
    buttons: false,
    documentoExcel: null,
    selectedTab: null,
    junta: null,
    municipio: null,
    seccion: null,
    list_Tradicional: [],
    list_Acusatorio: [],
    list_Penal: [],
    list_Laboral: [],
    list_Candidatos_Judicial: [],
    list_Candidatos_Junta: [],
    list_Candidatos_Municipio: [],
    list_Candidatos_Seccion: [],
    candidato_Judicial: {
      id: null,
      tipo_Eleccion_Id: null,
      tipo_Eleccion: null,
      poder_Postulante: null,
      no_Formula: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      sexo: null,
      fotografia_URL: null,
      activo: null,
      votos: null,
      porcentaje: null,
      orden: null,
    },
    informacion: {
      votos_Candidatura: null,
      votos_Nulos: null,
      total: null,
      avance: null,
      lista_Nominal: null,
      participacion: null,
      porcentaje_Participacion: null,
      casillas_Computadas: null,
      casillas_Esperadas: null,
    },
    informacion_JAO_MUN: {
      votos_Candidatura: null,
      votos_Nulos: null,
      total: null,
      avance: null,
      lista_Nominal: null,
      participacion: null,
      porcentaje_Participacion: null,
      casillas_Computadas: null,
      casillas_Esperadas: null,
    },
  }),
  actions: {
    actualizarMenu(valor) {
      this.isHomePage = valor
    },

    actualizarButtonColor(valor) {
      this.buttons = valor
    },

    limpiarFiltros() {
      this.listFiltroCards = []
    },
    //---------------------------------------------------------------------------------
    initInformacion() {
      this.informacion.votos_Candidatura = null
      this.informacion.votos_Nulos = null
      this.informacion.total = null
      this.informacion.avance = null
      this.informacion.lista_Nominal = null
      this.informacion.participacion = null
      this.informacion.porcentaje_Participacion = null
      this.informacion.casillas_Computadas = null
      this.informacion.casillas_Esperadas = null
    },

    initInformacion_JAO_MUN() {
      this.informacion_JAO_MUN.votos_Candidatura = null
      this.informacion_JAO_MUN.votos_Nulos = null
      this.informacion_JAO_MUN.total = null
      this.informacion_JAO_MUN.avance = null
      this.informacion_JAO_MUN.lista_Nominal = null
      this.informacion_JAO_MUN.participacion = null
      this.informacion_JAO_MUN.porcentaje_Participacion = null
      this.informacion_JAO_MUN.casillas_Computadas = null
      this.informacion_JAO_MUN.casillas_Esperadas = null
    },
    //---------------------------------------------------------------------------------
    async loadCandidatosJudicialByEleccion(id) {
      try {
        let resp = await api.get(`/Candidatos/ByTipoEleccion/${id}`)
        let { data } = resp.data
        this.list_Candidatos_Judicial = data.map((candidato) => {
          return {
            id: candidato.id,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            poder_Postulante: candidato.poder_Postulante,
            no_Formula: candidato.no_Formula,
            nombres: candidato.nombres,
            apellidos: candidato.apellido_Paterno + ' ' + candidato.apellido_Materno,
            nombre_Completo:
              candidato.nombres.trim() +
              ' ' +
              candidato.apellido_Paterno.trim() +
              ' ' +
              candidato.apellido_Materno.trim(),
            sexo: candidato.sexo,
            activo: candidato.activo,
            fotografia_URL: candidato.fotografia_URL,
            votos: candidato.votos,
            porcentaje: candidato.porcentaje,
            orden: candidato.orden,
          }
        })
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadCandidatosJudicialByJunta(tipoEleccionId, oficinaId) {
      try {
        let resp = await api.get(`/Candidatos/ByJuntaAuxiliar/${tipoEleccionId}/${oficinaId}`)
        let { data } = resp.data
        this.list_Candidatos_Judicial = data.map((candidato) => {
          return {
            id: candidato.id,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            poder_Postulante: candidato.poder_Postulante,
            no_Formula: candidato.no_Formula,
            nombres: candidato.nombres,
            apellidos: candidato.apellido_Paterno + ' ' + candidato.apellido_Materno,
            nombre_Completo:
              candidato.nombres.trim() +
              ' ' +
              candidato.apellido_Paterno.trim() +
              ' ' +
              candidato.apellido_Materno.trim(),
            sexo: candidato.sexo,
            activo: candidato.activo,
            fotografia_URL: candidato.fotografia_URL,
            votos: candidato.votos,
            porcentaje: candidato.porcentaje,
            orden: candidato.orden,
          }
        })
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadCandidatosJudicialByMunicipio(tipoEleccionId, municipioId) {
      try {
        let resp = await api.get(`/Candidatos/ByMunicipio/${tipoEleccionId}/${municipioId}`)
        let { data } = resp.data
        this.list_Candidatos_Judicial = data.map((candidato) => {
          return {
            id: candidato.id,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            poder_Postulante: candidato.poder_Postulante,
            no_Formula: candidato.no_Formula,
            nombres: candidato.nombres,
            apellidos: candidato.apellido_Paterno + ' ' + candidato.apellido_Materno,
            nombre_Completo:
              candidato.nombres.trim() +
              ' ' +
              candidato.apellido_Paterno.trim() +
              ' ' +
              candidato.apellido_Materno.trim(),
            sexo: candidato.sexo,
            activo: candidato.activo,
            fotografia_URL: candidato.fotografia_URL,
            votos: candidato.votos,
            porcentaje: candidato.porcentaje,
            orden: candidato.orden,
          }
        })
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadCandidatosBySeccion(seccionId, tipoEleccionId) {
      try {
        let resp = await api.get(`/Candidatos/BySeccion/${seccionId}/${tipoEleccionId}`)
        let { data } = resp.data
        this.list_Candidatos_Seccion = data.map((candidato) => {
          return {
            seccion_Id: candidato.seccion_Id,
            seccion: candidato.seccion,
            casilla_Id: candidato.casilla_Id,
            casilla: candidato.casilla,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            acta_URL: candidato.acta_URL,
            votos_Candidaturas: candidato.votos_Candidaturas,
            votos_Nulos: candidato.votos_Nulos,
            total_Votos: candidato.total_Votos,
            candidaturas: candidato.candidaturas.map((cand) => ({
              id: cand.id,
              tipo_Eleccion_Id: cand.tipo_Eleccion_Id,
              tipo_Eleccion: cand.tipo_Eleccion,
              poder_Postulante: cand.poder_Postulante,
              no_Formula: cand.no_Formula,
              nombres: cand.nombres || '',
              apellidos: (
                (cand.apellido_Paterno || '') +
                ' ' +
                (cand.apellido_Materno || '')
              ).trim(),
              nombre_Completo: [
                cand.nombres?.trim() || '',
                cand.apellido_Paterno?.trim() || '',
                cand.apellido_Materno?.trim() || '',
              ]
                .filter((part) => part.length > 0)
                .join(' '),
              sexo: cand.sexo,
              activo: cand.activo,
              fotografia_URL: cand.fotografia_URL,
              votos: cand.votos,
              porcentaje: cand.porcentaje,
              orden: cand.orden,
            })),
          }
        })
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadCandidatosBySeccionesMunicipio(municipioId, tipoEleccionId) {
      try {
        let resp = await api.get(
          `/Candidatos/BySeccionesMunicipio/${municipioId}/${tipoEleccionId}`,
        )
        let { data } = resp.data
        this.list_Candidatos_Seccion = data.map((candidato) => {
          return {
            seccion_Id: candidato.seccion_Id,
            seccion: candidato.seccion,
            casilla_Id: candidato.casilla_Id,
            casilla: candidato.casilla,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            acta_URL: candidato.acta_URL,
            votos_Candidaturas: candidato.votos_Candidaturas,
            votos_Nulos: candidato.votos_Nulos,
            total_Votos: candidato.total_Votos,
            candidaturas: candidato.candidaturas.map((cand) => ({
              id: cand.id,
              tipo_Eleccion_Id: cand.tipo_Eleccion_Id,
              tipo_Eleccion: cand.tipo_Eleccion,
              poder_Postulante: cand.poder_Postulante,
              no_Formula: cand.no_Formula,
              nombres: cand.nombres || '',
              apellidos: (
                (cand.apellido_Paterno || '') +
                ' ' +
                (cand.apellido_Materno || '')
              ).trim(),
              nombre_Completo: [
                cand.nombres?.trim() || '',
                cand.apellido_Paterno?.trim() || '',
                cand.apellido_Materno?.trim() || '',
              ]
                .filter((part) => part.length > 0)
                .join(' '),
              sexo: cand.sexo,
              activo: cand.activo,
              fotografia_URL: cand.fotografia_URL,
              votos: cand.votos,
              porcentaje: cand.porcentaje,
              orden: cand.orden,
            })),
          }
        })
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadCandidatoJudicial(id) {
      try {
        let resp = null
        resp = await api.get(`/Candidatos/${id}`)
        if (resp.status == 200) {
          const { data } = resp.data
          this.candidato_Judicial.id = data.id
          this.candidato_Judicial.tipo_Eleccion_Id = data.tipo_Eleccion_Id
          this.candidato_Judicial.tipo_Eleccion = data.tipo_Eleccion
          this.candidato_Judicial.poder_Postulante = data.poder_Postulante
          this.candidato_Judicial.no_Formula = data.no_Formula
          this.candidato_Judicial.nombres = data.nombres
          this.candidato_Judicial.apellido_Paterno = data.apellido_Paterno
          this.candidato_Judicial.apellido_Materno = data.apellido_Materno
          this.candidato_Judicial.fotografia_URL = data.fotografia_URL
          this.candidato_Judicial.sexo = data.sexo
          this.candidato_Judicial.activo = data.activo
          this.candidato_Judicial.votos = data.votos
          this.candidato_Judicial.porcentaje = data.porcentaje
          this.candidato_Judicial.orden = data.orden
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadInformacion(id) {
      try {
        let resp = null
        resp = await api.get(`Avance/AvanceEstatal/${id}`)
        if (resp.status == 200) {
          const { data } = resp.data
          this.informacion.votos_Candidatura = data.votos_Candidatura
          this.informacion.votos_Nulos = data.votos_Nulos
          this.informacion.total = data.total
          this.informacion.avance = data.avance
          this.informacion.lista_Nominal = data.lista_Nominal
          this.informacion.participacion = data.participacion
          this.informacion.porcentaje_Participacion = data.porcentaje_Participacion
          this.informacion.casillas_Computadas = data.casillas_Computadas
          this.informacion.casillas_Esperadas = data.casillas_Esperadas
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadInformacionJAO(TipoEleccionId, OficinaId) {
      try {
        let resp = null
        resp = await api.get(`Avance/AvanceJAO/${TipoEleccionId}/${OficinaId}`)
        if (resp.status == 200) {
          const { data } = resp.data
          this.informacion_JAO_MUN.votos_Candidatura = data.votos_Candidatura
          this.informacion_JAO_MUN.votos_Nulos = data.votos_Nulos
          this.informacion_JAO_MUN.total = data.total
          this.informacion_JAO_MUN.avance = data.avance
          this.informacion_JAO_MUN.lista_Nominal = data.lista_Nominal
          this.informacion_JAO_MUN.participacion = data.participacion
          this.informacion_JAO_MUN.porcentaje_Participacion = data.porcentaje_Participacion
          this.informacion_JAO_MUN.casillas_Computadas = data.casillas_Computadas
          this.informacion_JAO_MUN.casillas_Esperadas = data.casillas_Esperadas
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadInformacionMunicipio(TipoEleccionId, MunicipioId) {
      try {
        let resp = null
        resp = await api.get(`Avance/AvanceMunicipio/${TipoEleccionId}/${MunicipioId}`)
        if (resp.status == 200) {
          const { data } = resp.data
          this.informacion_JAO_MUN.votos_Candidatura = data.votos_Candidatura
          this.informacion_JAO_MUN.votos_Nulos = data.votos_Nulos
          this.informacion_JAO_MUN.total = data.total
          this.informacion_JAO_MUN.avance = data.avance
          this.informacion_JAO_MUN.lista_Nominal = data.lista_Nominal
          this.informacion_JAO_MUN.participacion = data.participacion
          this.informacion_JAO_MUN.porcentaje_Participacion = data.porcentaje_Participacion
          this.informacion_JAO_MUN.casillas_Computadas = data.casillas_Computadas
          this.informacion_JAO_MUN.casillas_Esperadas = data.casillas_Esperadas
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        }
      }
    },
    //---------------------------------------------------------------------------------
    async loadZip() {
      try {
        this.documentoZip = ''
        const resp = await api.get(`/Resultados/ConcentradoVotacion`, {
          responseType: 'blob',
        })

        if (resp.status === 200) {
          const contentType = resp.headers['content-type']
          console.log('Content-Type recibido:', contentType)

          if (!contentType || !contentType.toLowerCase().includes('zip')) {
            return {
              success: false,
              data: 'El archivo recibido no es un ZIP válido.',
            }
          }

          const blob = new Blob([resp.data], { type: contentType })
          this.documentoZip = window.URL.createObjectURL(blob)

          return { success: true }
        } else {
          return {
            success: false,
            data: 'Error al descargar archivo, inténtelo de nuevo.',
          }
        }
      } catch (error) {
        console.log('Error', error)
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte.',
        }
      }
    },
  },
})
