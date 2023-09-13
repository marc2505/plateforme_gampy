import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import { ContextSearch, useSearchContext } from '../contexts/ContextSearch'
import { useStateContext } from '../contexts/ContextProvider'
import Footer from '../components/layout/Footer'
import axiosClient from '../axios-client'
import { Link, useNavigate } from 'react-router-dom'
import SearchArea from '../components/home/SearchArea'

export default function Terrains() {
    const navigate = useNavigate()
    const {user, token} = useStateContext()
    const {recherche, 
           setRecherche,
           dateDebut,
           setDateDebut,
           dateFin,
           setDateFin,
           filtre,
           setFiltre} = useSearchContext()
    const [loading, setLoading] = useState(true)
    const [terrains, setTerrains] = useState([])
    const [tousLesTerrains, setTousLesTerrains] = useState([])

    useEffect(()=>{
        // console.log('RECHERCHE = ')
        // console.log(recherche)
        // console.log('DATE DEBUT = ')
        // console.log(dateDebut)
        // console.log('DATE FIN = ')
        // console.log(dateFin)
        // console.log('FILTRE = ')
        // console.log(filtre)
        setLoading(true)
        axiosClient.get(`/terrains/recherche?recherche=${recherche}&dateDebut=${dateDebut}&dateFin=${dateFin}&filtre=${filtre}`)
        .then(({data}) => {
            setLoading(false)
            console.log('Les terrains correspondant à la recherche ...')
            console.log(data)
            if (data.terrains.length > 0) {
                setTerrains(data.terrains)
            }
            if (data.terrains.length == 0 && data.tousLesTerrains) {
                setTousLesTerrains(data.tousLesTerrains)
            }
            window.scrollTo(0,0)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }, [])

    useEffect(()=>{
        // console.log('CHANGEMENT DE LA LISTE DE TERRAINS :')
        // console.log(terrains)
    }, [terrains])

    return (
        <div>
            <div className="container mx-auto">
                {
                user && Object.keys(user).length > 0
                ?
                <Header user={user} />
                :
                <Header user={null} />
                }
            </div>
            {
                loading && (
                    <div className="container">
                        <h5>Chargement des terrains ...</h5>
                    </div>
                )
            }
            {!loading && (
                <div className="container">
                    <h5>Liste des terrains {recherche ? 'à '+recherche : ''} {dateDebut && dateFin ? 'du '+dateDebut+' au '+dateFin : ''} ({terrains.length} terrain{terrains.length > 1 ? 's' : ''}) : </h5>
                    {
                        tousLesTerrains.length == 0 && terrains.map((t, cle) => {
                            return (
                                <div key={cle}>
                                    <Link
                                        to={`/terrain/${t.id}`}
                                        style={{ color:'inherit', textDecoration:'none' }}
                                    >
                                        <div className="row my-2" style={{ border:'1px solid #25632d', borderRadius: '5px 5px 5px 5px', overflow: 'hidden' }}>
                                            <div className="col-md-4 p-0">
                                                <img src={`http://localhost:8000/${t.images_principales.split('|')[0]}`} width={'100%'} height={'200px'} />
                                                {/* <img src={`https://apii.keums.com/${t.images_principales.split('|')[0]}`} width={'100%'} height={'200px'} /> */}
                                            </div>
                                            <div className="col-md-8">
                                                <h3>{t.nom}</h3>
                                                <h5>{t.adresse}</h5>
                                                <h5>{t.prix_nuitee} CHF / nuitée</h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    {
                        tousLesTerrains.length > 0 && (
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Pas de terrain correspondant</h2>
                                    <h3>Regarder les autres terrains que nous proposons : </h3>
                                </div>
                            </div>
                        )
                    }
                    {
                        tousLesTerrains.length > 0 && tousLesTerrains.map((t, cle) => {
                            return (
                                <div key={cle}>
                                    <Link
                                        to={`/terrain/${t.id}`}
                                        style={{ color:'inherit',textDecoration:'none' }}
                                    >
                                        <div className="row my-2" style={{ border:'1px solid #25632d', borderRadius: '5px 5px 5px 5px', overflow: 'hidden' }}>
                                            <div className="col-md-4 p-0">
                                                <img src={`http://localhost:8000/${t.images_principales.split('|')[0]}`} width={'100%'} height={'200px'} />
                                            </div>
                                            <div className="col-md-8">
                                                <h3>{t.nom}</h3>
                                                <h5>{t.adresse}</h5>
                                                <h5>{t.prix_nuitee} CHF / nuitée</h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    <div className="text-center">
                        <Link
                            className='btn'
                            to={'#'}
                            onClick={()=>{
                                setDateDebut(null)
                                setDateFin(null)
                                setFiltre(null)
                                setRecherche(null)
                                navigate('/')
                            }}
                            style={{ background:'#25632d',color:'white' }}
                        >
                            Retour
                        </Link>
                    </div>
                </div>
            )}
            <div className="container">
                <Footer />
            </div>
        </div>
    )
}
