import React from 'react'
import {AiFillHome, AiFillInstagram} from 'react-icons/ai'
import {BsEnvelopeAtFill, BsFillPhoneFill, BsFacebook} from 'react-icons/bs'
import {FaFax} from 'react-icons/fa'
import {BiLogoLinkedinSquare} from 'react-icons/bi'


export default function Footer() {
  return (
    <footer className='pt-3 pb-4'>
        <div className="container">
            {/* LIGNE POUR LE LOGO */}
            <div className="row text-left">
                <div className="col-md-2 text-left">
                    <img src="/logoGampySansBG-2.png" width="150px" height="80px" />
                </div>
            </div>
        </div>
        <div className="container text-center text-md-left">
            {/* LIGNE POUR LES 3 COLONNES PRINCIPALES */}
            <div className="row text-center text-md-left mb-3">
                <div className="col-md-1 col-lg-1 col-xl-1"></div>
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h5 className='text-uppercase mb-4 font-weight-blod'>Gampy</h5>
                    <p>
                        <a href="#" className="text-black" style={{ textDecoration:'none' }}> Notre vision</a>
                    </p>
                    <p>
                        <a href="#" className="text-black" style={{ textDecoration:'none' }}> Qui sommes-nous ?</a>
                    </p>
                    <p>
                        <a href="#" className="text-black" style={{ textDecoration:'none' }}> S'inscrire</a>
                    </p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h5 className='text-uppercase mb-4 font-weight-bold'>Informations</h5>
                    <p>
                        <a href="#" className="text-black" style={{ textDecoration:'none' }}> Hôtes</a>
                    </p>
                    <p>
                        <a href="#" className="text-black" style={{ textDecoration:'none' }}> Gampeurs</a>
                    </p>
                </div>
                <div className="col-md-3 col-lg3 mx-auto mt-3">
                    <h5 className="text-uppercase mb-4 font-weight-bold">Liens utiles</h5>
                    <p>
                        <a href="#" className="text-black" style={{ textDecoration:'none' }}> FAQ</a>
                    </p>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1"></div>
                {/* <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Contact</h5>
                    <p>
                        <AiFillHome id='iconHome'/> Rue des Boudines 9, 1217 Meyrin, Suisse
                    </p>
                    <p>
                        <BsEnvelopeAtFill id='iconEnvelope'/> info@gampy.com
                    </p>
                    <p>
                        <BsFillPhoneFill id='iconPhone'/> +41 (0)79.876.56.89 
                    </p>
                    <p>
                        <FaFax id='iconFax'/> +41 (0)79.876.56.88
                    </p>
                </div> */}
            </div>
            {/* LIGNE POUR LES ICONES DES RESEAUX SOCIAUX */}
            <div className="row">
                <div className="col-md-12">
                    <BsFacebook id='iconFacebook' className='mx-3'/> <AiFillInstagram id='iconInstagram' className='mx-3'/> <BiLogoLinkedinSquare id='iconLinkedIn' className='mx-3'/>
                </div>
            </div>
        </div>
    </footer>
  )
}
