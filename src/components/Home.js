import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home({setRegion}) {
    
    useEffect(()=>{
        loadImages(images, regions);
    }, []);

    //states
    const [backgrounds, setBackgrounds] = useState([]);
    const [background, setBackground] = useState('');
    
    const regions = [
        {
            region: 'kanto',
            url: '/assets/kanto.png',
            limit: 151,
            offset: 0,
        },
        {
            region: 'johto',
            url: '/assets/johto.png',
            limit: 100,
            offset: 151,
        },
        {
            region: 'hoenn',
            url: '/assets/hoenn2.png',
            limit: 135,
            offset: 251,
        },
        {
            region: 'sinnoh',
            url: '/assets/sinnoh.png',
            limit: 108,
            offset: 386,
        },
        {
            region: 'unova',
            url: '/assets/unova.png',
            limit: 155,
            offset: 494,
        },
        {
            region: 'kalos',
            url: '/assets/kalos.png',
            limit: 72,
            offset: 649,
        },
        {
            region: 'alola',
            url: '/assets/alola.png',
            limit: 88,
            offset: 721,
        },
    ];
    let images = [];
    
    const backgroundHandler = (e) =>{
        setBackground(backgrounds
            .filter( bg=>{
                return bg===e.currentTarget.getAttribute('url');
            })
        )    
    }
    const loadImages = () =>{
        regions.forEach( region =>{
            const img = new Image();
            images.push( img.src = region.url );
        })
        setBackgrounds(images);
    } 
    return (
        <div className='home' style={{backgroundImage: background===''? null : `url(${background})`}}>
            <ul className='regions'>
                <h1>Select a Region</h1>
                {regions.map( el =>(
                <Link 
                    to={{pathname: '/pokedex'}}
                    className={`link ${el.region}`} 
                    onMouseEnter={backgroundHandler} 
                    onClick={()=> setRegion({
                        region:el.region,
                        offset: el.offset,
                        limit: el.limit
                    })}
                    key={el.region}
                    url={el.url}    
                > 
                    <li>
                        {el.region}  
                        <span>{`${el.offset+1} - ${el.offset+el.limit}`}</span>
                    </li>
                </Link>
                ))}
            </ul>
        </div>
    );
}

export default Home;