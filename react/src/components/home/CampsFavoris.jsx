import React, { useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'

export default function CampsFavoris(props) {

    const terrainsListe = props.terrains
    const [isSwiping, setSwiping] = useState(false)

    function Arrow(props) {
        const { className, style, onClick } = props
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "#25632d" }}
            onClick={onClick}
          />
        )
    }

    const SimpleSlider = ({terrains}) => {
        const longueur = terrains.length
        const settings = {
            dots: true,
            infinite: longueur > 3,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            nextArrow: <Arrow />,
            prevArrow: <Arrow />,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        }
        return (
            <div className='my-3 px-2'>
                <Slider {...settings}>
                    {
                        terrains.map((t,cle) => {
                            let imgPrincipales
                            if (t.images_principales) {
                                imgPrincipales = t.images_principales.split('|')
                            }
                            if (imgPrincipales) {
                                return (
                                    <div style={{ width: '100%', display:'flex' }} key={cle}>
                                    <div className="card" style={{ height:'380px', display:'flex', width: '65%', textAlign:'center', margin:'auto', borderRadius:'15px', border:'none' }}>
                                        <a
                                            href={`/terrain/${t.id}/home`}
                                            style={{ color:'inherit', textDecoration:'none' }}
                                        >
                                            {
                                                imgPrincipales && imgPrincipales[0] && 
                                                <img src={`http://localhost:8000/${imgPrincipales[0]}`} alt="" width={'100%'} className='img-fluid mx-auto' style={{ height:'250px',borderRadius:'15px' }}/>
                                                // <img src={`https://apii.keums.com/${imgPrincipales[0]}`} alt="" width={'100%'} className='img-fluid mx-auto' style={{ height:'250px',borderRadius:'15px' }}/>
                                            }
                                            <div className="card-body">
                                                <h3>
                                                    {t.nom}
                                                </h3>
                                                <div>
                                                    {t.adresse.split(',')[2]}
                                                </div>
                                                <div>
                                                    Peut recevoir : max {t.capacite_visiteurs} visiteurs
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    </div>
                                )
                            } else {
                                return
                            }
                        })
                    }
                </Slider>
            </div>
        )
    }

  return (
    <div className='container-fluid'>
      <div className="row">
        <h1>Les camps favoris</h1>
      </div>
      <div className="row mx-1 py-2" style={{ backgroundColor:'white' }}>
        <SimpleSlider terrains={terrainsListe} />
      </div>
    </div>
  )
}
