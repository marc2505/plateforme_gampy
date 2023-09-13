import React from 'react'

export default function ActivitesFavorites() {

  return (
    <div className='container-fluid'>
      <div className="row">
        <h1>Les activités favorites</h1>
      </div>
      <div className="row mx-1 py-2" style={{ backgroundColor:'white' }}>
        <div className="col-md-4 col-lg-4 col-lg-4 col-xl-3 mx-auto mb-sm-2 mb-xs-2 mb-2">
          <div className="card" style={{  width:'100%', height: '100%', overflow:'hidden', borderRadius:'10%' }} >
            <img src="lac.jpg" className="card-img-top img-fluid" style={{ height:'100%' }} />
            {/* <img src="https://placehold.co/600x400/25632d/FFF?text=Activité+no+1" className="card-img-top img-fluid" style={{ height:'' }} /> */}
            <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center',width:'80%' }}>
                <h3 style={{ fontWeight:'900' }}>
                    Découverte de lieux uniques
                </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-lg-4 col-xl-3 mx-auto mb-sm-2 mb-xs-2 mb-2">
          <div className="card" style={{ width:'100%', height: '100%', overflow:'hidden', borderRadius:'10%' }} >
            <img src="vtt.jpg" className="card-img-top img-fluid" style={{ height:'100%' }} />
            {/* <img src="https://placehold.co/600x400/25632d/FFF?text=Activité+no+2" className="card-img-top img-fluid" style={{ height:'' }} /> */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center',width:'80%' }}>
                <h3 style={{ fontWeight:'900' }}>
                    VTT au coeur du Jura
                </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-lg-4 col-xl-3 mx-auto mb-sm-2 mb-xs-2 mb-2">
          <div className="card" style={{ width:'100%', height: '100%', overflow:'hidden', borderRadius:'10%' }} >
            <img src="escalade.jpg" className="card-img-top img-fluid" style={{ height:'100%' }} />
            {/* <img src="https://placehold.co/600x400/25632d/FFF?text=Activité+no+3" className="card-img-top img-fluid" style={{ height:'' }} /> */}
            <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center',width:'80%' }}>
                <h3 style={{ fontWeight:'900' }}>
                    Escalade dans les montagnes du Valais
                </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
