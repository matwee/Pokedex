import React from 'react';

function About() {
  return (
    <div className='about'>
        <h1>About</h1>
        <p>This Pokédex web application is my first dive into React. I utilized a RESTful API called PokéAPI to fetch a bunch of relevent information and then displayed it on a React based app using hooks. I tried to give an authentic experience with this web app, so some WCAG may not apply. I still have many features I'd like to implement, so this is very much a work in progress.</p>
        <p>
          <span>disclaimer:</span> Please note that I do not own any images found in this web app.
        </p>
        <h1>Known Bugs and Issues</h1>
        <ol className='bugs'>
          <li>Dustox does not appear in its evolution list due to Wurmple being the only Pokémon having 2 different evolution paths with 2 evos each. Need to find out how to run the evoChain functions on both paths and not just Beautifly.</li>
          <li>Some Pokémon are unclickable due to PokeAPI not having all their data.</li>
          <li>Some Pokémon do not have their evolution chain sprites showing.</li>
          <li>Pokémon descriptions only capitalize the first word. Need to use JS to wrap words after a period with spans to fix.</li>
          <li>Upon first ever page load of app, background images on home page are not loaded in and will flash white instead of transitioning.</li>
          <li>Evolutions are missing Pokémon that are part of different regions due to app only fetching data of 1 region at a time.</li>
          <li>Pokémon with multiple forms can only view 1 form (ex - Aegislash).</li>
          <li>Refreshing while in the Pokédex page will reset the region and only display Pokémon #1 to #20.</li>
          <li>There is a memory-leak warning message in the console that I'm not sure how to fix yet.</li>
        </ol>
    </div>
  );
}

export default About;
