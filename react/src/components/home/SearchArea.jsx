import React, { useContext, useEffect, useRef, useState } from 'react'
import {BiSolidCalendar} from 'react-icons/bi'
import {LiaGlobeAmericasSolid} from 'react-icons/lia'
import {ImFilter} from 'react-icons/im'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Calendar from "react-calendar"
import format from 'date-fns/format'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom'
import Terrains from '../../views/Terrains'
import { useSearchContext } from '../../contexts/ContextSearch'
import { isBefore, isEqual } from 'date-fns'
import { isAfter } from 'date-fns'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
// import 'jquery-ui/dist/jquery-ui'

const libraries = ['places']

export default function SearchArea() {
  const inputRef = useRef()
  const options = {
    componentRestrictions: { country: "ch" },
    fields: ["address_components", "formatted_address", "geometry", "icon", "name"],
    // types: ["establishment"]
  }
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_CLE_MAPS_API_2,
    libraries,
  })
  const {recherche, 
         setRecherche,
         dateDebut,
         setDateDebut,
         dateFin,
         setDateFin,
         filtre,
         setFiltre} = useSearchContext()
  const navigate = useNavigate()
  const [dateDebutLocale, setDateDebutLocale] = useState(new Date())
  const [dateFinLocale, setDateFinLocale] = useState(new Date())
  const [dateDebutLisible, setDateDebutLisible] = useState(new Date())
  const [dateFinLisible, setDateFinLisible] = useState(new Date())
  const [lieu, setLieu] = useState('vide')
  const [showFiltre, setShowFiltre] = useState(false)
  const [show, setShow] = useState(false)
  const [valueStart, setValueStart] = useState(null)
  const [valueEnd, setValueEnd] = useState(null)
//   const [valueStart, setValueStart] = useState(new Date())
//   const [valueEnd, setValueEnd] = useState(new Date())
  const [viewStart, setViewStart] = useState('month')
  const [viewEnd, setViewEnd] = useState('month')
  const [loading, setLoading] = useState(true)

  const handleChangeValueStart = (e) => {
    setValueStart(e)
    setDateDebutLocale(e)
    setDateDebutLisible(format(e,'dd MMM yyyy'))
    if (isAfter(e,valueEnd)) {
        setValueEnd(e)
        setDateFinLocale(e)
        setDateFinLisible(format(e,'dd MMM yyyy'))
    }
  }

  const handleChangeValueEnd = (e) => {
    setValueEnd(e)
    setDateFinLocale(e)
    setDateFinLisible(format(e,'dd MMM yyyy'))
    if (isBefore(e, valueStart)) {
        setValueStart(e)
        setDateDebutLocale(e)
        setDateDebutLisible(format(e,'dd MMM yyyy'))
    }
  }

//   const onChangeDebut = (e) => {
//     // e.preventDefault()
//     // alert('changement de date ...')
//     // alert(format(e, 'MM-dd-yyyy'))
//     setValueStart(e)
//     setDateDebutLocale(e)
//     setDateDebutLisible(format(e,'dd MMM yyyy'))
//     if (e > valueEnd) {
//         setValueEnd(e)
//     }
//   }

//   const onChangeFin = (e) => {
//     // e.preventDefault()
//     // alert('changement de date ...')
//     // alert(format(e, 'MM-dd-yyyy'))
//     setValueEnd(e)
//     setDateFinLocale(e)
//     setDateFinLisible(format(e,'dd MMM yyyy'))
//   }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if (!isLoaded) {
        return
    }
    const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
    )
    autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace()
        // console.log('PLACE =')
        // console.log(place)
        // const rueLong = place.address_components[1].long_name
        // const numero = place.address_components[0].short_name
        const formattedAddressArray = place.formatted_address.split(',')
        const addressComponent = place.address_components
        // addressComponent.length > 0 &&
        // addressComponent.map((obj,cle) => {
        //     console.log('object =')
        //     console.log(obj)
        // })
        // const rue = formattedAddressArray[0]
        // const ville = formattedAddressArray[1].trim().split(' ')[1]
        // const npa = formattedAddressArray[1].trim().split(' ')[0]
        // const pays = formattedAddressArray[2]
        // console.log(place)
        let t_adresse = ''
        let t_npa = ''
        let t_ville = ''
        let t_canton = ''
        let t_pays = ''
        for (let i=0; i<place.address_components.length; i++) {
            if (place.address_components[i].types.includes('route')) {
                t_adresse = place.address_components[i].long_name
            } else if (place.address_components[i].types.includes('locality')) {
                t_ville = place.address_components[i].long_name
            } else if (place.address_components[i].types.includes('administrative_area_level_1')) {
                t_canton = place.address_components[i].long_name
            } else if (place.address_components[i].types.includes('country')) {
                t_pays = place.address_components[i].long_name
            } else if (place.address_components[i].types.includes('postal_code')) {
                t_npa = place.address_components[i].long_name
            }
        }
        let newAdresse = t_adresse+' '+t_ville+' '+t_npa+' '+t_canton+' '+t_pays
        // console.log('NEWADRESSE =')
        // console.log(newAdresse.split(' ').filter(Boolean))
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        // setLieu(t_ville)
        setLieu(t_canton)
        setRecherche(t_canton)
    })
    // const inputDate = document.getElementById('circuitDate')
    // $('#inputDate').datepicker()
    // console.log('datedébutlocale=')
    // console.log(dateDebutLocale)
    // console.log('datedébutlisible=')
    // console.log(format(new Date('2023-07-27'), 'dd MMM yyyy'))
    // console.log(format(dateDebutLocale,'dd MMM yyyy'))
    // console.log(format(new Date('2023-07-27'), 'dd MMM yyyy') >= format(dateDebutLocale,'dd MMM yyyy'))
    // console.log(format(new Date('2023-07-27'), 'dd MMM yyyy') <= format(dateDebutLocale,'dd MMM yyyy'))
    // console.log(format(new Date(),'dd MMM yyyy'))
    // console.log(format(dateDebutLocale,'dd MMM yyyy') == format(new Date(),'dd MMM yyyy'))
    // console.log(format(dateDebutLisible,'dd MMM yyyy') == format(new Date(),'dd MMM yyyy'))
  }, [isLoaded])

  const searchLocation = (ev) => {
    ev.preventDefault()
    setRecherche(lieu)
    navigate('/terrains')
    // alert('Chercher pour le lieu : '+lieu)
    // return <Terrains 
    //     recherche={lieu}
    //     dateDebut={'vide'}
    //     dateFin={'vide'}
    //     filtre={'vide'}
    // />
  }

  const searchDate = (ev) => {
    ev.preventDefault()
    // console.log('dateDebutLocale=')
    // console.log(dateDebutLocale)
    // console.log('dateFinLocale=')
    // console.log(dateFinLocale)
    // if (format(dateFinLocale,'dd MMM yyyy') == format(new Date(),'dd MMM yyyy') || format(dateFinLocale,'dd MMM yyyy') < format(dateDebutLocale,'dd MMM yyyy')) {
    // if (isBefore(dateFinLocale, dateDebutLocale)) {
    //   alert('erreur dans les dates sélectionnées')
    //   handleShow()
    // } else {
    //   alert('Chercher des terrains dispo du '+format(dateDebutLocale, 'dd MMM yyyy')+' au '+format(dateFinLocale, 'dd MMM yyyy'))
      setDateDebut(format(dateDebutLocale, 'dd MMM yyyy'))
      setDateFin(format(dateFinLocale, 'dd MMM yyyy'))
      navigate('/terrains')
    // }
  }

  const searchFilter = (ev) => {
    ev.preventDefault()
    // alert('Chercher par filtre ...')
    setShowFiltre(current => !current)
  }

  const enregistrerLaDate = (ev) => {
    ev.preventDefault()
    if (isBefore(dateFinLocale, dateDebutLocale)) {
        alert('Erreur dans la sélection de dates ...')
    } else {
        quand.value = 'Du '+format(dateDebutLocale, 'dd MMM yyyy')+' au '+format(dateFinLocale, 'dd MMM yyyy')
        setDateDebut(format(dateDebutLocale, 'dd MMM yyyy'))
        setDateFin(format(dateFinLocale, 'dd MMM yyyy'))
        navigate('/terrains')
        handleClose()
    }
  }

  return (
    <div className='container my-5'>
      <div className="row" style={{ height:'60px' }}>
        <div className="col-md-12">
          <div className="input-group mb-3" style={{ height:'100%', border:'', borderRadius:'5px' }}>
            <input 
              type="text" 
              className="form-control sansOutline" 
              aria-label="Place" 
              placeholder='Où souhaitez-vous partir ?'
              id='ou'
              tabIndex={1}
            //   onChange={(ev)=>{
            //     if (ev.target.value == '') {
            //       setLieu('vide')
            //     } else {
            //       setLieu(ev.target.value)
            //       setRecherche(ev.target.value)
            //     }
            //   }}
              ref={inputRef}
            />
            <button 
              className="input-group-text cursorPointer customFocus" 
              tabIndex={2}
              onClick={searchLocation}
              style={{ margin:'0', marginRight:'1px', outline:'none'}}
            >
              <LiaGlobeAmericasSolid id='search-icon'/>
            </button>
            <input 
              type="text" 
              className="form-control sansOutline" 
              aria-label="Date" 
              placeholder='Quand souhaitez-vous partir ?' 
              id='quand'
              tabIndex={3}
              onClick={handleShow} 
            />
            <button 
              className="input-group-text cursorPointer customFocus" 
              onClick={searchDate} 
              tabIndex={4}
              style={{ margin:'0', marginRight:'1px', outline:'none' }}
            >
              <BiSolidCalendar id='date-icon'/>
            </button>
            <button 
              className="input-group-text cursorPointer customFocus" 
              onClick={searchFilter}
              tabIndex={5}
              style={{ outline: 'none' }}
            >
              <ImFilter id='filter-icon'/>
            </button>
          </div>
        </div>
      </div>
      {
        showFiltre && (
            <>
            <div className="row">
                <div className="col-md-12">
                    <h3>Plus de filtres</h3>
                </div>
            </div>

            <div className="row bg-gray">
                <div className="col-md-12">
                    <select 
                        className='form-control' 
                        id="filtre"
                    >
                        <option>Choisir un filtre</option>
                        <option>Prix</option>
                        <option>Environnement</option>
                        <option>Equipement</option>
                        <option>Prestations</option>
                    </select>
                </div>
            </div>
            </>
        )
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>Choix des dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container fluid>
                <Row>
                    <Col className='col-12 col-sm-12 col-md-6'>
                        <h5 className='text-center'>Date de début : {valueStart && format(valueStart, 'dd-MMM-yyyy')}</h5>
                        <div className="d-flex justify-content-center mb-2">
                            <Calendar 
                                key={valueStart}
                                value={valueStart}
                                className={'mx-auto'}
                                style={{ pointerEvents: "none" }}
                                // tileDisabled={masquerIndispo}
                                onChange={handleChangeValueStart}
                                onViewChange={view => setViewStart(view)}
                                view={viewStart}
                                minDate={new Date()}
                            />
                            {/* <Calendar 
                                onChange={onChangeDebut}
                                value={valueStart}
                            /> */}
                        </div>
                    </Col>
                    <Col className='col-12 col-sm-12 col-md-6'>
                        <h5 className='text-center'>Date de fin : {valueEnd && format(valueEnd, 'dd-MMM-yyyy')}</h5>
                        <div className="d-flex justify-content-center mb-2">
                            <Calendar 
                                key={valueEnd}
                                value={valueEnd}
                                className={'mx-auto'}
                                style={{ pointerEvents: "none" }}
                                // tileDisabled={masquerIndispo}
                                onChange={handleChangeValueEnd}
                                onViewChange={view => setViewEnd(view)}
                                view={viewEnd}
                                minDate={new Date()}
                            />
                            {/* <Calendar 
                                onChange={onChangeFin}
                                value={valueEnd}
                            /> */}
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <h5>Date de début : {format(valueStart, 'dd-MMM-yyyy')}</h5>
            <div className="d-flex justify-content-center mb-2">
                <Calendar 
                    onChange={onChangeDebut}
                    value={valueStart}
                />
            </div> */}
          {/* <input 
            type="date" 
            className='form-control' 
            id='circuitDateDebut' 
            onChange={(ev)=>{
              console.log(moment(new Date(ev.target.value)).format('YYYY-MM-DD'))
              setDateDebut(moment(new Date(ev.target.value)).format('YYYY-MM-DD'))
              setDateDebutLisible(moment(new Date(ev.target.value)).format('DD MMM YYYY'))
            }}
          /> */}
          {/* <h5>Date de fin : {format(valueEnd, 'dd-MMM-yyyy')}</h5>
          <div className="d-flex justify-content-center mb-2">
                <Calendar 
                    onChange={onChangeFin}
                    value={valueEnd}
                />
            </div> */}
          {/* <input 
            type="date" 
            className='form-control' 
            id='circuitDateFin' 
            onChange={(ev)=>{
              console.log(moment(new Date(ev.target.value)).format('YYYY-MM-DD'))
              setDateFin(moment(new Date(ev.target.value)).format('YYYY-MM-DD'))
              setDateFinLisible(moment(new Date(ev.target.value)).format('DD MMM YYYY'))
            }}
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={enregistrerLaDate}>Choisir</Button>
        </Modal.Footer>
      </Modal>

    </div>

  )
}
