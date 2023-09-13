import React from 'react'

export default function InscriptionNewsletter() {

  return (
    <div className='container-fluid'>
      <div className="row">
        <h1>Inscription à la newsletter</h1>
      </div>
      <div className="row mx-1 py-2" style={{ backgroundColor:'white' }}>
        <div className="col-lg-1 col-xl-1"></div>
        <div className="col-md-6 col-lg-3 col-xl-3 mb-sm-2 mb-xs-2 mb-2 mx-auto">
          <div className="card" style={{ border:'none', width:'100%', height: '100%' }} >
            <input type="text" className="form-control mb-2" placeholder='Entrer votre adresse email'/>
            <div style={{ display:'flex' }}>
                <input type="checkbox" name='consentNewsletter' id='consentNewsletter' style={{ width:'15px' }}/> <label htmlFor="consentNewsletter" style={{ fontSize:'15px',paddingLeft:'10px' }}>J’autorise Gampy à utiliser mon email à des fins marketing</label></div>
            <button className='btn p-2 my-2' style={{ background:'#25632d',color:'white' }}>Inscription</button>
            <div className="text-center">
              News - Conseils - Actus
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-5 col-xl-5 mb-sm-2 mb-xs-2 mb-2 mx-auto">
          <div className="card" style={{ border:'none',width:'100%', height: '100%', textAlign:'justify' }} >
            <div style={{ width:'60%', margin:'auto' }} id='changerPourFullWidth'>
              Grâce à notre newsletter, tu seras informée des nouveaux camps, qui te permettront de trouver l’inspiration pour l’organisation de ta prochaine excursion!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
