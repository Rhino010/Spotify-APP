// Declaration for song values
let song;
let playSong;

// Spotify client creds
const clientID = "37de4e1a0a4a458ca17760fa55e9a696";
const clientSecret = "fd9ea7a8c0214ca28df9b2db4b07c852";

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic' + btoa(clientID + ':' + clientSecret)
        },
        body: 'grant_type = client_credentials'
    });

    //Access the data given to us by the fetch response (Promise)
    const data = await result.json();
    return data.access_token
}

// Function to get song info when the image is clicked
/** 
 * @param img_index
 * @param item_index
 * 
 * id = image if for gallery image
 * event = Mouse event given by the action from our user
 * 
 * Function produces songs from the clickedEvent based
 * on index of image.
 * 
 */

async function clickedEvent(img_index, item_index){
    //get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;

    // get token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);
    
    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track,artist&limit=15`, {
        method : 'GET',
        headers : headers
    });

    let result = await fetch(request);

    let response = await result.json();

    console.log(response);
    let song = response.tracks.items[item_index].preview_url


    // TODO : Add songSnippet function to play the selected song
    // TODO : Check if other song is playing and stop it
    // TODO : Create a function to stop music
    
    // Check if song is playing and stop it
    if (playSong){
        stopSnippet();
    }
    songSnippet(song)
}


/** 
 * @param img_index
 * @param item_index
 * 
 * id = image if for gallery image
 * event = Mouse event given by the action from our user
 * 
 * Function produces songs from the clickedEvent based
 * on index of image.
 * 
 */

function getSong(id, event){
    switch(id){
        case 'fig1': { 
            event.stopPropagation();
            clickedEvent(0,3)
            break;
        }
        case 'fig2': { 
            event.stopPropagation();
            clickedEvent(1,3)
            break;
        }
        case 'fig3': { 
            event.stopPropagation();
            clickedEvent(2,3)
            break;
        }
        case 'fig4': { 
            event.stopPropagation();
            clickedEvent(3,0)
            break;
        }
        case 'fig5': { 
            event.stopPropagation();
            clickedEvent(4,0)
            break;
        }
        case 'fig6': { 
            event.stopPropagation();
            clickedEvent(5,1)
            break;
        }

        
    }
}

/**
 * @param urlencoded
 * 
 * url = Song Preview_url
 * 
 * Function will return an audio clip given by the preview url
 */

function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}

/**
 * NO PARAMS
 * 
 * 
 * Function returns event to stop song snippet
 */

function stopSnippet(){
    return playSong.pause();
}